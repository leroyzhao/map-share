import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";

import { marksFetchData } from "../../actions/marksActions";
import { signInSuccess } from "../../actions/signInActions";
import { GoogleLogout } from "react-google-login";

import "./MapContainer.scss";

import CurrentLocation from "../CurrentLocation/CurrentLocation";
import RestaurantDetails from "../RestaurantComponents/RestaurantDetails";
import SignInForm from "../SignInForm/SignInForm";

export class MapContainer extends Component {
  // componentWillMount() {
  //   // let data = {
  //   //   userId: '5c7015b00b10a5189ccc07e2',
  //   //   groupId: '5c7016010b10a5189ccc07e3'
  //   // }

  //   // this.props.getUserData(data)
  //   this.props.marksFetchData("https://map-share.herokuapp.com/api/marks?");
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.getUserData);
    if (
      prevProps.getUserData !== this.props.getUserData &&
      this.props.signInStatus === true
    ) {
      let groupId = this.props.getUserData.userGroups[
        this.props.getUserData.userGroups.length - 1
      ];

      this.props.marksFetchData(
        "https://map-share.herokuapp.com/api/marks?groupId=" + groupId
      );
    }
  }

  logout = () => {
    console.log("firing logout");
    this.props.signInSuccess(false);
  };

  render() {
    const { toggleMarks, signInStatus } = this.props;

    return (
      <>
        {console.log(signInStatus)}
        {signInStatus ? (
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <div className="box-btn-GoogleLogOut">
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                className="btn-GoogleLogOut"
              />
            </div>

            {toggleMarks.status ? (
              <div className="detailsContainer container-fluid">
                <RestaurantDetails />
              </div>
            ) : (
              <div className="slideOut" />
            )}

            <InfoWindow
              marker={toggleMarks.activeMarker}
              visible={toggleMarks.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{toggleMarks.selectedPlace}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        ) : (
          <SignInForm />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  console.log("map dispatch to props from mapcontainer");
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
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
)(MapContainer);
