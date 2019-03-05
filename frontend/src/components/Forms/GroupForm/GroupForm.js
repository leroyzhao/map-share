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
      let { action, getUserData} = this.props
      console.log('dispatch action:', action)
      if (this.props.action === "join") {
        console.log("group, user", val, getUserData._id )
        console.log("user thats joining: ", getUserData._id )
        this.props.joinGroup(val, getUserData._id)
      } else if (action === "create") {
        console.log("want to create group with name: ", val)
        console.log("user thats creating: ", getUserData._id )
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.action === "join") {
      this.setState({"errorMessage": this.props.joinGroupError})
    }
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
              You must be in a group to use map-share-api
            </div> 
          ) : null
        }

      </form>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    getUserData: state.userFetchReducer,
    joinGroupError: state.joinGroupErrorReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (a,b) => dispatch(createGroup(a,b)),
    joinGroup: (a,b) => dispatch(joinGroup(a,b))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm)
