import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clockTick } from '../actions/clocks-actions';

class GlobalTimer extends React.Component {
  constructor(props) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() { this.updateTimer(); }

  componentDidUpdate() { this.updateTimer(); }

  updateTimer() {
    if (this.props.isActive) {
      setInterval(this.props.clockTick, this.props.period * 1000);
    } else {
      clearInterval(this.props.clockTick);
    }
  }

  render() { return this.props.children; }
}

GlobalTimer.propTypes = {
  clockTick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  period: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = state => ({
  period: state.globalTimer.period,
  isActive: state.globalTimer.isActive,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clockTick }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTimer);
