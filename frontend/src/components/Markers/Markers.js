import React, { Component } from 'react'
import { connect } from "react-redux";
import { toggleMarker } from "../../actions/marksActions";
import { Marker } from "google-maps-react";

export class Markers extends Component {
  onMarkerClick = (props, marker) => {
    let set = {
      selectedPlace: props.nameTag,
      activeMarker: marker,
      showingInfoWindow: true
    };
    //console.log("here", this.props.marks, name, marker);
    this.props.toggleMarker(set);
    return alert("Hello! I am an alert box!");
  };

  componentDidMount() {
    console.log('calling markers.js didmount')
    this.loadMarker();
  }

  loadMarker = () => {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.props.map;

      this.props.marks.map(mark => {
        let marker = new maps.Marker({
          position: mark.position
        })

        marker.setMap(mapRef)
      })

    }
  }

  render() {
    const { marks } = this.props;

    return (
      <div>
        {console.log(this.props.map)}
        {/* {marks.map(mark => (
          <Marker
            key={mark.id}
            onClick={this.onMarkerClick}
            nameTag={mark.nameTag}
            position={mark.position}
          />
        ))} */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMarker: set => dispatch(toggleMarker(set))
  };
};

const mapStateToProps = state => {
  return {
    marks: state.marksFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Markers)