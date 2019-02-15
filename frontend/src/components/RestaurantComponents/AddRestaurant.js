import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import "./AddRestaurant.scss";
import { Modal, Button } from "react-bootstrap";
import { addMarker, saveMark } from "../../actions/marksActions";

export class RestaurantDetails extends Component {
  handleClose = () => {
    this.props.addMarker(false);
    this.props.position.mark.setMap(null);
  };

  handleSave = values => {
    this.props.saveMark(this.props.position);
    this.props.addMarker(false);
    return alert(JSON.stringify(values, 0, 2));
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
            <Form
              onSubmit={this.handleSave}
              initialValues={{ employed: true }}
              subscription={{ submitting: true, pristine: true }}
            >
              {({ handleSubmit, reset, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Restaurant Name</label>
                    <Field
                      name="firstName"
                      component="input"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label>Adress</label>
                    <Field
                      name="lastName"
                      component="input"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <label>Price Range</label>
                    <Field name="priceRange" component="select">
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                    </Field>
                  </div>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting || pristine}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Form>
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
