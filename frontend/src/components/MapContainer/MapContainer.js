import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { marksFetchData, getUserData } from "../../actions/marksActions";

import './MapContainer.scss'

import CurrentLocation from "../CurrentLocation/CurrentLocation";
import RestaurantDetails from "../RestaurantComponents/RestaurantDetails";

export class MapContainer extends Component {
  componentWillMount() {
    // let data = {
    //   userId: '5c7015b00b10a5189ccc07e2',
    //   groupId: '5c7016010b10a5189ccc07e3'
    // }

    // this.props.getUserData(data)
    this.props.marksFetchData("https://map-share.herokuapp.com/api/marks?");
  }

  render() {
    const { toggleMarks } = this.props;

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {toggleMarks.status ?
          <div className='detailsContainer container-fluid'>
            <RestaurantDetails />
          </div>
          :
          <div className="slideOut"></div>
        }
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  console.log("map dispatch to props from mapcontainer");
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
    getUserData: data => dispatch(getUserData(data))
  };
};

const mapStateToProps = state => {
  return {
    toggleMarks: state.marksToggleReducer
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
