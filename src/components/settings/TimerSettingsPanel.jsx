import React from 'react';
import PropTypes from 'prop-types';

import { VALIDATION_RULES } from '../ValidatedTextField';
import SettingsRow from './SettingsRow';
import {
  sendNotification,
  checkNotificationPermissionsAndRespond,
} from '../../util/notifications';
import { decimalDigitsFromSeconds } from '../../util/second-conversion';

class TimerSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    const digits = decimalDigitsFromSeconds(this.props.stopCount);
    this.state = {
      stopHrs: digits.hours,
      stopMins: (digits.tenMinutes * 10) + digits.minutes,
      stopSecs: (digits.tenSeconds * 10) + digits.seconds,
    };
    this.handleSettingsSave = this.handleSettingsSave.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleDecrementSetting = this.handleDecrementSetting.bind(this);
    this.handleIncrementSetting = this.handleIncrementSetting.bind(this);
  }

  /**
   * Subtract from one of the setting fields' state.
   *
   * @param {string} settingKey settings form item key that changed
   * @param {number} decrementAmount optional number of whole units to decrement
   */
  handleDecrementSetting(settingKey, decrementAmount) {
    const newValue = this.state[settingKey] - (decrementAmount === undefined ? 1 : decrementAmount);
    if (this.state[settingKey] !== 0) {
      this.setState({ ...this.state, [settingKey]: newValue });
    }
  }

  /**
   * Add to one of the setting fields' state.
   *
   * @param {string} settingKey settings form item key that changed
   * @param {number} incrementAmount optional number of whole units to increment
   */
  handleIncrementSetting(settingKey, incrementAmount) {
    const newValue = this.state[settingKey] + (incrementAmount === undefined ? 1 : incrementAmount);
    if (this.state[settingKey] !== 99) {
      this.setState({ ...this.state, [settingKey]: newValue });
    }
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
    const {
      // stopHrs,
      stopMins,
      stopSecs,
    } = this.state;
    const timeValidationRules = [
      VALIDATION_RULES.IS_NUM,
      VALIDATION_RULES.IS_INT,
      VALIDATION_RULES.IS_GT_ZERO,
    ];
    const notify = () => {
      checkNotificationPermissionsAndRespond()
    };
    const buttonClass =
      `clk-wdgt-sets__save${isActive ? '' : '--disabled'}`;
    return (
      <div className="clk-wdgt-sets__panel">
        <div className="clk-wdgt-sets_wrpr">
          {/* <h1>Settings</h1> */}
          <SettingsRow
            settingName="Timer (minutes):"
            settingKey="stopMins"
            placeholder={`${stopMins}`}
            onValidatedTextChange={this.handleSettingsChange}
            validationFuncs={timeValidationRules}
            plusMinus
            onMinusClick={() => this.handleDecrementSetting('stopMins')}
            onPlusClick={() => this.handleIncrementSetting('stopMins')}
          />
          <SettingsRow
            settingName="Timer (seconds):"
            settingKey="stopSecs"
            placeholder={`${stopSecs}`}
            onValidatedTextChange={this.handleSettingsChange}
            validationFuncs={timeValidationRules}
            plusMinus
            onMinusClick={() => this.handleDecrementSetting('stopSecs')}
            onPlusClick={() => this.handleIncrementSetting('stopSecs')}
          />
        </div>
        <div className="clk-wdgt-sets__row--bottom">
          <button
            className={buttonClass}
            onClick={isActive ? () => {} : this.handleSettingsSave}
          >Save
          </button>
          <button
            className={buttonClass}
            onClick={mainNotification}
          >Notify
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
