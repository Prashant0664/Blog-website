import axios from "axios";

export const clearCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

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
export const createcomment=async (
  
  name,
  image,
  content,
  id1,
  id2

)=>{
  try {
    const {data}=await axios.post(
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
    console.log("error in postcomment indexjs " , error)
    return;
  }
}
export const getcomment=async(id)=>{
  try {
    var {data}=await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getcomment`,
      {
        id
      }

    )
    data=[...data,{msg:"ok"}];
    return data;
  } catch (error) {
    console.log(error);
    return {msg:"error"};
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
