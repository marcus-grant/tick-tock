import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CLK_TYPE from '../constants/clock-types';

import PommodoroWidget from '../components/PommodoroWidget';
import { activateClock, deactivateClock, resetClock } from '../actions/clocks-actions';

/** The main HOC (Higher Order Component) that each clock widget uses to display
 * current clock data, and map dispatched actions for each clock.
 */
const ClockContainer = (props) => {
  const {
    seconds,
    timeMark,
    isActive,
  } = props;
  const nonFuncTimerProps = { seconds, timeMark, isActive };
  // TODO: Add conditional for handle clicks to checks props if dispatch needd
  const timerDispatches = {
    onPauseClick: props.handlePauseClick,
    onStartClick: props.handleStartClick,
    onStopClick: props.handleStopClick,
  };
  // console.log('ClockContainer of id = ', props.id, ' rendered!');
  return <PommodoroWidget {...nonFuncTimerProps} {...timerDispatches} />;
};
// class ClockContainer extends React.Component {

ClockContainer.propTypes = {
  id: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  timeMark: PropTypes.number.isRequired,
  markReached: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([CLK_TYPE.POMMODORO]).isRequired,
  handleStartClick: PropTypes.func.isRequired,
  handlePauseClick: PropTypes.func.isRequired,
  handleStopClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  ({ ...state.clock.byId[ownProps.id] });

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

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ tick: clockTick }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClockContainer);
// export default connect(mapStateToProps)(ClockContainer);
// export default ClockContainer;
