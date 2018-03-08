import React, { Fragment } from 'react';
import Timer from './Timer';
import NewTimer from './NewTimer';
import Total from './Total';
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

    this.loadData = this.loadData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.removeTimer = this.removeTimer.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.toggleDisplayMode = this.toggleDisplayMode.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  componentDidMount() {
    window.onbeforeunload = this.saveData;
    this.loadData();
  }

  loadData() {
    const dataString = window.localStorage.getItem('data');

    if (dataString) {
      const data = JSON.parse(dataString).map(x => ({
        id: x.id,
        title: x.title,
        time: x.time,
        timeString: formatTime(x.time),
        intervalId: null,
        displayAsDecimal: false,
        isValid: true,
      }));

      this.setState({
        timers: data,
      });
    }
  }

  saveData() {
    const data = JSON.stringify(this.state.timers.map(x => ({
      id: x.id,
      title: x.title,
      time: x.time,
    })));

    window.localStorage.setItem('data', data);
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
        <div className="app-container">
          <div className="timers-container">
            {timers}
            <NewTimer onSubmit={this.addTimer} />
          </div>
          <Total
            timers={this.state.timers}
          />
        </div>
      </Fragment>
    );
  }
}

export default Timers;
