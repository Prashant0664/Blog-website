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
export const increaseView = async (id) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/increaseView`, {
      id,
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in increasing view" };
  }
}
export const getView = async (id) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getView`, {
      id,
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in getting view mail" };
  }
}
export const getLikes = async (id) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getLikes`, {
      id,
    }
    )
    return data;
  } catch (error) {
    // console.log(error);
    return { msg: "error in getting likes" };
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
export const editPost = async (
  title,
  description,
  image,
  category,
  userId,
  token = null,
  cleanHtml,
  id
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/editPost`,
      {
        title,
        description,
        image,
        category,
        user: userId,
        content: cleanHtml,
        id:id
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
    // console.log("error in postcomment indexjs ", error)
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
    // console.log(error);
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
    // console.log(error);
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
    // console.log(error);
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
export const showLikemarks = async (id) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/showLikemarks`, {
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
    // console.log("error in Reporting", error);
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
    // console.log("error in Bookmark", error);
    return { msg: error };
  }
}
export const deletelikes = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/deletelikes`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    // console.log("error in Liked removing", error);
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
    // console.log("error in deleting post", error);
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
    // console.log("error in Bookmark", error);
    return { msg: error };
  }
}
export const checklikes = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/checklikes`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    // console.log("error in checklikes", error);
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
    // console.log("error in fetch followers", error);
    return;
  }
}
export const changeabout = async (about, id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/changeabout`, {
      about, id,
    }
    )
    return data;
  } catch (error) {
    // console.log("error in fetch followers", error);
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
    // console.log("error in start following", error);
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
    // console.log("error in start following", error);
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
    // console.log("error in fetch check following", error);
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
    // console.log("error in Bookmark", error);
    return;
  }
}
export const increaseLike = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/increaseLike`, {
      id
    }
    )
    return data;
  } catch (error) {
    // console.log("error in likes increase", error);
    return;
  }
}
export const decreastLike = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/decreastLike`, {
      id
    }
    )
    return data;
  } catch (error) {
    // console.log("error in likes decrease", error);
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
    // console.log("error in Bookmark", error);
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
    // console.log("error in Bookmark", error);
    return;
  }
}

export const likes = async (postid, userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/setlikes`, {
      postid,
      userid
    }
    )
    return data;
  } catch (error) {
    // console.log("error in Likes", error);
    return;
  }
}
export const getallLikes = async (userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getallLikes`, {
      userid
    }
    )
    return data;
  } catch (error) {
    // console.log("error in Likes", error);
    return;
  }
}
export const getallBookmarks = async (userid) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getallBookmarks`, {
      userid
    }
    )
    return data;
  } catch (error) {
    // console.log("error in Likes", error);
    return;
  }
}

export const getAllPost = async (activePage, LIMIT,mpost) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getallpost`,
      {
        params: {
          page: activePage,
          size: LIMIT,
        },
        mpost
      }
    );
    return data;

  } catch (error) {
    return error;
  }
};

export const getarticle = async (id) => {
  try {
    var { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getarticle`, {
      id
    }
    )
    return data;
  } catch (error) {
    // console.log("error in getting article", error);
    return error;
  }
}

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
