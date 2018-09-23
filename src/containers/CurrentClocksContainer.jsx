import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import ClockContainer from '../containers/CounterContainer';
import { startGlobalTimer, stopGlobalTimer } from '../actions/clocks-actions';

/** The container for the collection of clocks that are currently in use.
 * This includes clocks that are currently paused (ie inactive).
 * When a clock gets removed, then they leave this container.
 * The container to all visible clock widet components.
 * Handles mapping of state objects of active clocks and --
 * -- mapping them to props of all the currently active clocks.
 * Then it renders them all in order.
 * Doesn't handle dispatching actions, each individual clock does.
 */
class CurrentCountersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateGlobalTimer = this.updateGlobalTimer.bind(this);
  }
  componentDidMount() { this.updateGlobalTimer(); }

  componentDidUpdate() { this.updateGlobalTimer(); }

  componentWillUnmount() { this.updateGlobalTimer(); }

  updateGlobalTimer() {
    if (this.props.isTicking) {
      this.props.startGlobalTimer(this.props.period * 1000);
    } else this.props.stopGlobalTimer();
  }
  render() {
    const { allIds } = this.props;
    const basicWidgetsWorkspace = (
      <div className="clks-wkspc__wrpr">
        {allIds.map(id =>
          <ClockContainer id={id} key={`clk_${id}`} />)}
      </div>
    );
    return basicWidgetsWorkspace;
  }
}

CurrentCountersContainer.propTypes = {
  /** Array of mapped state objects for current clock widget data */
  allIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isTicking: PropTypes.bool.isRequired,
  period: PropTypes.number.isRequired,
  startGlobalTimer: PropTypes.func.isRequired,
  stopGlobalTimer: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  allIds: state.clock.allIds,
  isTicking: state.clock.globalTimer.isTicking,
  period: state.clock.globalTimer.period,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ startGlobalTimer, stopGlobalTimer }, dispatch);
const mapDispatchToProps = dispatch => ({
  startGlobalTimer: interval => dispatch(startGlobalTimer(interval)),
  stopGlobalTimer: () => dispatch(stopGlobalTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCountersContainer);
