
let posts = [];

export function postReducer(state = posts, action) {
  switch (action.type) {
    case "SET_POSTS":
      if (!Array.isArray(action.payload)) return state;
      return [...state, ...action.payload.filter(Boolean)];
    default:
      return state;
  }
}

