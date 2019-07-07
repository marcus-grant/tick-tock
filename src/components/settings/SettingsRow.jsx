import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField from '../ValidatedTextField';
import {
  PushButtonMinus,
  PushButtonPlus,
} from '../controls/clock-widget-buttons';

/**
 *
 * @param {string} label displayed label for setting
 * @param {string} inputKey key associated with data from setting input component
 * @param {string} placeholder placeholder text on empty input if it has one
 * @param {[func]} validationFuncs array of functs that must return true, given input call onChange
 * @param {func} onChange callback for input changed MUST pass validationFuncs as true to call back
 * @param {func} onChange child components to wrap plus/minus buttons in
 * @param {func} onIncrement callback to handle clicking on increment
 * @param {func} onDecrement callback to handle clicking on decrement
 */
const plusMinus = InputComponent => ({ children, ...props }) => (
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
 * @param {func} onChange callback for input change and will validate if validationFuncs provided
 */
const SettingsRow = ({
  label,
  inputKey,
  placeholder,
  onChange,
  // onValidatedTextChange,
  validationFuncs,
  // plusMinus,
  // onPlusClick,
  // onMinusClick,
}) => (
  <div className="clk-wdgt-sets__row">
    <span>{label}</span>
    <div className="sets-row__input">
      {plusMinus && (<PushButtonMinus onClick={onMinusClick} />)}
      <ValidatedTextField
        fieldKey={inputKey}
        placeholder={`${placeholder}`}
        onValidatedTextChange={onValidatedTextChange}
        validationFuncs={validationFuncs}
      />
      {plusMinus && (<PushButtonPlus onClick={onPlusClick} />)}
    </div>
  </div>
); SettingsRow.propTypes = {
  label: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onValidatedTextChange: PropTypes.func.isRequired,
  validationFuncs: PropTypes.arrayOf(PropTypes.func),
  plusMinus: PropTypes.bool,
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
