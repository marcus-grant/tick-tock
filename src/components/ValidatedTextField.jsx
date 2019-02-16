import React from 'react';
import PropTypes from 'prop-types';

const isValidInteger = (text) => {
  const parsedNum = Number.parseInt(text, 10);
  if (Number.isNaN(parsedNum)) return false;
  return Number.isInteger(parsedNum);
};

const isGreaterThanZero = (text) => {
  const parsedNum = Number.parseFloat(text);
  if (Number.isNaN(parsedNum)) return false;
  return parsedNum > 0;
};

const isNumber = text => !Number.isNaN(text);

export const VALIDATION_RULES = {
  IS_NUM: isNumber,
  IS_INT: isValidInteger,
  IS_GT_ZERO: isGreaterThanZero,
};

class ValidatedTextField extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isValid: true,
      isTouched: false,
    };
    this.validateText = this.validateText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidLoad() {
    this.setState({
      text: this.props.placeholder,
      isValid: true,
    });
  }
  // TODO: Debounce input
  validateText(text) {
    let failedCount = 0;
    this.props.validationFuncs.forEach((f) => {
      if (!f(text)) failedCount += 1;
    });
    return failedCount === 0;
  }

  handleChange(evt) {
    const text = evt.target.value;
    const isValid = this.validateText(text);
    this.setState({ text, isValid, isTouched: true });
    if (isValid) {
      this.props.onValidatedTextChange({
        key: this.props.fieldKey,
        value: text,
      });
    }
  }

  render() {
    const { text, isValid } = this.state;
    const computedClass =
      `clk-wdgt-sets textfield${isValid ? '' : '--invalid'}`;
    return (
      <input
        className={computedClass}
        type="text"
        value={this.state.isTouched ? text : this.props.placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

ValidatedTextField.propTypes = {
  placeholder: PropTypes.string,
  fieldKey: PropTypes.string.isRequired,
  onValidatedTextChange: PropTypes.func.isRequired,
  validationFuncs: PropTypes.arrayOf(PropTypes.func).isRequired,
}; ValidatedTextField.defaultProps = {
  placeholder: '',
};


export default ValidatedTextField;
