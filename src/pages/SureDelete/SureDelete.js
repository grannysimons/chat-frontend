import React, { Component } from "react";
import "./SureDelete.css";
import chat from '../../lib/chat-service';

export default class SureDelete extends Component {
  handleClickNo = e => {
    e.preventDefault();
    this.props.history.push("/profile");
  };
  handleClickYes = e => {
    e.preventDefault();
    document.querySelector(".byebyecontainer").style.display = "block";
    setTimeout(()=>{
      chat.deleteUser(this.props.user._id)
      .then(result => {
        if(result.data.delete === 'ok')
        {
          this.props.logout();
          this.props.history.push('/login');
        }
      })
    }, 2000);
  };
  render() {
    return (
      <div className="container-fluid sureDelete">
        <div className="container-inner">
          <h1>
            <i className="far fa-sad-tear" />
          </h1>
          <p className="text1">So, you leave us...</p>
          <p className="text2">Are you sure?</p>
          <form>
            <button onClick={this.handleClickYes} className="yes">
              Yes
            </button>
            <button onClick={this.handleClickNo} className="no">
              No
            </button>
          </form>
        </div>
        <div className="byebyecontainer">
          <div className="byebye">
            <div className="outer-balls">
              <div className="ball ball1" />
              <div className="ball ball2" />
              <p className="byebye-text">Deleting account</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
