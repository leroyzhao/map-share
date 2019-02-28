import React, { Component } from "react";
import { connect } from "react-redux";
//import dispatch actions for create/join group

import "./GroupForm.scss";

class GroupForm extends Component {
  constructor(props) {
    super(props)
    console.log('props in constructor',props)
    this.state = {
      "errorMessage": "",
      "input": ""
    }
  }
  validate = val => {
    if (!val) {
      this.setState({"errorMessage": "You didn't enter anything!"})
    }
  }
  handleChange = (e) => {
    this.setState({"input": e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("action: ", this.props.action)
    console.log("value: ", this.state.input)
    this.validate(this.state.input)
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <div className="form-group">
          <label>{this.props.text}</label>
          <input type="text" className="form-control" value={this.state.input} onChange={this.handleChange} />
        </div>
        <button className="btn btn-secondary" type="submit" id="submit-button">
          Submit
        </button>

        {this.state.errorMessage ?
          (
            <div className="error-message">
              {this.state.errorMessage}
              <br/>
              You must be in a group to use Map-Share
            </div> 
          ) : null
        }

      </form>
      
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     signInSuccess: bool => dispatch(signInSuccess(bool))
//   };
// };

export default connect()(GroupForm)
