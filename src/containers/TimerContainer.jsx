import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Todo, this should also be able contained inside a TimerListContainer to store ea. timer info...
// time being counted shouldn't be stored in the list as some timers aren't being updated when stop

const mapStateToProps = state => ({ secondsRemaining: state.secondsRemaining });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) });

@connect(store => ({
  secondsRemaining: store,
}))
class TimerContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     secondsRemaining: 100,
  //   };
  // }

  tick = () => {
    this.setState(prevState => ({ secondsRemaining: prevState.secondsRemaining - 1 }));
    // console.log('clicked');
  }

  render() {
    const { text, secondsRemaining } = this.props;
    return (
      <div className="timer__container">
        <h2>{text}</h2>
        <h1>{this.state.secondsRemaining}</h1>
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
