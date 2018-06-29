import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ secondsRemaining, text, tick }) => (
  <div className="timer__container">
    <h2>{text}</h2>
    <h1>{secondsRemaining}</h1>
    <h4>Placeholder for TimerControls</h4>
    <button onClick={tick}>tick</button>
  </div>
);

Timer.propTypes = {
  secondsRemaining: PropTypes.number.isRequired,
  text: PropTypes.string,
  tick: PropTypes.func.isRequired,
}; Timer.defaultProps = { text: '' };

export default Timer;
