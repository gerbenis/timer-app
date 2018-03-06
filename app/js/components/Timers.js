import React, { Fragment } from 'react';
import Timer from './Timer';
import NewTimer from './NewTimer';
import {
  formatTime,
  formatTimeDecimal,
  validateTimeString,
  parseTimeString,
} from '../utils/timeUtils';

class Timers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timers: [],
    };

    this.incrementTimer = this.incrementTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.removeTimer = this.removeTimer.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleDisplayMode = this.toggleDisplayMode.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  componentWillUnmount() {
    this.state.timers.forEach((timer) => {
      if (timer.intervalId) {
        clearInterval(timer.intervalId);
      }
    });
  }

  incrementTimer(timerId) {
    this.setState({
      timers: this.state.timers.map(x => (x.id === timerId
        ? {
          ...x,
          time: x.time + 1,
          timeString: x.displayAsDecimal ? formatTimeDecimal(x.time + 1) : formatTime(x.time + 1),
        }
        : x
      )),
    });
  }

  toggleTimer(timerId) {
    const timer = this.state.timers.find(x => x.id === timerId);

    if (timer.intervalId) {
      clearInterval(timer.intervalId);
      this.setState({
        timers: this.state.timers.map(x => (x.id === timerId ? { ...x, intervalId: null } : x)),
      });
    } else if (timer.isValid) {
      let activeTimerId;
      const activeTimer = this.state.timers.find(x => x.intervalId);
      if (activeTimer) {
        activeTimerId = activeTimer.id;
        clearInterval(activeTimer.intervalId);
      }

      const intervalId = setInterval(() => this.incrementTimer(timerId), 1000);
      this.setState({
        timers: this.state.timers.map((x) => {
          if (x.id === timerId) {
            return { ...x, intervalId };
          }
          if (x.id === activeTimerId) {
            return { ...x, intervalId: null };
          }

          return x;
        }),
      });
    }
  }

  addTimer(title) {
    const timerId = new Date().getTime();
    const intervalId = setInterval(() => this.incrementTimer(timerId), 1000);
    let activeTimerId;
    const activeTimer = this.state.timers.find(x => x.intervalId);
    if (activeTimer) {
      activeTimerId = activeTimer.id;
      clearInterval(activeTimer.intervalId);
    }

    this.setState({
      timers: [
        ...this.state.timers.map(x => (x.id === activeTimerId ? { ...x, intervalId: null } : x)),
        {
          id: timerId,
          title,
          time: 0,
          timeString: '00:00:00',
          intervalId,
          displayAsDecimal: false,
          isValid: true,
        },
      ],
    });
  }

  removeTimer(timerId) {
    const timer = this.state.timers.filter(x => x.id === timerId)[0];

    if (timer.intervalId) {
      clearInterval(timer.intervalId);
    }
    this.setState({
      timers: this.state.timers.filter(x => x.id !== timerId),
    });
  }

  changeTitle(timerId, newTitle) {
    this.setState({
      timers: this.state.timers.map(x => (
        x.id === timerId ? { ...x, title: newTitle } : x
      )),
    });
  }

  toggleDisplayMode(timerId) {
    this.setState({
      timers: this.state.timers.map(x => (
        x.id === timerId
          ? {
            ...x,
            displayAsDecimal: !x.displayAsDecimal,
            timeString: !x.displayAsDecimal ? formatTimeDecimal(x.time) : formatTime(x.time),
            isValid: true,
          }
          : x
      )),
    });
  }

  changeTime(timerId, timeString) {
    let isValid = true;
    let newTime;
    const { time, displayAsDecimal } = this.state.timers.find(x => x.id === timerId);

    if (validateTimeString(timeString, displayAsDecimal)) {
      newTime = parseTimeString(timeString, displayAsDecimal);
    } else {
      isValid = false;
      newTime = time;
    }

    this.setState({
      timers: this.state.timers.map(x => (x.id === timerId
        ? {
          ...x,
          time: newTime,
          timeString,
          isValid,
        }
        : x
      )),
    });
  }

  calculateTotal() {
    const totalInSeconds = this.state.timers
      .reduce(
        (totalTime, timerTime) => totalTime + timerTime.time,
        0,
      );

    return formatTime(totalInSeconds);
  }

  render() {
    const timers = this.state.timers.map(x => (
      <Timer
        key={x.id}
        id={x.id}
        title={x.title}
        timeString={x.timeString}
        running={x.intervalId !== null}
        onToggleClick={this.toggleTimer}
        onRemoveClick={this.removeTimer}
        onTitleChange={this.changeTitle}
        displayAsDecimal={x.displayAsDecimal}
        onSwitchClick={this.toggleDisplayMode}
        onTimeChange={this.changeTime}
        isValid={x.isValid}
      />));

    return (
      <Fragment>
        {timers}
        <NewTimer onSubmit={this.addTimer} />
        <div>
          <span>Total:</span>
        </div>
        <div className="card totals">
          <span
            className="input input__title"
          >
            { this.calculateTotal() }
          </span>
        </div>
      </Fragment>
    );
  }
}

export default Timers;
