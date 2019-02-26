import React, { Component } from 'react'
import { connect } from "react-redux";
import { GoogleLogin } from 'react-google-login';

import { signInSuccess } from '../../../actions/signInActions'

export class SignInForm extends Component {
  handleSignIn = () => {
    this.props.signInSuccess(true);
  }

  responseGoogle = (response) => {
    this.handleSignIn()
    console.log(response);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="249486761636-7v9e2d4eopnh2hcedo5fa3uu0uqvg7t1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          isSignedIn={true}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool))
  };
}

export default connect(null, mapDispatchToProps)(SignInForm);