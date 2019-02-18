import React from 'react';
import PropTypes from 'prop-types';

// import { BarSeparator } from './TimeSeparator';
import { decimalDigitsFromSeconds } from '../../util/second-conversion';

// TODO: Handle undefined case to chose the default time display
// TODO: Maybe give classnames from a "type prop"
// !!! Don't do the above, it should be the parent that does this
// TODO: Handle different time divisions and groupings of them for display
const BasicTimeDisplay = (props) => {
  const {
    tenMinutes,
    minutes,
    tenSeconds,
    seconds,
  } = decimalDigitsFromSeconds(props.seconds);

  return (
    <div className="time-disp__wrpr pomm-time-disp__wrpr">
      <div className="time-disp__basic-group">
        <span className="time-disp__time-digit">{tenMinutes}</span>
        <span className="time-disp__time-digit">{minutes}</span>
      </div>
      { props.separator
        ? props.separator
        : (
          <div className="time-disp__basic-group">
            <span className="time-disp__basic-separator">:</span>
          </div>
         )
      }
      <div className="time-disp__basic-group">
        <span className="time-disp__time-digit">{tenSeconds}</span>
        <span className="time-disp__time-digit">{seconds}</span>
      </div>
    </div>
  );
};

BasicTimeDisplay.propTypes = {
  seconds: PropTypes.number,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}; BasicTimeDisplay.defaultProps = {
  seconds: 0,
  separator: undefined,
};

export default BasicTimeDisplay;
