import React, { Component } from 'react';
import helper from "../helpers";
import AudioPlayer from './AudioPlayer';
import env from '../env';

const style={
  metaData: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  arrow: {
    backgroundColor: 'transparent !important',
    border: 'transparent 0px solid',
    WebkitAppearance: 'none !important',
  }
}

export default class ChatContent extends Component {
  showTranscriptionHandler = (uniqueNumber) => {
    let selector='.messages #AudioPlayer' + uniqueNumber + ' .transcription';
    if(document.querySelector('.messages #AudioPlayer' + uniqueNumber + ' ~ .messageMetaData .arrow i').classList.contains('fa-chevron-down'))
    {
      document.querySelector('.messages #AudioPlayer' + uniqueNumber + ' ~ .messageMetaData .arrow i').setAttribute('class', 'fas fa-chevron-up');
      document.querySelector(selector).style.display = 'block';
    }
    else if(document.querySelector('.messages #AudioPlayer' + uniqueNumber + ' ~ .messageMetaData .arrow i').classList.contains('fa-chevron-up'))
    {
      document.querySelector('.messages #AudioPlayer' + uniqueNumber + ' ~ .messageMetaData .arrow i').setAttribute('class', 'fas fa-chevron-down');
      document.querySelector(selector).style.display = 'none';
    }
  }
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
                <AudioPlayer uniqueNumber={index} src={ env.PUBLICBUCKET_BASEURL + message._id + '.wav'} transcriptionText={message.text}/>
                : <p className="message-text">{message.text}</p>
              }
              <div className="messageMetaData" style={style.metaData}>
                <small>{helper.dateChatFormat(message.time)}</small>
                {
                  message.isAudio && message.text!== ''? <button className="arrow" type="button" onClick={()=>{this.showTranscriptionHandler(index)}}><i className="fas fa-chevron-down"></i></button> : ''
                }
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}
