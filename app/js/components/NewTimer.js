import React from 'react';
import PropTypes from 'prop-types';
import { PlayButton } from './buttons';
import { getFirstFocusableParent } from '../utils/domUtils';

class NewTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.createTimer = this.createTimer.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.createTimer(e);
    }
  }

  createTimer(e) {
    this.props.onSubmit(this.state.title);
    this.setState({ title: '' });

    const focuedElement = getFirstFocusableParent(e.target);
    if (focuedElement) {
      focuedElement.blur();
    }
  }

  render() {
    return (
      <div className="card">
        <input
          type="text"
          className="input input__title"
          placeholder="Enter Task Name..."
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          onKeyPress={this.onKeyPress}
        />
        <PlayButton onClick={this.createTimer} active />
      </div>
    );
  }
}

NewTimer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewTimer;
