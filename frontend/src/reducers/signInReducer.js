const initSignInState = {
  status: false
};

export const signInStatusReducer = (state = initSignInState.status, action) => {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return action.status;
    default:
      return state;
  }
};

export const userFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_FETCH_DATA_SUCCESS":
      return action.data;
    case "ADD_GROUP":
      return {...state, userGroups:state.userGroups.concat(action.data)};
    default:
      return state;
  }
};

export const joinGroupErrorReducer = (state = "", action) => {
  switch (action.type) {
    case "JOIN_GROUP_ERROR":
      console.log('joingroup reducer')
      return action.data;
    default:
      return state;
  }
} 