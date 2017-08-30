import PropTypes from 'prop-types';
import React from 'react';

class MenuItem extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.onClick(this.props.id, this.props.data);
  }

  render () {
    return (
      <div className='ui-menu-item' onClick={ this.handleClick }>
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

export default MenuItem;
