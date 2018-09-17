import React from 'react';
import PropTypes from 'prop-types';

import { decimalDigitsFromSeconds } from '../../util/second-conversion';

// TODO: Handle undefined case to chose the default time display
// TODO: Maybe give classnames from a "type prop"
// !!! Don't do the above, it should be the parent that does this
// TODO: Handle different time divisions and groupings of them for display
const FlipCardDisplay = (props) => {
  const {
    tenMinutes,
    minutes,
    tenSeconds,
    seconds,
  } = decimalDigitsFromSeconds(props.seconds);

  return (
    <div className="time-disp__wrpr pomm-time-disp__wrpr">
      <div className="time-disp__flip-card-group">
        <div className="time-disp__flip-card">
          <span>{tenMinutes}</span>
        </div>
        <div className="time-disp__flip-card">
          <span>{minutes}</span>
        </div>
      </div>
      <div className="time-disp__flip-card-group">
        <div className="time-disp__flip-card">
          <span>{tenSeconds}</span>
        </div>
        <div className="time-disp__flip-card">
          <span>{seconds}</span>
        </div>
      </div>
    </div>
  );
};

FlipCardDisplay.propTypes = {
  // digits: PropTypes.number,
  // digitsInCard: PropTypes.number,
  seconds: PropTypes.number,
}; FlipCardDisplay.defaultProps = {
  // digits: 4,
  // digitsInCard: 1,
  seconds: 0,
};

export default FlipCardDisplay;
