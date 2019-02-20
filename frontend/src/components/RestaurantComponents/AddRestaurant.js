import React, { Component } from "react";
import { connect } from "react-redux";

import "./AddRestaurant.scss";
import { Modal } from "react-bootstrap";
import { addMarker, saveMark } from "../../actions/marksActions";
import LocationForm from "../Forms/LocationForm/LocationForm";

export class RestaurantDetails extends Component {
  handleClose = () => {
    this.props.addMarker(false);
    this.props.position.mark.setMap(null);
  };

  // handleSave = values => {
  //   this.props.saveMark(this.props.position);
  //   this.props.addMarker(false);

  //   return alert(JSON.stringify(values, 0, 2));
  // };

  handleSubmit = values => {
    let data = {
      ...values,
      position: { lat: this.props.position.lat, lng: this.props.position.lng }
    };
    this.props.saveMark(data);
    this.props.addMarker(false);
  };

  render() {
    const { addMark } = this.props;
    return (
      <div>
        <Modal
          show={addMark.showModal}
          onHide={this.handleClose}
          dialogClassName="dialog"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LocationForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveMark: data => dispatch(saveMark(data)),
    addMarker: bool => dispatch(addMarker(bool))
  };
};

const mapStateToProps = state => {
  return {
    addMark: state.addMarkerReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
