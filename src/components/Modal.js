import React, { Component, Fragment } from "react";
// import chat from "../lib/chat-service";
import Button from "../components/Button";

export default class Modal extends Component {
  state = {
    mailValue: ""
  };
  updateValue = e => {
    e.preventDefault();
    this.setState({ mailValue: e.target.value });
  };
  generateRandomId = () => {
    let random = parseInt(Math.floor(Math.random() * 10));
    this.generatedId = "modal" + random.toString();
  };
  getRandomId = prefix => {
    return prefix + "" + this.generatedId;
  };
  getClass = () => {
    let classes = "fas " + this.props.buttonClass;
    return classes;
  };
  onSubmitHandler = (e) => {
    // console.log('onSubmitHandler');
    e.preventDefault();
    this.props.onSubmitHandler(this.state.mailValue);
  };
  render() {
    this.generateRandomId();
    return (
      <Fragment>
        {/* <!-- Button trigger modal --> */}
        <Button
          type="button"
          // className="btn btn-primary"
          data-toggle="modal"
          data-target={this.getRandomId("#")}
        >
          <i className={this.getClass()} />
        </Button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id={this.getRandomId("")}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  {this.props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <input
                    type="email"
                    className="email"
                    name="email"
                    placeholder="user email"
                    onChange={this.updateValue}
                    value={this.state.mailValue}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmitHandler}>
                    {this.props.title}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
