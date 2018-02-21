import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

class TextBox extends React.Component {
  constructor (props) {
    super(props);

    this.handleFocusTimeout = this.handleFocusTimeout.bind(this);
    this.handleRefChanged = this.handleRefChanged.bind(this);
  }

  componentDidMount () {
    const { autoFocus, focusDelay } = this.props;

    if (!autoFocus) {
      return;
    }

    if (this.element) {
      this.focusTimeout = setTimeout(this.handleFocusTimeout, focusDelay);
    } else {
      clearTimeout(this.focusTimeout);
    }
  }

  componentWillUnmount () {
    clearTimeout(this.focusTimeout);
  }

  handleFocusTimeout () {
    if (this.element) {
      this.element.focus();
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
    const { className, disabled, id, name, value, onChange, onBlur, placeholder, required, type } = this.props;

    const componentClasses = classNames(styles.TextBox, {
      [styles.TypePort]: type === 'port',
      [styles.IsDisabled]: disabled === true,
      [styles.IsRequired]: required === true
    }, className);

    return (
      <input
        id={ id }
        ref={ this.handleRefChanged }
        className={ componentClasses }
        name={ name }
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
        required={ required }
        disable={ disabled ? 'disabled' : null }
        onBlur={ onBlur }
      />
    );
  }
}

TextBox.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf([ 'default', 'port' ]),
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

TextBox.defaultProps = {
  autoFocus: false,
  disabled: false,
  required: false,
  focusDelay: 0,
  type: 'default',
  onBlur () {},
  onChange () {}
};

export default TextBox;
