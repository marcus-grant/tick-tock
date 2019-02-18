import React from 'react';
import PropTypes from 'prop-types';

import { VALIDATION_RULES } from '../ValidatedTextField';
import SettingsRow from './SettingsRow';
import { decimalDigitsFromSeconds } from '../../util/second-conversion';

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
    const value = Number.parseInt(changedField.value, 10);
    const { key } = changedField;
    this.setState({ [key]: value });
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
    const timeValidationRules = [
      VALIDATION_RULES.IS_NUM,
      VALIDATION_RULES.IS_INT,
      VALIDATION_RULES.IS_GT_ZERO,
    ];
    const timeUnits = decimalDigitsFromSeconds(this.props.stopCount);
    const currentSecs = (timeUnits.tenSeconds * 10) + timeUnits.seconds;
    const currentMins = (timeUnits.tenMinutes * 10) + timeUnits.minutes;
    const buttonClass =
      `clk-wdgt-sets__save${isActive ? '' : '--disabled'}`;
    return (
      <div className="clk-wdgt-sets__panel">
        <div className="clk-wdgt-sets_wrpr">
          {/* <h1>Settings</h1> */}
          <SettingsRow
            settingName="Timer (minutes):"
            settingKey="stopMins"
            placeholder={`${currentMins}`}
            onValidatedTextChange={this.handleSettingsChange}
            validationFuncs={timeValidationRules}
            plusMinus
          />
          <SettingsRow
            settingName="Timer (seconds):"
            settingKey="stopSecs"
            placeholder={`${currentSecs}`}
            onValidatedTextChange={this.handleSettingsChange}
            validationFuncs={timeValidationRules}
            plusMinus
          />
        </div>
        <div className="clk-wdgt-sets__row--bottom">
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
