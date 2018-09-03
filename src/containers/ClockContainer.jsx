import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CLK_TYPE from '../constants/clock-types';

import PommodoroWidget from '../components/PommodoroWidget';
import { stopClock } from '../actions/clocks-actions';

/** The main HOC (Higher Order Component) that each clock widget uses to display
 * current clock data, and map dispatched actions for each clock.
 */
class ClockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.timeMarkReached = this.timeMarkReached.bind(this);
  }

  timeMarkReached() {
    if (this.props.seconds >= this.props.timeMark) {
      this.props.stopClock(this.props.id);
    }
  }

  render() {
    console.log('ClockContainer of id = ', this.props.id, ' rendered!');
    return <PommodoroWidget {...this.props} />;
  }
}

ClockContainer.propTypes = {
  id: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  timeMark: PropTypes.number.isRequired,
  markReached: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([CLK_TYPE.POMMODORO]).isRequired,
  stopClock: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  stopClock,
}, dispatch);

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ tick: clockTick }, dispatch);

export default connect(null, mapDispatchToProps)(ClockContainer);
// export default connect(mapStateToProps)(ClockContainer);
// export default ClockContainer;
