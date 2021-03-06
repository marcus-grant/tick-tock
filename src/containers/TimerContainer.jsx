import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { dispatch } from 'redux';
import { connect } from 'react-redux';
import { incrementTimer } from '../actions/timer-actions';
import { INCREMENT_TIMER } from '../constants/action-types';

// Todo, this should also be able contained inside a TimerListContainer to store ea. timer info...
// time being counted shouldn't be stored in the list as some timers aren't being updated when stop

// const mapStateToProps = state => ({ secondsRemaining: state.secondsRemaining });
class TimerContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     secondsRemaining: 100,
  //   };
  // }

  tick = () => {
    // this.setState(prevState => ({ secondsRemaining: prevState.secondsRemaining - 1 }));
    // console.log('clicked');
    this.props.incrementTimer();
  }

  render() {
    console.log('timer props: ', this.props);
    const { secondsRemaining } = this.props;
    return (
      <div>
        <h1>{secondsRemaining}</h1>
        <button onClick={this.tick}>tick</button>
      </div>
    );
  }
}

TimerContainer.propTypes = {
  // timeLeft: PropTypes.number.isRequired, shouldn't this state reside here or be subbed here?
  // incrementTimerAction: PropTypes.func.isRequired,
  // decrementTimerAction: PropTypes.func.isRequired,
  // text: PropTypes.string,
  // secondsRemaining: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  secondsRemaining: state.timer.secondsRemaining,
});

const mapDispatchToProps = dispatch => ({
  incrementTimer: () => dispatch({ type: INCREMENT_TIMER }),
});


// TimerContainer.defaultProps = {
//   text: '',
// };

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
