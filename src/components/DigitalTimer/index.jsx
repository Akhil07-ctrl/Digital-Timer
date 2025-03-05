import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    isRunning: false,
    timeRemaining: 25 * 60,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onDecrement = () => {
    this.setState(prev => ({
      timerLimit: Math.max(1, prev.timerLimit - 1),
      timeRemaining: (prev.timerLimit - 1) * 60,
    }))
  }

  onIncrement = () => {
    this.setState(prev => ({
      timerLimit: prev.timerLimit + 1,
      timeRemaining: (prev.timerLimit + 1) * 60,
    }))
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prev => {
        if (prev.timeRemaining <= 0) {
          clearInterval(this.timerId)
          return {
            isRunning: false,
            timeRemaining: prev.timerLimit * 60,
          }
        }
        return {timeRemaining: prev.timeRemaining - 1}
      })
    }, 1000)
  }

  toggleTimer = () => {
    const {isRunning, timeRemaining, timerLimit} = this.state
    if (isRunning) {
      // Pause timer
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    } else {
      // If timer is completed, reset the timeRemaining
      if (timeRemaining === 0) {
        this.setState({timeRemaining: timerLimit * 60})
      }
      // Start or resume timer
      this.startTimer()
      this.setState({isRunning: true})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      timerLimit: 25,
      timeRemaining: 25 * 60,
    })
  }

  formatTime = () => {
    const {timeRemaining} = this.state
    const mins = Math.floor(timeRemaining / 60)
    const secs = timeRemaining % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  render() {
    const {isRunning, timerLimit, timeRemaining} = this.state
    const isDisabled = isRunning || timeRemaining !== timerLimit * 60

    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display">
            <div className="elapsed-time">
              <h1 className="timer">{this.formatTime()}</h1>
              <p className="timer-status">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controls">
              <button
                type="button"
                className="control-btn"
                onClick={this.toggleTimer}
              >
                <img
                  src={
                    isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isRunning ? 'pause icon' : 'play icon'}
                  className="icon"
                />
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                className="control-btn"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                Reset
              </button>
            </div>
            <div className="limit-controls">
              <p className="limit-label">Set Timer Limit</p>
              <div className="limit-adjuster">
                <button
                  type="button"
                  className="adjust-btn"
                  onClick={this.onDecrement}
                  disabled={isDisabled}
                >
                  -
                </button>
                <p className="limit-value">{timerLimit}</p>
                <button
                  type="button"
                  className="adjust-btn"
                  onClick={this.onIncrement}
                  disabled={isDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
