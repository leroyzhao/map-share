import React, { Component } from "react";
import { connect } from "react-redux";

//import dispatch actions for create/join group
import { createGroup, joinGroup } from "../../../actions/groupActions"

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
    } else {
      console.log('dispatch action:', this.props.action)
      if (this.props.action === "join") {
        console.log("want to join group with id: ", val)
        this.props.joinGroup(val, this.props.getUserData._id)
      } else if (this.props.action === "create") {
        console.log("want to create group with name: ", val)
        console.log("user thats creating: ", this.props.getUserData._id )
        this.props.createGroup(val, this.props.getUserData._id)
      } else console.log("invalid action!!!!!!!!")
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

const mapStateToProps = state => {
  return {
    getUserData: state.userFetchReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (a,b) => dispatch(createGroup(a,b)),
    joinGroup: data => dispatch(joinGroup(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm)
