import React from "react";
import { reduxForm, Field } from "redux-form";

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
    errors.review = "you must write a review";
  }

  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="control">
    <label className="field">{label}</label>
    {renderOnType(input, type)}
    {touched && (error && <span>{error}</span>)}
  </div>
);

const renderOnType = (input, type) => {
  switch (type) {
    case "text":
      return <input className="input" {...input} type={type} />;
    case "select":
      return (
        <select {...input}>
          <option />
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      );
    case "textarea":
      return <textarea {...input} />;
  }
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
          <div className="control">
            <label className="label">Review</label>
            <Field name="review" component={renderField} type="textarea" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link">Save</button>
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
