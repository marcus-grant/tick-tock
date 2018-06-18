import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Todo, this should also be able contained inside a TimerListContainer to store ea. timer info...
// time being counted shouldn't be stored in the list as some timers aren't being updated when stop

@connect(store => ({
  timeLeft: store,
}))

class TimerContainer extends React.Component {
  tick = () => {
    this.props.decrementTimerAction();
    // this.props.incrementTimerAction();
  }

  render() {
    const { timeLeft, text } = this.props;
    return (
      <div className="timer__container">
        <h2>{text}</h2>
        <h1>{timeLeft}</h1>
        <h4>Placeholder for TimerControls</h4>
      </div>
    );
  }
}

TimerContainer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  // incrementTimerAction: PropTypes.func.isRequired,
  decrementTimerAction: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TimerContainer.defaultProps = {
  text: '',
};

export default TimerContainer;
