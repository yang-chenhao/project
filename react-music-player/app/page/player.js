import React from 'react'
import Progress from '../components/progress'
import './player.less'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null

let Player = React.createClass({
  getInitialState() {
    return {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime:'',
      playType:'cycle',
    }
  },
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      })
    })
  },
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
  },
  changeVolumeHander(progress) {
    $('#player').jPlayer('volume', progress)
  },
  play() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  },
  playNext() {
    Pubsub.publish('PLAY_NEXT', this.state.playType)
  },
  playPrev() {
    Pubsub.publish('PLAY_PREV', this.state.playType)
  },
  changePlayType() {
    var currentPlayType = this.state.playType
    var nextPlayType = null
    if (currentPlayType === "cycle") {
      nextPlayType = "random"
    } else if (currentPlayType === "random") {
      nextPlayType = "once"
    } else {
      nextPlayType = "cycle"
    }
    this.setState({
      playType: nextPlayType
    })
  },
  formatTime(time) {
    time = Math.floor(time)
    let miniutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)

    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${miniutes}:${seconds}`
  },
  render() {
    return (
        <div className="player-page">
            <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-{this.state.leftTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top:5}}></i>
                            <div className="volume-wrapper">
                              <Progress
                                progress={this.state.volume}
                                onProgressChange={this.changeVolumeHander}
                                barColor="#aaa"
                              >
                              </Progress>
                            </div>
                        </div>
                    </div>
                    <div style={{height:10,lineHeight:'10px',marginTop:10}}>
                      <Progress
                        progress={this.state.progress}
                        onProgressChange={this.progressChangeHandler}
                      >
                      </Progress>
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={this.playPrev}></i>
                            <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                              onClick={this.play}
                            ></i>
                            <i className="icon next ml20" onClick={this.playNext}></i>
                        </div>
                        <div className="-col-auto">
                            <i className={`icon repeat-${this.state.playType}`} onClick={this.changePlayType}></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        </div>
    )
  }
})

export default Player
