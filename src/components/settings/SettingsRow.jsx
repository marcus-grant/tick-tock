import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField from '../ValidatedTextField';
import {
  PushButtonMinus,
  PushButtonPlus,
} from '../controls/clock-widget-buttons';

/**
 *
 * @param {React.Component} InputComponent An input component that can be plussed/minused
 * @param {string} label displayed label for setting
 * @param {string} inputKey key associated with data from setting input component
 * @param {string} placeholder placeholder text on empty input if it has one
 * @param {[func]} validationFuncs array of functs that must return true, given input call onChange
 * @param {func} onChange callback for input changed MUST pass validationFuncs as true to call back
 * @param {func} onChange child components to wrap plus/minus buttons in
 * @param {func} onIncrement callback to handle clicking on increment
 * @param {func} onDecrement callback to handle clicking on decrement
 */
// const plusMinus = InputComponent => ({ children, ...props }) => (
// TODO NOTE handling of props needs to be figured out so props go to both
const plusMinus = InputComponent => (
  <div className="sets-row__input">
    <PushButtonMinus onClick={props.onDecrement} />
    <InputComponent {...props} />
    <PushButtonPlus onClick={props.onIncrement} />
  </div>
);


// TODO: Rename and general refactor
/**
 *
 * @param {string} label displayed label for setting
 * @param {string} inputKey key associated with data from setting input component
 * @param {string} placeholder placeholder text on empty input if it has one
 * @param {[func]} validationFuncs array of functions that must return true for onchange to call
 * @param {func} onChange callback when input changes won't if validationFuncs included & fail
 * @param {func} onMinusClick callback for a decrementer button on this field
 * @param {func} onPlusClick callback for a incrementer button on this field
 */
const SettingsRow = ({
  label,
  inputKey,
  placeholder,
  onChange,
  validationFuncs,
  onPlusClick, // TODO consider wrapping these into onChange instead?
  onMinusClick,
  // onValidatedTextChange,
}) => (
  <div className="clk-wdgt-sets__row">
    <span>{label}</span>
    <div className="sets-row__input">
      {/* {onMinusClick && (<PushButtonMinus onClick={onMinusClick} />)} */}
      {plusMinus(<ValidatedTextField
        fieldKey={inputKey}
        placeholder={`${placeholder}`}
        onChange={onChange}
        validationFuncs={validationFuncs}
      />)}
      {onPlusClick && (<PushButtonPlus onClick={onPlusClick} />)}
    </div>
  </div>
); SettingsRow.propTypes = {
  label: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // onValidatedTextChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  validationFuncs: PropTypes.arrayOf(PropTypes.func),
  // plusMinus: PropTypes.bool,
  onPlusClick: PropTypes.func,
  onMinusClick: PropTypes.func,
}; SettingsRow.defaultProps = {
  placeholder: '',
  validationFuncs: null,
  plusMinus: false,
  onPlusClick: undefined,
  onMinusClick: undefined,
};

export default SettingsRow;
