import React from 'react';
import PropTypes from 'prop-types';

const PauseButton = ({ onClick }) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyPress={onKeyPress}
      className="btn btn--pause"
      role="button"
      tabIndex="0"
    >
      <svg viewBox="0 0 50 50">
        <g transform="translate(0 -283.77)">
          <circle cx="25" cy="308.77" r="25" />
          <path
            d="m16.713 296.77c-0.94568 1e-3 -1.7121 1.074-1.7131
            2.3976v19.205c1e-3 1.3236 0.76742.3962 1.7131 2.3977h4.5738c0.94568-1e-3
            1.7121-1.0741 1.7131-2.3977v-19.205c-1e-3 -1.3236-0.7674-2.3962-1.7131-2.3976z"
          />
          <path
            d="m28.713 296.77c-0.94568 1e-3 -1.7121 1.074-1.7131
            2.3976v19.205c1e-3 1.3236 0.7674 2.3962 1.7131 2.3977h4.5738c0.94568-9.8e-4
            1.7121-1.0741 1.7131-2.3977v-19.205c-9.98e-4 -1.3236-0.7674-2.3962-1.7131-2.3976z"
          />
        </g>
      </svg>
    </div>
  );
};

PauseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PauseButton;
