import React from 'react';
import PropTypes from 'prop-types';

import FlipCardDisplay from './time-displays/flip-card-display';
import TimerControlBar from './controls/timer-controls';

// import shipBell from '../assets/sound/ship-bell.mp3';

// TODO: This should be a HOC for a common ClockWidget Component
class PommodoroWidget extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSettingsComponent = this.toggleSettingsComponent.bind(this);
    this.state = {
      showSettings: false,
    };
  }

  toggleSettingsComponent() {
    this.setState(prev => ({ showSettings: !prev.showSettings }));
  }

  render() {
    const { showSettings } = this.state;
    const remaining = this.props.timeMark - this.props.seconds;
    const {
      isActive,
      onStartClick,
      onPauseClick,
      onStopClick,
    } = this.props;
    const ctrlBarProps = {
      isActive,
      onStartClick,
      onPauseClick,
      onStopClick,
    };
    const SettingsPanel = (
      <div className="clk-wdgt-sets__wrpr">
        <h1>Placeholder</h1>
      </div>
    );
    return (
      <div className="clk-wdgt__wrpr pomm-widg__wrpr">
        <button
          className="clk-wdgt__btn-sets"
          onClick={this.toggleSettingsComponent}
        >{'*'}
        </button>
        { showSettings
          ? SettingsPanel
          : (<FlipCardDisplay seconds={remaining} />)}
        <TimerControlBar {...ctrlBarProps} />
      </div>
    );
  }
}

PommodoroWidget.propTypes = {
  seconds: PropTypes.number.isRequired,
  timeMark: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
};

export default PommodoroWidget;
