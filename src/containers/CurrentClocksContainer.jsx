import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ClockContainer from '../containers/CounterContainer';

/** The container for the collection of clocks that are currently in use.
 * This includes clocks that are currently paused (ie inactive).
 * When a clock gets removed, then they leave this container.
 * The container to all visible clock widet components.
 * Handles mapping of state objects of active clocks and --
 * -- mapping them to props of all the currently active clocks.
 * Then it renders them all in order.
 * Doesn't handle dispatching actions, each individual clock does.
 */
const CurrentCountersContainer = props => (
  <div className="clks-wkspc__wrpr">
    {props.allIds.map(id =>
      <ClockContainer id={id} key={`clk_${id}`} />)}
  </div>
);

CurrentCountersContainer.propTypes = {
  /** Array of mapped state objects for current clock widget data */
  allIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
const mapStateToProps = state => ({ allIds: state.clock.allIds });

export default connect(mapStateToProps)(CurrentCountersContainer);
