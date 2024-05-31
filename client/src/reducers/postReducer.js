
let posts = [];

export function postReducer(state = posts, action) {
  switch (action.type) {
    case "SET_POSTS":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

