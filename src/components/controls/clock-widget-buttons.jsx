import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faArrowCircleLeft, faCog } from '@fortawesome/free-solid-svg-icons';

// FA Icon definitions
const faStart = 'play';
const faPause = 'pause';
const faStop = 'stop';
const faReset = faRedo;
const faSettings = faCog;
const faBack = faArrowCircleLeft;

// FA 'iconType' PropType definition
const propTypeFAIcon = PropTypes.oneOf([faStart, faPause, faStop, faReset, faSettings, faBack]);

// Class Definitions
const classBtn = 'clk-wdgt__btn';
// const classBtnPressed = 'clk-wdgt__btn--pressed';
const classPlay = `${classBtn} btn-play`;
const classPause = `${classBtn} btn-pause`;
const classStop = `${classBtn} btn-stop`;
const classReset = `${classBtn} btn-reset`;
const classSettings = `${classBtn} btn-settings`;
const classBack = `${classBtn} btn-back`;
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
  onStartClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonStart.defaultProps = {
  enabled: false,
  onStartClick: undefined,
};

export const PushButtonPause = ({ onPauseClick, enabled }) => (
  <FAButton
    iconType={faPause}
    className={classPause}
    onClick={onPauseClick}
    enabled={enabled}
  />);
PushButtonPause.propTypes = {
  onPauseClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonPause.defaultProps = {
  enabled: false,
  onPauseClick: undefined,
};

export const PushButtonStop = ({ onStopClick, enabled }) => (
  <FAButton
    iconType={faStop}
    className={classStop}
    onClick={onStopClick}
    enabled={enabled}
  />);
PushButtonStop.propTypes = {
  onStopClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonStop.defaultProps = {
  enabled: false,
  onStopClick: undefined,
};

// TODO: Make this capable of ripple animations and wrap as HOC
export const PushButtonReset = ({ onResetClick, enabled }) => (
  <FAButton
    iconType={faReset}
    className={classReset}
    onClick={onResetClick}
    enabled={enabled}
  />);
PushButtonReset.propTypes = {
  onResetClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonReset.defaultProps = {
  enabled: false,
  onResetClick: undefined,
};

export const PushButtonSettings = ({ onSettingsClick, enabled }) => (
  <FAButton
    iconType={faSettings}
    className={classSettings}
    onClick={onSettingsClick}
    enabled={enabled}
  />);
PushButtonSettings.propTypes = {
  onSettingsClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonSettings.defaultProps = {
  enabled: false,
  onSettingsClick: undefined,
};

export const PushButtonBack = ({ onBackClick, enabled }) => (
  <FAButton
    iconType={faBack}
    className={classBack}
    onClick={onBackClick}
    enabled={enabled}
  />);
PushButtonBack.propTypes = {
  onBackClick: PropTypes.func,
  enabled: PropTypes.bool,
}; PushButtonBack.defaultProps = {
  enabled: false,
  onBackClick: undefined,
};

export const ToggleButtonStopReset = ({
  enabled,
  isActive,
  onStopClick,
  onResetClick,
}) => (isActive
  ? <PushButtonStop onStopClick={enabled ? onStopClick : undefined} />
  : <PushButtonReset onResetClick={enabled ? onResetClick : undefined} />
);
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
  ? <PushButtonPause onPauseClick={enabled ? onPauseClick : undefined} />
  : <PushButtonStart onStartClick={enabled ? onStartClick : undefined} />
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
  ? <PushButtonBack onBackClick={enabled ? onBackClick : undefined} />
  : <PushButtonSettings onSettingsClick={enabled ? onSettingsClick : undefined} />
);

ToggleButtonSettingsBack.propTypes = {
  enabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
}; ToggleButtonSettingsBack.defaultProps = { enabled: true };
