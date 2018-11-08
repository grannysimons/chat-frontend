import React, { Component } from 'react';
import helper from "../helpers";
import AudioPlayer from './AudioPlayer';
import env from '../env';

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
                // <AudioPlayer uniqueNumber={index} src={'http://localhost:3010/audios/' + message._id + '.wav'} transcriptionText={message.text}/>
                <AudioPlayer uniqueNumber={index} src={ env.REACT_APP_apiURL +'/audios/' + message._id + '.wav'} transcriptionText={message.text}/>
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
