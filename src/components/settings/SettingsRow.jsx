import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField from '../ValidatedTextField';

const SettingsRow = ({
  settingName,
  settingKey,
  placeholder,
  onChange,
  validationFuncs,
  plusMinus,
}) => {
  return (
    <div className="clk-wdgt-sets__row">
      <span>{settingName}</span>
      <ValidatedTextField
        fieldKey={settingKey}
        placeholder={`${placeholder}`}
        onValidatedTextChange={onChange}
        validationFuncs={validationFuncs}
      />
    </div>
  );
}; SettingsRow.propTypes = {
  settingName: PropTypes.string,
  settingKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validationFuncs: PropTypes.func,
}; SettingsRow.defaultProps = {
  settingName: '',
  placeholder: '',
  validationFuncs: undefined,

};

export default SettingsRow;