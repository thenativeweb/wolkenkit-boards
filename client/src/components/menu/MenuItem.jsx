import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './MenuItem.css';

class MenuItem extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.onClick(this.props.id, this.props.data);
  }

  render () {
    const itemClassNames = classNames(styles.MenuItem, {
      [styles.SizeS]: this.props.size === 's',
      [styles.SizeM]: this.props.size === 'm'
    });

    return (
      <div
        className={ itemClassNames }
        onClick={ this.handleClick }
      >
        {this.props.children}
      </div>
    );
  }
}

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.string
};

MenuItem.defaultProps = {
  size: 's'
};

export default MenuItem;
