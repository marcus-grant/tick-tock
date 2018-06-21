import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// Todo, this should also be able contained inside a TimerListContainer to store ea. timer info...
// time being counted shouldn't be stored in the list as some timers aren't being updated when stop

// @connect(store => ({
//   timeLeft: store,
// }))

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: 100,
    };
  }
  // tick = () => {
  //   this.props.decrementTimerAction();
  //   // this.props.incrementTimerAction();
  // }
  tick = () => {
    this.setState(prevState => ({ secondsLeft: prevState.secondsLeft - 1 }));
    // console.log('clicked');
  }

  render() {
    const { text } = this.props;
    return (
      <div className="timer__container">
        <h2>{text}</h2>
        <h1>{this.state.secondsLeft}</h1>
        <h4>Placeholder for TimerControls</h4>
        <button onClick={this.tick}>tick</button>
      </div>
    );
  }
}

TimerContainer.propTypes = {
  // timeLeft: PropTypes.number.isRequired, shouldn't this state reside here or be subbed here?
  // incrementTimerAction: PropTypes.func.isRequired,
  // decrementTimerAction: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TimerContainer.defaultProps = {
  text: '',
};

export default TimerContainer;
