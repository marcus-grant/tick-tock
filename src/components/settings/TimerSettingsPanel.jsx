import React from 'react';
import PropTypes from 'prop-types';

import ValidatedTextField, { VALIDATION_RULES } from '../ValidatedTextField';

class TimerSettingsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      stopHrs: 0,
      stopMins: 0,
      stopSecs: 0,
    };
    this.handleSettingsSave = this.handleSettingsSave.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  /**
   * Updates state based on any changes to any settings field.
   *
   * @param {object} changedField settings form item that changed
   */
  handleSettingsChange(changedField) {
    console.log('handleSettingsChange', changedField);
    const value = Number.parseInt(changedField.value, 10);
    const { key } = changedField;
    this.setState({ [key]: value }, () => console.log('TimeSettingsPanel.state: ', this.state.stopMins));
  }

  /**
   * Take the state properties involved in managing settings &
   * return them to parent through onSave as an object of settings.
   */
  handleSettingsSave() {
    this.props.onSave({
      stopCount: (this.state.stopSecs
        + (this.state.stopHrs * 3600)
        + (this.state.stopMins * 60)),
    });
  }

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
            fieldKey="stopMins"
            placeholder={`${Math.floor((this.props.stopCount) / 60)}`}
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
