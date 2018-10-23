import React, { Component } from 'react';
import './ChatListElement.css';

export default class ChatListElement extends Component {
  render() {
    return (
      <div className="chat">
        <button className="chatElement">
          <div className="col8 div1">
            <div className="interlocutor">{this.props.element.name}</div>
            <div className="date"><small>last {this.props.element.lastDate}</small></div>
          </div>
          <div className="col2 div2">
          {this.props.element.num}
          </div>
          <div className="col2 div3">
            <i className="fas fa-chevron-right"></i>
          </div>
        </button>
      </div>
    )
  }
}
