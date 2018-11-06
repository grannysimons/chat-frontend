import React, { Component } from 'react';

const style={
  AudioPlayer: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    color: 'gray',
    minWidth: '200px',
    backgroundColor: 'rgba(30,30,30, 0.4)',
    borderRadius: '3px',
  },
  control: {
    width: '20px',
    padding: '10px',
    fontSize: '16px',
    marginRight: '20px',
  },
  progress: {
    maxWidth: '120px',
    position: 'relative',
    top:'14px',
    backgroundColor: 'transparent',
    display:'block',
    marginRight: '18px',
    overflow: 'visible',
    width: '70%',
  },
  line: {
    maxWidth: '120px',
    height: '2px',
    position: 'relative',
    top: '6px',
    backgroundColor: 'gray',
    zIndex: '0',
  },
  spot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'black',
    borderRadius: '50%',
    position: 'relative',
    left: '0',
    zIndex: '2',
  },
  timers: {
    fontSize: '12px',
    width: '100%',
    position:'relative',
    top: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

export default class AudioPlayer extends Component {
  componentDidMount = () => {
    this.customId = 'AudioPlayer'+this.props.uniqueNumber;
    document.querySelector('#' + this.customId + ' .play').addEventListener('click', this.play);
    document.querySelector('#' + this.customId + ' .play').addEventListener('click', this.play);
    document.querySelector('#' + this.customId + ' .pause').addEventListener('click', this.pause);
    document.querySelector('#' + this.customId + ' .pause').style.display='none';
    console.log('#' + this.customId + ' .AudioTag');
    this.currentPosition = 0;
    this.currentTime = 0;
    // this.stepWidth = document.querySelector('#' + this.customId + ' .line').offsetWidth/this.intervalTime;

    this.timeStep = 60;
    this.currentStep = 0;
  }
  startProgres = () => {
      // this.currentTime += this.intervalTime;
      this.currentStep ++;
      this.currentPosition += this.distanceStep; 
      console.log('this.currentPosition ', this.currentPosition);
      console.log('this.currentStep ', this.currentStep);
      if(this.currentStep >= this.numSteps)
      {
        clearInterval(this.interval);
        delete this.interval;
        this.currentPosition = 0;
      }
      document.querySelector(`#${this.customId} .progress .spot`).style.left = this.currentPosition+'px';


      // var spot = document.querySelector(`#${this.customId} .progress .spot`);
      // this.currentTime = this.currentTime + this.intervalTime;
      // if(this.currentTime >= this.audioTag.duration * 1000){
      //   clearInterval(this.interval);
      //   delete this.interval;
      //   this.currentTime = 0;
      //   this.currentPosition = 0;
      //   spot.style.left = this.currentPosition+'px';
      //   return;
      // } 
      // console.log('stepWidth ', this.stepWidth);
      // console.log('offsetWidth ', document.querySelector('#' + this.customId + ' .line').offsetWidth);
      // this.currentPosition += this.stepWidth; 
      // spot.style.left = this.currentPosition+'px';
  }
  play = () => {
    this.audioTag = document.querySelector('#' + this.customId + ' .AudioTag');
    this.numSteps = this.audioTag.duration * 1000 / this.timeStep;
    this.distanceStep = parseFloat(document.querySelector('#' + this.customId + ' .line').offsetWidth/this.numSteps);

    document.querySelector('#' + this.customId + ' .control .play').style.display='none';
    document.querySelector('#' + this.customId + ' .control .pause').style.display='inline-block';
    
    this.audioTag.play();

    if(this.interval)
    {
      this.interval = setInterval(this.startProgres, this.timeStep);
      return;
    }
    this.interval = setInterval(this.startProgres, this.timeStep);
  }
  pause = () => {
    this.audioTag.pause();
    document.querySelector('#' + this.customId + ' .control .play').style.display='inline-block';
    document.querySelector('#' + this.customId + ' .control .pause').style.display='none';

    if(this.interval)
    {
      clearInterval(this.interval);
      return;
    }
    document.querySelector(`#${this.customId} .progress .spot`).style.left='0';

  }
  render() {
    return (
      <div className="AudioPlayer" id={'AudioPlayer'+this.props.uniqueNumber} style={style.AudioPlayer}>
        <audio src={this.props.src} className="AudioTag" preload='metadata'>
            Your browser does not support the <code>audio</code> element.
        </audio>
        <div className="control" style={style.control}>
          <i className="fas fa-play play"></i>
          <i className="fas fa-pause pause"></i>
        </div>
        <div className="progress" style={style.progress}>
          <div className="line" style={style.line}></div>
          <div className="spot" style={style.spot}></div>
          <div className="timers" style={style.timers}>
            <div className="currentTime" style={style.currentTime}>0:03</div>
            <div className="totalTime" style={style.totalTime}>1:02</div>
          </div>
        </div>
      </div>
    )
  }
}
