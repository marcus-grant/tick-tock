import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// FA Icon definitions
const faStart = 'play';
const faPause = 'pause';
const faStop = 'stop';

// FA 'iconType' PropType definition
const propTypeFAIcon = PropTypes.oneOf([faStart, faPause, faStop]);

// Class Definitions
const classBtn = 'clk-wdgt__btn';
// const classBtnPressed = 'clk-wdgt__btn--pressed';
const classPlay = `${classBtn} btn-play`;
const classPause = `${classBtn} btn-pause`;
const classStop = `${classBtn} btn-stop`;
const classDisabled = 'clk-wdgt__btn--disabled';
// const classSkip = `${classBtn} btn-skip`;

// const composeBEM = (b, e, m) => {
//   const mod = m === undefined ? '' : m;
//   const blk = b === undefined ? '' : b;
//   return `${blk}${e}${mod}`;
// };

export const FAButton = ({
  iconType,
  className,
  onClick,
  enabled,
}) => (
  <button
    className={`${className}${enabled ? '' : classDisabled}`}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={iconType} />
  </button>
);

// FAButton PropTypes definition that gets reused in components that use it.
const propTypeFAButton = {
  iconType: propTypeFAIcon.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  enabled: PropTypes.bool,
}; FAButton.propTypes = propTypeFAButton;
const defaultPropsFAButton = {
  onClick: undefined,
  enabled: false,
}; FAButton.defaultProps = defaultPropsFAButton;

export const PushButtonStart = ({ onStartClick, enabled }) => (
  <FAButton
    iconType={faStart}
    className={classPlay}
    onClick={onStartClick}
    enabled={enabled}
  />);
PushButtonStart.propTypes = {
  onStartClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonStart.defaultProps = {
  enabled: false,
};

export const PushButtonPause = ({ onPauseClick, enabled }) => (
  <FAButton
    iconType={faPause}
    className={classPause}
    onClick={onPauseClick}
    enabled={enabled}
  />);
PushButtonPause.propTypes = {
  onPauseClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonPause.defaultProps = {
  enabled: false,
};

export const PushButtonStop = ({ onStopClick, enabled }) => (
  <FAButton
    iconType={faStop}
    className={classStop}
    onClick={onStopClick}
    enabled={enabled}
  />);
PushButtonStop.propTypes = {
  onStopClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonStop.defaultProps = {
  enabled: false,
};

// TODO: Make this capable of ripple animations and wrap as HOC
// /** This button type only has a single  */
// const WidgetControlPushButton = ({
//   children
//   buttonFunc,
//   buttonClass,
//   iconType,
// }) => composeFAButton(buttonFunc, buttonClass, iconType);

// WidgetControlPushButton.propTypes = {
// };

// const combineTwoButtonsIntoToggle = (isActive, ActiveBtn, InactiveBtn) => props =>
//   (isActive ? <ActiveBtn {...props} /> : <InactiveBtn {...props} />);

export const ToggleButtonStartPause = (props) => {
  const {
    enabled,
    isActive,
    onStartClick,
    onPauseClick,
  } = props;
  return (isActive
    ? <PushButtonPause onPauseClick={enabled ? onPauseClick : null} />
    : <PushButtonStart onStartClick={enabled ? onStartClick : null} />);
};

ToggleButtonStartPause.propTypes = {
  enabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
}; ToggleButtonStartPause.defaultProps = { enabled: true };
