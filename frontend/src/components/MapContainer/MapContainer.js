import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { marksFetchData, toggleMarker } from "../../actions/marksActions";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
import RestaurantDetails from "../RestaurantComponents/RestaurantDetails";

export class MapContainer extends Component {
  // state = {
  //   showingInfoWindow: false, //Hides or the shows the infoWindow
  //   activeMarker: {}, //Shows the active marker upon click
  //   selectedPlace: "" //Shows the infoWindow to the selected place upon a marker
  // };

  componentWillMount() {
    this.props.marksFetchData("hello");
  }

  // onMarkerClick = (props, marker) => {
  //   let set = {
  //     selectedPlace: props.nameTag,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   };
  //   //console.log("here", this.props.marks, name, marker);
  //   this.props.toggleMarker(set);
  //   return alert("Hello! I am an alert box!");
  // };

  // onClose = props => {
  //   if (this.props.toggleMarks.showingInfoWindow) {
  //     let set = {
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     };

  //     this.props.toggleMarker(set);
  //   }
  //   //this.props.toggleMarker(this.state);
  // };

  render() {
    // console.log("state: ", this.props.marks);
    const { marks, toggleMarks } = this.props;

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {toggleMarks.status ? <RestaurantDetails /> : null}
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
    marksFetchData: url => dispatch(marksFetchData(url))
  };
};

const mapStateToProps = state => {
  return {
    marks: state.marksFetchReducer,
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
