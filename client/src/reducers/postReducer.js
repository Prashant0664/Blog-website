
let posts = [];

export function postReducer(state = posts, action) {
  switch (action.type) {
    case "SET_POSTS":
      try{
        return [...state, ...action.payload];
      }
      catch(e){
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

