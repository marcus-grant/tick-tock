import React from 'react';
import PropTypes from 'prop-types';

import BasicTimeDisplay from './time-displays/BasicTimeDisplay';
// import FlipCardDisplay from './time-displays/flip-card-display';
import TimerControlBar from './controls/TimerControls';

// import shipBell from '../assets/sound/ship-bell.mp3';

// TODO: This should be a HOC for a common ClockWidget Component
// TODO: Add settings controls for switching which time display comp. to use
const CountDownTimerWidget = (props) => {
  const remaining = props.stopCount - props.count;
  const {
    finished,
    isActive,
    onStartClick,
    onPauseClick,
    onStopClick,
    onResetClick,
  } = props;
  const ctrlBarProps = {
    finished,
    isActive,
    onStartClick,
    onPauseClick,
    onStopClick,
    onResetClick,
  };
  return (
    <div className="cnt-dn-wdgt__wrpr">
      { /* <FlipCardDisplay seconds={remaining} /> */}
      <BasicTimeDisplay seconds={remaining} />
      <TimerControlBar {...ctrlBarProps} />
    </div>
  );
};

CountDownTimerWidget.propTypes = {
  count: PropTypes.number.isRequired,
  stopCount: PropTypes.number.isRequired,
  finished: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default CountDownTimerWidget;
