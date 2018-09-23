import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  clockTick,
  stopGlobalTimer,
  startGlobalTimer,
} from '../actions/clocks-actions';

class GlobalTimer extends React.Component {
  constructor(props) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() { this.updateTimer(); }

  componentDidUpdate() { this.updateTimer(); }

  componentWillUnmount() { clearInterval(this.tick); }

  updateTimer() {
    if (this.props.isTicking) {
      startGlobalTimer(this.tick, this.props.period * 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  tick() { this.props.clockTick(); }

  render() { return this.props.children; }
}

GlobalTimer.propTypes = {
  clockTick: PropTypes.func.isRequired,
  stopGlobalTimer: PropTypes.func.isRequired,
  startGlobalTimer: PropTypes.func.isRequired,
  isTicking: PropTypes.bool.isRequired,
  period: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = state => ({
  period: state.clock.globalTimer.period,
  isTicking: state.clock.globalTimer.isTicking,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clockTick, stopGlobalTimer, startGlobalTimer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTimer);
