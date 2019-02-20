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
        {console.log(getRestaurant.data)}
        <div className="detailsContainer container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <img className="img-fluid" src={getRestaurant.data.img} alt="" />
            </div>
            <div className="btn-custom">
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.handleOnClose}
              >
                close
              </button>
            </div>
          </div>

          <div className="row preview-info-custom">
            <div className="col-8">
              {getRestaurant.data.restaurantName}
            </div>
            <div className="col-4">
              {getRestaurant.data.priceRange}
            </div>
            <div className="col-12">
              {getRestaurant.data.address}
            </div>
          </div>
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
