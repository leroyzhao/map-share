import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMarker } from "../../actions/restaurantActions";

import "./RestaurantDetails.scss";

export class RestaurantDetails extends Component {
  handleOnClose = () => {
    this.props.toggleMarker(false);
  };

  getRatingSum = (reviews) => {
    if (reviews.length > 0) {
      const amount = (item) => {
        return item.reviewRating
      }

      const sum = (total, value) => {
        return total + value;
      }

      return reviews.map(amount).reduce(sum) / reviews.length;
    }
    else {
      return null
    }
  }

  render() {
    const { getRestaurant } = this.props;
    return (
      <div>
        {console.log(getRestaurant)}
        <div className="row">
          <div className="col-12 p-0">
            <img className="img-fluid" src="https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="" />
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
            {getRestaurant.api.restaurantName}
          </div>
          <div className="col-4">
            {getRestaurant.api.priceRange}
          </div>
          <div className="col-12">
            {getRestaurant.api.restaurantLocation}
          </div>
        </div>

        <div className="row rating">
          <div className="col-12">
            *---- RATING ----*
            </div>
          <div className="col-12">
            <div className="stars">
              <div className="empty-stars"></div>
              <div className="full-stars" style={{ width: `calc(100% * ${this.getRatingSum(getRestaurant.api.reviews) / 5})` }}></div>
            </div>
          </div>
        </div>

        <div className="row review">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                Review summary
              </div>
              <div className="col-6">
                <button className="btn btn-dark">add review</button>
              </div>
            </div>
            <hr />
          </div>

          <div className="col-2">
            pic
          </div>
          <div className="col-10 pl-0">
            {getRestaurant.api.reviews.map(review => {
              return (
                <div key={review.locationId}>
                  {review.reviewContent}
                </div>
              )
            })}
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
    getRestaurant: state.restaurantDetailReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
