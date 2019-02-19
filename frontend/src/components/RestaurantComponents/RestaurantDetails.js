import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMarker } from "../../actions/restaurantActions";

import "./RestaurantDetails.scss";

export class RestaurantDetails extends Component {
  handleOnClose = () => {
    this.props.toggleMarker(false);
  };

  render() {
    const { markOnClick, getRestaurant } = this.props;

    return (
      <div>
        <div className="detailsContainer">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleOnClose}
          >
            close
          </button>
          <div className="container">{JSON.stringify(getRestaurant)}</div>
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
    markOnClick: state.marksToggleReducer,
    getRestaurant: state.restaurantDetailReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
