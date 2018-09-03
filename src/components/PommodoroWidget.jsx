import React from 'react';
import PropTypes from 'prop-types';

import { decimalDigitsFromSeconds } from '../util/second-conversion';

// TODO: This should be a HOC for a common ClockWidget Component
class PommodoroWidget extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSettingsComponent = this.toggleSettingsComponent.bind(this);
    this.state = {
      // showSettings: false,
    };
  }

  toggleSettingsComponent() {
    this.setState(prev => ({ showSettings: !prev.showSettings }));
  }

  render() {
    const remaining = this.props.timeMark - this.props.seconds;
    const {
      tenMinutes,
      minutes,
      tenSeconds,
      seconds,
    } = decimalDigitsFromSeconds(remaining);
    return (
      <div className="clk-wdgt__wrpr pomm-widg__wrpr">
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
      </div>
    );
  }
}

PommodoroWidget.propTypes = {
  seconds: PropTypes.number.isRequired,
  timeMark: PropTypes.number.isRequired,
  // onClickStart: PropTypes.func.isRequired,
  // onClickStop: PropTypes.func.isRequired,
};

export default PommodoroWidget;
