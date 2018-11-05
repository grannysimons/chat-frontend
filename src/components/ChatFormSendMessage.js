import React, { Component } from 'react';
import Recorder from 'react-mp3-recorder';

export default class ChatFormSendMessage extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleNewMessage} action="" id="sendingMessages" encType="multipart/form-data">
        <input
          type="text"
          name="message"
          onChange={this.props.handleOnChange}
          onFocus={this.props.handleOnFocus}
          onBlur={this.props.handleOnBlur}
          id="name"
        />
        <Recorder
          onRecordingComplete={this.props.onRecordingComplete}
          onRecordingError={this.props.onRecordingError}
        />
        <button className="send-button">
          <i className="fas fa-chevron-circle-right" />
        </button>
      </form>
    )
  }
}
