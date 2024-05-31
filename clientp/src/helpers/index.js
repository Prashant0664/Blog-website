import axios from "axios";

export const clearCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
export const checkifverify = async (mail) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/checkifverify`, {
      mail
    }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}

export const checkotpv = async (mail, otp) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/checkotpv`, {
      mail,
      otp
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in sending mail" };
  }
}
export const sendmail = async (mail, name) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/sendmail`, {
      mail,
      name
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in sending mail" };
  }
}
export const uplaodImages = async (formData, token = null) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const createPost = async (
  title,
  description,
  image,
  category,
  userId,
  token = null,
  cleanHtml
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/post`,
      {
        title,
        description,
        image,
        category,
        user: userId,
        content: cleanHtml,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const createcomment = async (

  name,
  image,
  content,
  id1,
  id2

) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/postcomment`,
      {
        name,
        image,
        content,
        id1,
        id2
      }
    )
    return data
  } catch (error) {
    console.log("error in postcomment indexjs ", error)
    return;
  }
}

export const fetchprof = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/fetchprof`,
      {
        id,

      }

    )
    // data = [...data, { msg: "ok" }];
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "error" };
  }
}
export const getcomment = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getcomment`,
      {
        id,

      }

    )
    data = [...data, { msg: "ok" }];
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "error" };
  }
}
export const getfollowercount = async (id) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/countfollower`, {
      id
    })
    return data
  } catch (error) {
    return { msg: "error" }
  }
}


export const getallpostdata = async (id) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getallpostdata`, {
      id
    })
    return data
  } catch (error) {
    console.log(error);
    // console.log(error);
    return { msg: "error" }
  }
}
export const getfollowingcount = async (id) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/countfollowing`, {
      id
    })
    return data
  } catch (error) {
    return { msg: "error" }
  }
}

export const showbookmarks = async (id) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/showbookmarks`, {
      id
    })
    return data;
  } catch (error) {
    return { msg: "error" }
  }
}

export const reportcontent = async (pid, postid, userid, name1, name2, reason) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/reportcontent`, {
      pid,
      postid,
      userid,
      name1,
      name2,
      reason
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Reporting", error);
    return { msg: error };
  }
}
export const deletebookmark = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/deletebookmark`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Bookmark", error);
    return { msg: error };
  }
}

export const deletepost = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/deletepost`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    console.log("Error in deleting post", error);
    return { msg: error };
  }
}
export const checkbookmark = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/checkbookmark`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Bookmark", error);
    return { msg: error };
  }
}

export const fetchfollowing = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/fetchfollowing`, {
      id,
    }
    )
    return data;
  } catch (error) {
    console.log("Error in fetch followers", error);
    return;
  }
}
export const startfollow = async (id, id2) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/startfollow`, {
      id,
      id2
    }
    )
    return data;
  } catch (error) {
    console.log("Error in start following", error);
    return;
  }
}
export const unfollow = async (id, id2) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/unfollow`, {
      id,
      id2
    }
    )
    return data;
  } catch (error) {
    console.log("Error in start following", error);
    return;
  }
}
export const checkfollowing = async (id, id2) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/checkfollow`, {
      id,
      id2
    }
    )
    return data;
  } catch (error) {
    console.log("Error in fetch check following", error);
    return;
  }
}
export const showmyposts = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/showmyposts`, {
      id
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Bookmark", error);
    return;
  }
}
export const searchresult = async (id2,) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/searchresult`, {
      id2
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Bookmark", error);
    return;
  }
}
export const bookmark = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/setbookmark`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    console.log("Error in Bookmark", error);
    return;
  }
}

export const getAllPost = async (activePage, LIMIT) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getallpost`,
      {
        params: {
          page: activePage,
          size: LIMIT,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const uploadProfilePicture = async (picture, about, token = null) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/uploadprofile`,
      {
        picture,
        about,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getUser/${userId}`
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
