import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField from '../ValidatedTextField';
import {
  PushButtonMinus,
  PushButtonPlus,
} from '../controls/clock-widget-buttons';

// TODO: Rename and general refactor
const SettingsRow = ({
  settingName,
  settingKey,
  placeholder,
  onValidatedTextChange,
  validationFuncs,
  plusMinus,
  onPlusClick,
  onMinusClick,
}) => (
  <div className="clk-wdgt-sets__row">
    <span>{settingName}</span>
    <div className="sets-row__input">
      {plusMinus && (<PushButtonMinus onClick={onMinusClick} />)}
      <ValidatedTextField
        fieldKey={settingKey}
        placeholder={`${placeholder}`}
        onValidatedTextChange={onValidatedTextChange}
        validationFuncs={validationFuncs}
      />
      {plusMinus && (<PushButtonPlus onClick={onPlusClick} />)}
    </div>
  </div>
); SettingsRow.propTypes = {
  settingName: PropTypes.string,
  settingKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onValidatedTextChange: PropTypes.func.isRequired,
  validationFuncs: PropTypes.func,
  plusMinus: PropTypes.bool,
  onPlusClick: PropTypes.func,
  onMinusClick: PropTypes.func,
}; SettingsRow.defaultProps = {
  settingName: '',
  placeholder: '',
  validationFuncs: undefined,
  plusMinus: false,
  onPlusClick: undefined,
  onMinusClick: undefined,
};

export default SettingsRow;
