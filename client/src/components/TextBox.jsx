import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class TextBox extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleRefChanged = this.handleRefChanged.bind(this);
  }

  componentDidMount () {
    if (!this.props.autofocus) {
      return;
    }

    if (this.element) {
      // Wait until fade in transition has finished.
      // Otherwise the focus will screw that transition.
      this.focusTimeout = setTimeout(() => {
        this.element.focus();
      }, this.props.focusDelay);
    } else {
      clearTimeout(this.focusTimeout);
    }
  }

  handleRefChanged (ref) {
    this.element = ref;
  }

  blur () {
    if (this.element) {
      this.element.blur();
    }
  }

  render () {
    const { className, placeholder, type, value, onChange, onBlur } = this.props;

    return (
      <input
        className={ `ui-text-box ${className} ui-text-box--${type}` }
        ref={ this.handleRefChanged }
        onChange={ onChange }
        onBlur={ onBlur }
        value={ value }
        type='text'
        placeholder={ placeholder }
      />
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

TextBox.defaultProps = {
  autofocus: true,
  focusDelay: 300,
  type: 'default'
};

TextBox.propTypes = {
  autofocus: PropTypes.bool,
  className: PropTypes.string,
  focusDelay: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default TextBox;
