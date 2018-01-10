import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = ({ onClick, active }) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyPress={onKeyPress}
      className={`btn ${active ? 'btn--play' : ''}`}
      role="button"
      tabIndex="0"
    >
      <svg viewBox="0 0 50 50">
        <g transform="translate(0 -283.77)">
          <circle cx="25" cy="308.77" r="25" />
          <path
            d="m18.466 296.77c-1.3525-0.0304-2.4659 1.0283-2.466 2.345v19.306c6.14e-4
            1.8048 2.0075 2.933 3.6142 2.0317l17.181-9.6529c1.607-0.90293 1.607-3.1604
            0-4.0633l-17.181-9.6529c-0.34971-0.19638-0.7445-0.30411-1.1481-0.31332z"
          />
        </g>
      </svg>
    </div>
  );
};

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default PlayButton;
