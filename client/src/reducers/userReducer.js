
import Cookies from "js-cookie";
export function userReducer(state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "UPDATEPICTURE":
      return { ...state, picture: action.payload.picture, about: action.payload.about };
    case "VERIFY":
      return { ...state, verified: action.payload };
    case "LIKE":
      return { likes: action.payload, ...state };
    case "BOOKMARK":
      return { ...state, bookmarks: action.payload };
    default:
      return state;
  }
}
 
