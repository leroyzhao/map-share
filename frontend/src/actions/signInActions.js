import axios from "axios";

export const signInSuccess = bool => {
  return {
    type: "SIGN_IN_SUCCESS",
    status: bool
  };
};

export const postUser = data => {
  console.log(data);

  let userData = {
    userFirstName: data.ofa,
    userLastName: data.wea,
    userEmail: data.U3,
    googleId: data.Eea,
    userPicture: data.Paa
  };

  return dispatch => {
    axios
      .post("https://map-share.herokuapp.com/api/users", userData)
      .then(res => {
        console.log("data after postUser request return: ", res.data);
        dispatch(userFetchDataSuccess(res.data));
      })
      .catch(err => {
        console.log("postUser errors: ", err.response);
      });
  };
};

export const userFetchDataSuccess = data => {
  return {
    type: "USER_FETCH_DATA_SUCCESS",
    data: data
  };
};
