import React, { Component } from "react";
import { connect } from "react-redux";

//import dispatch actions for create/join group
import "./GroupLanding.scss";
import GroupForm from "../Forms/GroupForm/GroupForm";


export class GroupLanding extends Component {
  render() {
    return (
      <div className="container-fluid groupForm-container">
        <div className="container">
          <div className="card text-center rounded">
            <img className="card-img-top" src="" alt="" />
            <div className="card-body">
              <h4 className="card-title">
                You aren't in a group yet!
              </h4>
              <p className="card-text">Please join or create a group</p>

              <div>
                <p>
                  <a className="btn btn-primary group-option collapsed" data-toggle="collapse" href="#joinGroup" role="button" aria-expanded="false" aria-controls="joinGroup">
                    Join Group
                  </a>
                  <a className="btn btn-primary group-option collapsed" data-toggle="collapse" href="#createGroup" role="button" aria-expanded="false" aria-controls="createGroup">
                    Create Group
                  </a>
                </p>
                <div id="groupWrapper">
                  <div className="collapse" id="createGroup" data-parent="#groupWrapper">
                    <div className="card-body">
                      <GroupForm text={"New Group Name"} action={"create"} />
                    </div>
                  </div>
                  <div className="collapse" id="joinGroup" data-parent="#groupWrapper">
                    <div className="card-body">
                      <GroupForm text={"Existing Group Id"} action={"join"} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     signInSuccess: bool => dispatch(signInSuccess(bool))
//   };
// };

export default connect(
  null,
  null
)(GroupLanding);
