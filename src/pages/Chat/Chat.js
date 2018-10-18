import React, { Component } from "react";
import './Chat.css';

export default class Chat extends Component {
  render() {
    return (
      <div>
        <div className="chat">
          <div className="name">Pepe</div>
          <div className="messages">
            <div className="left message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="left message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut.
            </div>
            <div className="right message">
              Ipsam explicabo atque deserunt tempora dolore, ducimus non numquam
              et ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="left message">Lorem.</div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam
            </div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur
            </div>
            <div className="right message">Lorem, ipsum dolor sit</div>
          </div>
          <div className="send-form">
            <div className="back-button">
              <i className="fas fa-chevron-left" />
            </div>
            <form action="">
              <input type="text" />
              <button className="send-button">
                <i className="fas fa-chevron-circle-right" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
