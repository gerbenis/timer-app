import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ onClick, active }) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className="switch"
      onClick={onClick}
      onKeyPress={onKeyPress}
      role="button"
      tabIndex="0"
    >
      <div className={active ? 'switch__toggle switch__toggle--active' : 'switch__toggle'} />
      <div className="switch__value">0:0</div>
      <div className="switch__value">0.0</div>
    </div>
  );
};

Switch.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Switch;
