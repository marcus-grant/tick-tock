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
  enabled,
}) => (
  <button
    className={`${className} ${enabled ? '' : classDisabled}`}
    onClick={enabled ? onClick : undefined}
  >
    <FontAwesomeIcon icon={iconType} />
  </button>
);
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

export const PushButtonStart = ({ onClick, enabled }) => (
  <FAButton
    iconType={faStart}
    className={classPlay}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonStart.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonStart.defaultProps = { enabled: false };

export const PushButtonPause = ({ onClick, enabled }) => (
  <FAButton
    iconType={faPause}
    className={classPause}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonPause.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonPause.defaultProps = { enabled: false };

export const PushButtonStop = ({ onClick, enabled }) => (
  <FAButton
    iconType={faStop}
    className={classStop}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonStop.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonStop.defaultProps = { enabled: false };

// TODO: Make this capable of ripple animations and wrap as HOC
// TODO: make enabled props semantically and logically 'disabled'
// -- this way the default is enabled and a 'disabled' negates
export const PushButtonReset = ({ onClick, enabled }) => (
  <FAButton
    iconType={faReset}
    className={classReset}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonReset.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonReset.defaultProps = { enabled: false };

export const PushButtonSettings = ({ onClick, enabled }) => (
  <FAButton
    iconType={faSettings}
    className={classSettings}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonSettings.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonSettings.defaultProps = { enabled: false };

export const PushButtonBack = ({ onClick, enabled }) => (
  <FAButton
    iconType={faBack}
    className={classBack}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonBack.defaultProps = {
  enabled: false,
};

export const PushButtonPlus = ({ onClick, enabled }) => (
  <FAButton
    iconType={faPlus}
    className={classPlus}
    onClick={onClick}
    enabled={enabled}
  />
);
PushButtonPlus.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonPlus.defaultProps = {
  enabled: false,
};

export const PushButtonMinus = ({ onClick, enabled }) => (
  <FAButton
    iconType={faMinus}
    className={classMinus}
    onClick={onClick}
    enabled={enabled}
  />);
PushButtonMinus.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
}; PushButtonMinus.defaultProps = { enabled: false };

// TODO: Give toggles more generic names and make HOC
export const ToggleButtonStopReset = ({
  enabled,
  isActive,
  onStopClick,
  onResetClick,
}) => (isActive
  ? <PushButtonStop onClick={onStopClick} enabled={enabled} />
  : <PushButtonReset onClick={onResetClick} enabled={enabled} />);
ToggleButtonStopReset.propTypes = {
  enabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
}; ToggleButtonStopReset.defaultProps = { enabled: true };

export const ToggleButtonStartPause = ({
  enabled,
  isActive,
  onStartClick,
  onPauseClick,
}) => (isActive
  ? <PushButtonPause onClick={onPauseClick} enabled={enabled} />
  : <PushButtonStart onClick={onStartClick} enabled={enabled} />
);

ToggleButtonStartPause.propTypes = {
  enabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
}; ToggleButtonStartPause.defaultProps = { enabled: true };

export const ToggleButtonSettingsBack = ({
  enabled,
  isActive,
  onSettingsClick,
  onBackClick,
}) => (isActive
  ? <PushButtonBack onClick={onBackClick} enabled={enabled} />
  : <PushButtonSettings onClick={onSettingsClick} enabled={enabled} />
);

ToggleButtonSettingsBack.propTypes = {
  enabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
}; ToggleButtonSettingsBack.defaultProps = { enabled: true };
