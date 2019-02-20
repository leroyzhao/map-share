import React from "react";
import { reduxForm, Field } from "redux-form";

import "./LocationForm.scss";

const validate = val => {
  const errors = {};

  if (!val.restaurantName) {
    errors.restaurantName = "Required";
  }
  if (!val.address) {
    errors.address = "Required";
  }
  if (!val.priceRange) {
    errors.priceRange = "Required";
  }
  if (!val.review) {
    errors.review = "You must write a review...";
  }

  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="control">
    <label className="title">{label}</label>
    {renderOnType(input, type)}
    {touched && (error && <span>{error}</span>)}
  </div>
);

const renderOnType = (name, type) => {
  switch (type) {
    case "text":
      return <input className="form-control" {...name} type={type} />;
    case "select":
      return (
        <select className="form-control" {...name}>
          <option />
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      );
    case "textarea":
      return <textarea className="form-control" {...name} rows="3" />;
    case "radio":
      return <div className="rating-container">{renderRating(name, type)}</div>;
    default:
      return <div />;
  }
};

const renderRating = (name, type) => {
  let rating = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];
  let size = rating.length;
  let children = [];
  let rc;

  for (let i = 0; i < size; i++) {
    children.push(
      <>
        <input type={type} id={rating[i]} {...name} value={rating[i]} />
        <label
          className={Number.isInteger(Number(rating[i])) ? "full" : "half"}
          for={rating[i]}
        />
      </>
    );
  }
  rc = <div className="rating">{children}</div>;

  return rc;
};

const LocationForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <Field
            name="restaurantName"
            component={renderField}
            type="text"
            label="Restaurant Name"
          />
        </div>

        <div className="field">
          <Field
            name="address"
            component={renderField}
            type="text"
            label="Address"
          />
        </div>

        <div className="field">
          <Field
            name="priceRange"
            component={renderField}
            label="Price Range"
            type="select"
          />
        </div>

        <div className="field">
          <Field
            name="rating"
            component={renderField}
            label="Rating"
            type="radio"
          />
        </div>

        <div className="field">
          <Field
            name="review"
            component={renderField}
            label="Review"
            type="textarea"
          />
        </div>

        <div className="field">
          <div className="control">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "addLocation",
  validate
})(LocationForm);
