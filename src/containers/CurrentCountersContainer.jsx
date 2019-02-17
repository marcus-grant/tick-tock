import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import ClockContainer from '../containers/CounterContainer';
import { startCountersTimer, stopCountersTimer } from '../actions/timer-actions';

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
    this.updateCountersTimer = this.updateCountersTimer.bind(this);
  }
  componentDidMount() { this.updateCountersTimer(); }

  componentDidUpdate() { this.updateCountersTimer(); }

  componentWillUnmount() { this.updateCountersTimer(); }

  updateCountersTimer() {
    if (this.props.activeIds.length > 0) {
      this.props.startCountersTimer(this.props.period * 1000);
    } else this.props.stopCountersTimer();
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
  activeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  period: PropTypes.number.isRequired,
  startCountersTimer: PropTypes.func.isRequired,
  stopCountersTimer: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  allIds: state.counters.allIds,
  activeIds: state.counters.activeIds,
  period: state.counters.countersPeriod,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ startGlobalTimer, stopGlobalTimer }, dispatch);
const mapDispatchToProps = dispatch => ({
  startCountersTimer: interval => dispatch(startCountersTimer(interval)),
  stopCountersTimer: () => dispatch(stopCountersTimer),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCountersContainer);
