import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { toggleMarker } from "../../actions/restaurantActions";
import {
  toggleAddReview,
  reviewFetchData,
  toggleEditReview
} from "../../actions/reviewActions";

import "./RestaurantDetails.scss";

import PostReview from "../ReviewComponents/PostReview";
import PutReview from "../ReviewComponents/PutReview";

export class RestaurantDetails extends Component {
  state = {
    reviewId: ""
  };

  componentWillMount() {
    this.props.reviewFetchData(this.props.getRestaurant.data.locationId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getRestaurant !== this.props.getRestaurant) {
      this.props.reviewFetchData(this.props.getRestaurant.data.locationId);
    }
  }

  handleOnClose = () => {
    this.props.toggleMarker(false);
  };

  handleAddReview = () => {
    this.props.toggleAddReview(true);
  };

  handleEditReview = review => {
    if (this.props.getUserData._id === review.reviewUser.userId) {
      this.setState({
        reviewId: review._id
      });

      this.props.toggleEditReview(true);
    } else {
      console.log("current userID: ", this.props.getUserData._id);
      console.log("not same userID: ", review.reviewUser.userId);
    }
  };

  getRatingSum = reviews => {
    if (reviews.length > 0) {
      const amount = item => {
        return item.reviewRating;
      };

      const sum = (total, value) => {
        return total + value;
      };

      return reviews.map(amount).reduce(sum) / reviews.length;
    } else {
      return null;
    }
  };

  render() {
    const { getRestaurant, getReviews } = this.props;
    return (
      <div>
        <PostReview locationId={getRestaurant.data.locationId} />
        <PutReview
          locationId={getRestaurant.data.locationId}
          reviewId={this.state.reviewId}
        />
        <div className="row">
          <div className="col-12 p-0">
            <img
              className="img-fluid"
              src="https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
              alt=""
            />
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
          <div className="col-8">{getRestaurant.data.restaurantName}</div>
          <div className="col-4">{getRestaurant.data.priceRange}</div>
          <div className="col-12">{getRestaurant.data.restaurantLocation}</div>
        </div>

        <div className="row rating">
          <div className="col-12">*---- RATING ----*</div>
          <div className="col-12">
            <div className="stars">
              <div className="empty-stars" />
              <div
                className="full-stars"
                style={{
                  width: `calc(100% * ${this.getRatingSum(getReviews) / 5})`
                }}
              />
            </div>
          </div>
        </div>

        <div className="row review">
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-8">All reviews</div>
              <div className="col-4">
                <button
                  onClick={this.handleAddReview}
                  className="btn btn-primary btn-sm"
                >
                  add review
                </button>
              </div>
            </div>
          </div>

          <div className="col-12">
            {getReviews.length &&
              getReviews.map(review => {
                return (
                  <div className="row" key={review._id}>
                    <div
                      className="col-12"
                      onClick={() => this.handleEditReview(review)}
                    >
                      {review.reviewContent}
                      {review.updatedAt
                        ? moment(parseInt(review.updatedAt)).fromNow()
                        : moment(parseInt(review.createdAt)).fromNow()}
                      {review.reviewUser.userFirstName}
                      {review.reviewUser.userLastName}
                    </div>
                    <div className="col-12">
                      <hr className="review-hr" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMarker: bool => dispatch(toggleMarker(bool)),
    toggleAddReview: bool => dispatch(toggleAddReview(bool)),
    toggleEditReview: bool => dispatch(toggleEditReview(bool)),
    reviewFetchData: data => dispatch(reviewFetchData(data))
  };
};

const mapStateToProps = state => {
  return {
    getRestaurant: state.restaurantDetailReducer,
    getReviews: state.reviewsContentReducer,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
