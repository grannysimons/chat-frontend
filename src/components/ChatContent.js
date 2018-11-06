import React, { Component } from 'react';
import helper from "../helpers";
import AudioPlayer from './AudioPlayer';

export default class ChatContent extends Component {
  render() {
    return (
      <div className="messages">
        {this.props.messageList.map((message, index) => {
          let side = message.user === this.props.user._id ? "right" : "left";
          let searchResult = message.searchResult === true ? " searchResult" : "";
          side += " message" + searchResult;
          return (
            <div className={side} key={index}>
              {
                message.isAudio ? 
                // <audio src={'http://localhost:3010/audios/' + message._id + '.wav'} controls>
                //     Your browser does not support the <code>audio</code> element.
                // </audio>
                <AudioPlayer uniqueNumber={index} src={'http://localhost:3010/audios/' + message._id + '.wav'}/>
                : message.text
              }
              <div>
                <small>{helper.dateChatFormat(message.time)}</small>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}
