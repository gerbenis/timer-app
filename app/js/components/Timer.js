import React from 'react';
import PropTypes from 'prop-types';
import { PlayButton, PauseButton, StopButton, Switch } from './buttons';

const Timer = ({
  id,
  displayAsDecimal,
  timeString,
  title,
  running,
  onToggleClick,
  onRemoveClick,
  onTitleChange,
  onSwitchClick,
  onTimeChange,
  isValid,
}) => (
  <div className="card">
    <input
      type="text"
      className="input input__title"
      placeholder="Enter Task Name..."
      value={title}
      onChange={e => onTitleChange(id, e.target.value)}
    />
    { running
      ? <span>{timeString}</span>
      : <input
        type="text"
        className={`input input__time ${isValid ? '' : 'input--error'}`}
        placeholder={displayAsDecimal ? '0.00' : '00:00:00'}
        value={timeString}
        onChange={e => onTimeChange(id, e.target.value)}
      />
    }
    <Switch onClick={() => onSwitchClick(id)} active={displayAsDecimal} />
    { running
      ? <PauseButton onClick={() => onToggleClick(id)} />
      : <PlayButton onClick={() => onToggleClick(id)} active={isValid} />
    }
    <StopButton onClick={() => onRemoveClick(id)} />
  </div>
);

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  displayAsDecimal: PropTypes.bool.isRequired,
  timeString: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  running: PropTypes.bool.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onSwitchClick: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default Timer;
