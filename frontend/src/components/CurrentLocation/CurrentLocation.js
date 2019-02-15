import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  addMarker,
  marksFetchData,
  toggleMarker
} from "../../actions/marksActions";
import RestaurantDetails from "../RestaurantComponents/AddRestaurant";

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export class CurrentLocation extends Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      newMarkPosition: {
        lat: "",
        lng: "",
        mark: {}
      },
      target: {}
    };
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevProps.marks !== this.props.marks) {
      this.loadMarker();
      console.log("previous----> ", prevProps.marks);
      console.log("current----> ", this.props.marks);
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map; // ref from the dom render()
    const current = this.state.currentLocation;

    const google = this.props.google; // prop passed from MapContainer (this.props.google)
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({
        center: center,
        zoom: zoom,
        disableDefaultUI: true
      });

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
      let test = this.map;

      maps.event.addListener(test, "click", function(event) {
        addMark(test, maps, event.latLng);
      });

      const addMark = (target, maps, latLng) => {
        this.props.addMarker(true);
        let marker = new maps.Marker({
          position: latLng,
          map: target
        });
        this.setMark(latLng, marker);
      };
    }
  }

  loadMarker = () => {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;
      let target = this.map;

      this.props.marks.map(mark => {
        let infoWindow = new maps.InfoWindow({
          content: "info window"
        });
        let marker = new maps.Marker({
          position: mark.position
        });

        const clickOnMarker = () => {
          this.props.toggleMarker(true);
          console.log(this.props.markOnClick);
        };

        marker.setMap(target);

        marker.addListener("click", function() {
          clickOnMarker();
        });
      });
    }
  };

  setMark = (position, mark) => {
    this.setState({
      newMarkPosition: {
        lat: position.lat(),
        lng: position.lng(),
        mark: mark
      }
    });
  };

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        {this.loadMarker()}
        <RestaurantDetails position={this.state.newMarkPosition} />
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
    addMarker: bool => dispatch(addMarker(bool)),
    toggleMarker: bool => dispatch(toggleMarker(bool))
  };
};

const mapStateToProps = state => {
  return {
    marks: state.marksFetchReducer,
    addMark: state.addMarkerReducer,
    markOnClick: state.marksToggleReducer
  };
};

CurrentLocation.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: 43.6472857,
    lng: -79.3925776
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentLocation);
