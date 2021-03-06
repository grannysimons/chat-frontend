import React, { Component } from 'react';
import AudioMessages from './AudioMessages';

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
        <AudioMessages 
            onRecordingComplete={this.props.onRecordingComplete}
            onRecordingError={this.props.onRecordingError}
            onTranscriptionResultCallback={this.props.resultCallback}
            onTranscriptionResetCallback={this.props.resetCallback}
            sendMessage={this.props.sendMessage}
            />
        <button className="send-button">
          <i className="fas fa-chevron-circle-right" />
        </button>
      </form>
    )
  }
}
