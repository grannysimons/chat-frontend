import React, { Component, Fragment } from "react";
import Button from "../components/Button";

const style = {
  button: {
    color: '#333333',
    border: '2px solid #333333',
    // backgroundColor: '#fed22b',
    position: 'relative',
    top: '3px',
  },
  input:{
    width: '100%',
    padding: '5px 10px',
  },
  buttonNewMessage:{
    backgroundColor: '#fcf4cd',
    color: '#333333',
    borderColor: 'transparent',
  },
  title: {
    color: '#333333',
  },
  error: {
    color: 'red',
    paddingTop: '20px',
    textAlign: 'right'
  },
  i: {
    fontSize: '20px',
    position: 'relative',
    bottom: '2px',
  }
}

export default class Modal extends Component {
  state = {
    mailValue: "",
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
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onSubmitHandler(this.state.mailValue);
  };
  render() {
    this.generateRandomId();
    return (
      <Fragment>
        <Button
          type="button"
          data-toggle="modal"
          data-target={this.getRandomId("#")}
          style={style.button}
        >
          <i className={this.getClass()} style={style.i}/>
        </Button>
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
                <h5 className="modal-title" id="exampleModalCenterTitle" style={style.title}>
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
                    style={style.input}
                  />
                  <div className="log" style={style.error}>
                    {this.props.errorMessage}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmitHandler} style={style.buttonNewMessage}>
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
