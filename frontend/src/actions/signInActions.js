import axios from 'axios';

export const signInSuccess = bool => {
  return {
    type: "SIGN_IN_SUCCESS",
    status: bool
  }
}