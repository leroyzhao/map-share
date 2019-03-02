import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";

import { signInSuccess } from "../../actions/signInActions";
import SignInForm from "../SignInForm/SignInForm";
import MapContainer from "../MapContainer/MapContainer";
import GroupLanding from "../GroupLanding/GroupLanding"

export class AuthContainer extends Component {
  render() {
    const { toggleMarks, signInStatus } = this.props;

    console.log("HERE is sign in status", signInStatus)
    console.log(this.props.getUserData)
    return (
      <>
        {signInStatus ?
          (this.props.getUserData.userGroups && this.props.getUserData.userGroups.length != 0) ? (
            <MapContainer />
          ) : (
            <GroupLanding />
        ) : (
          <SignInForm />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool))
  };
};

const mapStateToProps = state => {
  return {
    toggleMarks: state.marksToggleReducer,
    signInStatus: state.signInStatusReducer,
    getUserData: state.userFetchReducer
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  GoogleApiWrapper({
    apiKey: "AIzaSyCp4-ZdjyiJMktGIrh4KcBS7xUGPbis8gY"
  })
)(AuthContainer);
