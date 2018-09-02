import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clockTick } from '../actions/clocks-actions';

// Todo, this should also be able contained inside a TimerListContainer to store ea. timer info...
// time being counted shouldn't be stored in the list as some timers aren't being updated when stop

/** The main HOC (Higher Order Component) that each clock widget uses to display
 * current clock data, and map dispatched actions for each clock.
 */
const ClockContainer = (props) => {
  const { seconds, tick } = props;

  return (
    <div>
      <h1>{seconds}</h1>
      <button onClick={tick}>tick</button>
    </div>
  );
};

ClockContainer.propTypes = {
  seconds: PropTypes.number.isRequired,
  tick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  seconds: state.clocks[0].seconds,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ tick: clockTick }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClockContainer);
