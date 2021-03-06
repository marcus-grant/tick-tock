import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ToggleButtonSettingsBack } from '../components/controls/clock-widget-buttons';
import CLK_TYPE from '../constants/clock-types';
import CountDownTimerWidget from '../components/CountDownTimerWidget';
import TimerSettingsPanel from '../components/settings/TimerSettingsPanel';
import {
  activateClock,
  deactivateClock,
  resetClock,
  setStopCount,
} from '../actions/counters-action-creators';

/** The main HOC (Higher Order Component) that each clock widget uses to display
 * current clock data, and map dispatched actions for each clock.
 */
class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsVisible: false,
    };
    this.toggleSettingsPanel = this.toggleSettingsPanel.bind(this);
    this.onSettingsSave = this.onSettingsSave.bind(this);
    this.onSettingsCancel = this.onSettingsCancel.bind(this);
  }

  onSettingsSave(settings) {
    this.setState(s => ({ ...s, settingsVisible: false }));
    this.props.handleSettingsSave(settings);
  }

  onSettingsCancel() {
    this.setState(s => ({ ...s, settingsVisible: false }));
  }

  toggleSettingsPanel() {
    this.setState(p => ({ settingsVisible: !p.settingsVisible }));
  }

  render() {
    const { settingsVisible } = this.state;
    const {
      count,
      stopCount,
      isActive,
    } = this.props;
    const nonFuncTimerProps = {
      count,
      stopCount,
      finished: count >= stopCount,
      isActive,
    };
    // TODO: Add conditional for handle clicks to checks props if dispatch needd
    const timerDispatches = {
      onPauseClick: this.props.handlePauseClick,
      onStartClick: this.props.handleStartClick,
      onStopClick: this.props.handleStopClick,
      onResetClick: this.props.handleStopClick,
    };
    const SettingsPanel = (
      <TimerSettingsPanel
        stopCount={stopCount}
        isActive={isActive}
        onSave={this.onSettingsSave}
        onCancel={this.onSettingsCancel}
      />
    );
    const CDownWidget = <CountDownTimerWidget {...nonFuncTimerProps} {...timerDispatches} />;
    return (
      <div className="clk-wdgt__wrpr">
        <ToggleButtonSettingsBack
          enabled
          isActive={this.state.settingsVisible}
          onSettingsClick={this.toggleSettingsPanel}
          onBackClick={this.toggleSettingsPanel}
        />
        { settingsVisible ? SettingsPanel : CDownWidget }
      </div>
    );
  }
}

CounterContainer.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  stopCount: PropTypes.number.isRequired,
  // finished: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([CLK_TYPE.POMMODORO, CLK_TYPE.COUNT_DOWN]).isRequired,
  handleStartClick: PropTypes.func.isRequired,
  handlePauseClick: PropTypes.func.isRequired,
  handleStopClick: PropTypes.func.isRequired,
  handleResetClick: PropTypes.func.isRequired,
  handleSettingsSave: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  ({ ...state.counters.byId[ownProps.id] });

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlePauseClick: () => {
    const { id } = ownProps;
    dispatch(deactivateClock(id));
  },
  handleStartClick: () => {
    const { id } = ownProps;
    dispatch(activateClock(id));
  },
  handleStopClick: () => {
    const { id } = ownProps;
    dispatch(deactivateClock(id));
    dispatch(resetClock(id));
  },
  handleResetClick: () => {
    const { id } = ownProps;
    dispatch(deactivateClock(id));
    dispatch(resetClock(id));
  },

  handleSettingsSave: (settings) => {
    const { id } = ownProps;
    const { stopCount } = settings;
    dispatch(setStopCount(id, stopCount));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
