import React from 'react';
import PropTypes from 'prop-types';

import FlipCardDisplay from './time-displays/flip-card-display';
import TimerControlBar from './controls/timer-controls';

// import shipBell from '../assets/sound/ship-bell.mp3';

// TODO: This should be a HOC for a common ClockWidget Component
const PommodoroWidget = (props) => {
  const remaining = props.timeMark - props.seconds;
  const {
    isActive,
    onStartClick,
    onPauseClick,
    onStopClick,
  } = props;
  const ctrlBarProps = {
    isActive,
    onStartClick,
    onPauseClick,
    onStopClick,
  };
  return (
    <div className="pom-wdgt__wrpr">
      <FlipCardDisplay seconds={remaining} />
      <TimerControlBar {...ctrlBarProps} />
    </div>
  );
};

PommodoroWidget.propTypes = {
  seconds: PropTypes.number.isRequired,
  timeMark: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
};

export default PommodoroWidget;
