import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ModalButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

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
    let classes = "fas " + this.props.buttonclass;
    return classes;
  };
  onSubmitHandler = () => {
    // console.log('onSubmitHandler');
    // e.preventDefault();
    this.props.onSubmitHandler(this.state.mailValue);
  };

  render() {
    return (
      <Fragment>
        <Button bsStyle="primary" onClick={this.handleShow}>
          <i className={this.getClass()} />
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <input
                type="email"
                className="email"
                name="email"
                placeholder="user email"
                onChange={this.updateValue}
                value={this.state.mailValue}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
              <Button onClick={this.onSubmitHandler}>{this.props.title}</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Fragment>
    );
  }
}
