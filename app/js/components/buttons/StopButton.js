import React from 'react';
import PropTypes from 'prop-types';

const StopButton = ({ onClick }) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyPress={onKeyPress}
      className="btn btn--stop"
      role="button"
      tabIndex="0"
    >
      <svg viewBox="0 0 50 50">
        <g transform="translate(0 -283.77)">
          <circle cx="25" cy="308.77" r="25" />
          <path
            d="m15.003 296.77c-1.1049-2e-3 -2.0017 0.8931-2.0029
            1.998v19.999c-0.0015 1.1068 0.89609 2.0044 2.0029
            2.0029h19.999c1.1049-1e-3 1.9995-0.89802
            1.998-2.0029v-19.999c-0.0012-1.1029-0.89501-1.9968-1.998-1.998z"
          />
        </g>
      </svg>
    </div>
  );
};

StopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StopButton;
