import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMarker } from "../../actions/marksActions";

import "./RestaurantDetails.scss";

export class RestaurantDetails extends Component {
  handleOnClose = () => {
    this.props.toggleMarker(false);
  };

  render() {
    const { markOnClick } = this.props;

    return (
      <div>
        <div
          className="detailsContainer"
          style={
            markOnClick.status ? { display: "inline" } : { display: "none" }
          }
        >
          <button onClick={this.handleOnClose}>close</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMarker: bool => dispatch(toggleMarker(bool))
  };
};

const mapStateToProps = state => {
  return {
    markOnClick: state.marksToggleReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
