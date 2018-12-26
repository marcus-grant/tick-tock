import React from 'react';
import PropTypes from 'prop-types';

import { PushButtonStop, ToggleButtonStartPause } from './clock-widget-buttons';


/** TimerControls which gives callbacks to the three common timer controls:
 *  * Start - starts the timer, setting active state to true.
 *  * Stop - stops the timer, set's it back to 0 seconds and disables it.
 *  * Pause - pauses the timer, maintaining it's time state
 */
const TimerControlBar = (props) => {
  // Destructure props
  const {
    finished,
    isActive,
    onStartClick,
    onPauseClick,
    onStopClick,
  } = props;
  const startPauseProps = {
    enabled: !finished, isActive, onStartClick, onPauseClick,
  };
  return (
    <div className="timer-ctrls__wrpr">
      <PushButtonStop onStopClick={onStopClick} />
      <ToggleButtonStartPause {...startPauseProps} />
    </div>
  );
};

TimerControlBar.propTypes = {
  finished: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  // separateStartPause: PropTypes.bool,
};

export default TimerControlBar;
