import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField, { VALIDATION_RULES } from '../ValidatedTextField';

class TimerSettingsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      stopCount: 0,
    };
    this.handleSettingsSave = this.handleSettingsSave.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  handleSettingsChange(changedField) {
    const value = Number.parseInt(changedField.value, 10);
    const { key } = changedField;
    this.setState({ [key]: value });
  }

  handleSettingsSave() { this.props.onSave(this.state); }

  render() {
    const {
      isActive,
    } = this.props;
    const minutesValidationRules = [
      VALIDATION_RULES.IS_INT,
      VALIDATION_RULES.IS_GT_ZERO,
      VALIDATION_RULES.IS_ONLY_NUM,
    ];
    const buttonClass =
      `clk-wdgt-sets__save${isActive ? '' : '--disabled'}`;
    return (
      <div className="clk-wdgt-sets_wrpr">
        <h1>Settings</h1>
        <div className="clk-wdgt-sets__row">
          <span>Timer Minutes:</span>
          <ValidatedTextField
            fieldKey="stopCount"
            placeholder={`${this.props.stopCount}`}
            onValidatedTextChange={this.handleSettingsChange}
            validationFuncs={minutesValidationRules}
          />
        </div>
        <div className="clk-wdgt-sets__row">
          <button
            className={buttonClass}
            onClick={isActive ? () => {} : this.handleSettingsSave}
          >Save
          </button>
          <button
            className="clk-wdgt-sets__cancel"
            onClick={this.props.onCancel}
          >Cancel
          </button>
        </div>
      </div>
    );
  }
}

TimerSettingsPanel.propTypes = {
  stopCount: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  // onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}; TimerSettingsPanel.defaultProps = {
  isActive: false,
  // onChange: undefined,
  onSave: undefined,
  onCancel: undefined,
};


export default TimerSettingsPanel;
