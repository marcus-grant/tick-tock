import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Controls from './Controls';


@connect(store => ({
  count: store,
}))

class Counter extends Component {
  render() {
    const { count } = this.props.count;

    return (
      <div className="counter">
        <div>{count}</div>
        <Controls />
        <hr />
        <span>
          <a href="https://github.com/Gigacore/React-Redux-Starter">Fork it on Github</a>
        </span>
      </div>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number,
};

Counter.defaultProps = {
  count: 0,
};

export default Counter;
