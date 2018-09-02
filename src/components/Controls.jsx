// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { incrementNum, decrementNum, resetCounter } from '../actions/counter-actions';

// @connect(() => {})

// class Controls extends Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     resetLabel: PropTypes.string,
//     incrementLabel: PropTypes.string,
//     decrementLabel: PropTypes.string,
//   };

//   static defaultProps = {
//     resetLabel: 'RESET',
//     incrementLabel: '+',
//     decrementLabel: '-',
//   };

//   increment = () => { this.props.dispatch(incrementNum()); }
//   decrement = () => { this.props.dispatch(decrementNum()); }
//   resetCount = () => { this.props.dispatch(resetCounter(0)); }

//   render() {
//     const { resetLabel, incrementLabel, decrementLabel } = this.props;

//     return (
//       <div className="controls">
//         <button onClick={() => { this.increment(); }}>
//           <span>{incrementLabel}</span>
//         </button>
//         <button onClick={() => { this.resetCount(); }}>
//           <span>{resetLabel}</span>
//         </button>
//         <button onClick={() => { this.decrement(); }}>
//           <span>{decrementLabel}</span>
//         </button>
//       </div>
//     );
//   }
// }

// export default Controls;
