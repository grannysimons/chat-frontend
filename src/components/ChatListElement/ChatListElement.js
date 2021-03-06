import React, { Component } from 'react';
import './ChatListElement.css';

export default class ChatListElement extends Component {
  render() {
    return (
      <div className="chatListElement">
        <button className="chatElement">
          <div className="col8 div1">
            <div className="interlocutor">{this.props.element.name}</div>
            <div className="date"><small>last {this.props.element.lastDate}</small></div>
          </div>
          <div className="col2 div2">
          {this.props.element.num}
          </div>
          {
            this.props.element.notSeen && <div className="col1 div3"><i className="fas fa-certificate"></i></div>
          }
          <div className="col1 div3">
            <i className="fas fa-chevron-right"></i>
          </div>
        </button>
      </div>
    )
  }
}
