import classNames from 'classnames';
import { Icon } from '../index';
import Label from '../Label.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Hint = ({ children }) => (
  <span className={ styles.Hint }>
    { children }
  </span>
);

class Button extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);

    this.state = {
      isPressed: false
    };
  }

  handlePointerDown () {
    this.setState({
      isPressed: true
    });
  }

  handlePointerUp () {
    this.setState({
      isPressed: false
    });
  }

  render () {
    const { autoFocus, adjust, children, className, id, icon, iconSize, onClick, isPrimary, isSubtle, size, type } = this.props;
    const { isPressed } = this.state;

    const buttonClassNames = classNames(styles.Button, {
      [styles.AdjustFlex]: adjust === 'flex',
      [styles.AdjustAuto]: adjust === 'auto',
      [styles.SizeDefault]: size === 'default',
      [styles.SizeS]: size === 's',
      [styles.SizeM]: size === 'm',
      [styles.SizeL]: size === 'l',
      [styles.TypeLink]: type === 'link',
      [styles.TypePrimary]: isPrimary === true,
      [styles.TypeSubtle]: isSubtle === true,
      [styles.IsPressed]: isPressed === true,
      [styles.TypeIcon]: icon,
      [styles.TypeIconOnly]: icon && !children
    }, className);

    const buttonType = type || (isPrimary ? 'submit' : 'button');

    return (
      <button
        autoFocus={ autoFocus }
        id={ id }
        type={ buttonType }
        className={ buttonClassNames }
        onClick={ onClick }
        onMouseDown={ this.handlePointerDown }
        onMouseUp={ this.handlePointerUp }
      >
        { icon ? <Icon className={ styles.Icon } name={ icon } size={ iconSize } /> : null }
        { children ? <Label className={ styles.Label }>{ children }</Label> : null }
      </button>
    );
  }
}

Button.propTypes = {
  adjust: PropTypes.oneOf([ 'flex', 'auto' ]),
  autoFocus: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf([ 'default', 'xs', 's', 'm', 'l' ]),
  isPrimary: PropTypes.bool,
  size: PropTypes.oneOf([ 'default', 's', 'm', 'l' ]),
  type: PropTypes.oneOf([ 'link' ])
};

Button.defaultProps = {
  adjust: undefined,
  autoFocus: false,
  isPrimary: false,
  size: 'default',
  type: undefined
};

Button.Hint = Hint;

export default Button;
