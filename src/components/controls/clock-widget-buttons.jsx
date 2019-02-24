import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRedo,
  faArrowCircleLeft,
  faCog,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

// FA Icon definitions
const faStart = 'play';
const faPause = 'pause';
const faStop = 'stop';
const faReset = faRedo;
const faSettings = faCog;
const faBack = faArrowCircleLeft;

// FA 'iconType' PropType definition
const propTypeFAIcon = PropTypes.oneOf([
  faStart,
  faPause,
  faStop,
  faReset,
  faSettings,
  faBack,
  faPlus,
  faMinus,
]);

// Class Definitions
const classBtn = 'clk-wdgt__btn';
// const classBtnPressed = 'clk-wdgt__btn--pressed';
const classPlay = `${classBtn} btn-play`;
const classPause = `${classBtn} btn-pause`;
const classStop = `${classBtn} btn-stop`;
const classReset = `${classBtn} btn-reset`;
const classSettings = `${classBtn} btn-settings`;
const classBack = `${classBtn} btn-back`;
const classPlus = `${classBtn} btn-plus`;
const classMinus = `${classBtn} btn-minus`;
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
  disabled,
}) => (
  <button
    className={`${className} ${disabled ? classDisabled : ''}`}
    onClick={disabled ? undefined : onClick}
  >
    <FontAwesomeIcon icon={iconType} />
  </button>
);
const propTypeFAButton = {
  iconType: propTypeFAIcon.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}; FAButton.propTypes = propTypeFAButton;
const defaultPropsFAButton = {
  onClick: undefined,
  disabled: false,
}; FAButton.defaultProps = defaultPropsFAButton;

export const PushButtonStart = ({ onClick, disabled }) => (
  <FAButton
    iconType={faStart}
    className={classPlay}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonStart.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonStart.defaultProps = { disabled: false };

export const PushButtonPause = ({ onClick, disabled }) => (
  <FAButton
    iconType={faPause}
    className={classPause}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonPause.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonPause.defaultProps = { disabled: false };

export const PushButtonStop = ({ onClick, disabled }) => (
  <FAButton
    iconType={faStop}
    className={classStop}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonStop.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonStop.defaultProps = { disabled: false };

// TODO: Make this capable of ripple animations and wrap as HOC
// TODO: make enabled props semantically and logically 'disabled'
// -- this way the default is enabled and a 'disabled' negates
export const PushButtonReset = ({ onClick, disabled }) => (
  <FAButton
    iconType={faReset}
    className={classReset}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonReset.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonReset.defaultProps = { disabled: false };

export const PushButtonSettings = ({ onClick, disabled }) => (
  <FAButton
    iconType={faSettings}
    className={classSettings}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonSettings.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonSettings.defaultProps = { disabled: false };

export const PushButtonBack = ({ onClick, disabled }) => (
  <FAButton
    iconType={faBack}
    className={classBack}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonBack.defaultProps = {
  disabled: false,
};

export const PushButtonPlus = ({ onClick, disabled }) => (
  <FAButton
    iconType={faPlus}
    className={classPlus}
    onClick={onClick}
    disabled={disabled}
  />
);
PushButtonPlus.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonPlus.defaultProps = {
  disabled: false,
};

export const PushButtonMinus = ({ onClick, disabled }) => (
  <FAButton
    iconType={faMinus}
    className={classMinus}
    onClick={onClick}
    disabled={disabled}
  />);
PushButtonMinus.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}; PushButtonMinus.defaultProps = { disabled: false };

// TODO: Give toggles more generic names and make HOC
export const ToggleButtonStopReset = ({
  disabled,
  isActive,
  onStopClick,
  onResetClick,
}) => (isActive
  ? <PushButtonStop onClick={onStopClick} disabled={disabled} />
  : <PushButtonReset onClick={onResetClick} disabled={disabled} />);
ToggleButtonStopReset.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
}; ToggleButtonStopReset.defaultProps = { disabled: false };

export const ToggleButtonStartPause = ({
  disabled,
  isActive,
  onStartClick,
  onPauseClick,
}) => (isActive
  ? <PushButtonPause onClick={onPauseClick} disabled={disabled} />
  : <PushButtonStart onClick={onStartClick} disabled={disabled} />
);

ToggleButtonStartPause.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
}; ToggleButtonStartPause.defaultProps = { disabled: false };

export const ToggleButtonSettingsBack = ({
  disabled,
  isActive,
  onSettingsClick,
  onBackClick,
}) => (isActive
  ? <PushButtonBack onClick={onBackClick} disabled={disabled} />
  : <PushButtonSettings onClick={onSettingsClick} disabled={disabled} />
);

ToggleButtonSettingsBack.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
}; ToggleButtonSettingsBack.defaultProps = { disabled: false };
