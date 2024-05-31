import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";



const rootReducer = combineReducers({
   user: userReducer,
   posts: postReducer,

});

export default rootReducer;