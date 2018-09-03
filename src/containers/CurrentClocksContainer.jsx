import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ClockContainer from '../containers/ClockContainer';
import CLK_TYPE from '../constants/clock-types';


/** The container for the collection of clocks that are currently in use.
 * This includes clocks that are currently paused (ie inactive).
 * When a clock gets removed, then they leave this container.
 * The container to all visible clock widet components.
 * Handles mapping of state objects of active clocks and --
 * -- mapping them to props of all the currently active clocks.
 * Then it renders them all in order.
 * Doesn't handle dispatching actions, each individual clock does.
 */
const CurrentClocksContainer = props => (
  <div className="clks-wkspc__wrpr">
    {props.clocks.map(clk =>
      <ClockContainer {...clk} key={`clk_${clk.id}`} />)}
  </div>
);

CurrentClocksContainer.propTypes = {
  /** Array of mapped state objects for current clock widget data */
  clocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired,
    timeMark: PropTypes.number.isRequired,
    markReached: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([CLK_TYPE.POMMODORO]),
  })).isRequired,
};
const mapStateToProps = state => ({ clocks: state.clock.clocks });

export default connect(mapStateToProps)(CurrentClocksContainer);
