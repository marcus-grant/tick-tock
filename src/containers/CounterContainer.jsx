import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CLK_TYPE from '../constants/clock-types';

import CountDownTimerWidget from '../components/CountDownTimerWidget';
import { activateClock, deactivateClock, resetClock } from '../actions/counters-action-creators';

/** The main HOC (Higher Order Component) that each clock widget uses to display
 * current clock data, and map dispatched actions for each clock.
 */
class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSettingsPanel = this.toggleSettingsPanel.bind(this);
    this.state = {
      settingsVisible: false,
    };
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
    const nonFuncTimerProps = { count, stopCount, isActive };
    // TODO: Add conditional for handle clicks to checks props if dispatch needd
    const timerDispatches = {
      onPauseClick: this.props.handlePauseClick,
      onStartClick: this.props.handleStartClick,
      onStopClick: this.props.handleStopClick,
    };
    const SettingsPanel = (
      <div className="clk-wdgt-sets__wrpr">
        <h1>Placeholder</h1>
      </div>
    );
    const CDownWidget = <CountDownTimerWidget {...nonFuncTimerProps} {...timerDispatches} />;
    // console.log('CounterContainer of id = ', props.id, ' rendered!');
    return (
      <div className="clk-wdgt__wrpr">
        <button
          className="clk-wdgt__btn-sets"
          onClick={this.toggleSettingsPanel}
        >{'*'}
        </button>
        { settingsVisible ? SettingsPanel : CDownWidget }
      </div>
    );
  }
}
// class CounterContainer extends React.Component {

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
    dispatch(resetClock(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
