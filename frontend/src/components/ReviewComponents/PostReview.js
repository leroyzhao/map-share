import React, { Component } from "react";
import { connect } from "react-redux";

import "./PostReview.scss";
import { Modal } from "react-bootstrap";
import { toggleAddReview, postReview } from "../../actions/reviewActions";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";

export class PostReview extends Component {
  handleClose = () => {
    this.props.toggleAddReview(false);
  };

  // handleSave = values => {
  //   this.props.saveMark(this.props.position);
  //   this.props.addMarker(false);

  //   return alert(JSON.stringify(values, 0, 2));
  // };

  handleSubmit = values => {
    let data = {
      locationId: this.props.locationId,
      reviewUser: {
        userId: this.props.getUserData._id,
        userFirstName: this.props.getUserData.userFirstName,
        userLastName: this.props.getUserData.userLastName
      },
      reviewContent: values.review,
      reviewRating: values.rating
    };

    this.props.postReview(data);
  };

  render() {
    const { addReview } = this.props;
    return (
      <div>
        <Modal
          show={addReview.showModal}
          onHide={this.handleClose}
          dialogClassName="dialog"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAddReview: bool => dispatch(toggleAddReview(bool)),
    postReview: data => dispatch(postReview(data))
  };
};

const mapStateToProps = state => {
  return {
    addReview: state.addReviewReducer,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostReview);
