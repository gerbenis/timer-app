import React from 'react';
import PropTypes from 'prop-types';

import { formatTime } from '../utils/timeUtils';

const calculateTotal = (timers) => {
  const totalInSeconds = timers
    .reduce(
      (totalTime, timerTime) => totalTime + timerTime.time,
      0,
    );

  return formatTime(totalInSeconds);
};

const Totals = props => (
  <div className="total-container">
    <span>Total:</span>
    <span>
      { calculateTotal(props.timers) }
    </span>
  </div>
);

Totals.propTypes = {
  timers: PropTypes.shape({
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default Totals;
