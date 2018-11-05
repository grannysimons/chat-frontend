import React, { Component } from 'react';
import Modal from '../components/Modal';
import Greeting from "../components/Greeting";
import chat from '../lib/chat-service';
import { withAuth } from './AuthProvider';

const style = {
  buttons: {
    position: 'fixed',
    bottom: '20px',
    width: '100%',
  },
  button: {
    // backgroundColor: 'white',
    width: '50px',
    height: '50px',
    borderWidth: '0',
    borderRadius: '50%',
    marginRight: '5px',
    color: '#333333',
    border: '3px solid #333333',
    backgroundColor: '#fed22b',
  },
  phUtm: {
    marginRight: '5px',
  },
  i: {
    fontSize: '30px',
  },
  modalBackdrop: {
    zIndex: '-10',
  }
}

class ButtonWrapper extends Component {
  handlerProfile = () => {
    this.props.history.push('/profile');
  }
  handleNewChat = (email) => {
    chat.newChat( email , this.props.user._id)
    .then(() => {
      this.props.history.push('/chats/' + email);
    })
  }
  render() {
    return (
      <div className="buttons" style={style.buttons}>
          <button className="button profile-button" onClick={this.handlerProfile} style={style.button}>
            <i className="fas fa-user" style={style.i}/>
          </button>
          <Modal buttonClass='fa-plus-circle' title="new Chat" onSubmitHandler={this.handleNewChat}>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <button type="submit" className="btn btn-primary" style={style.button}>Submit</button>
          </form>
          </Modal>
          <button onClick={this.props.logout} className="button logout" style={style.button}>
            <i className="fas fa-sign-out-alt" style={style.i}/>
          </button>
          <Greeting />
        </div>
    )
  }
}

export default withAuth()(ButtonWrapper);