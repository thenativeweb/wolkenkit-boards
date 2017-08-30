import Button from '../Button.jsx';
import classNames from 'classnames';
import React from 'react';

class SidebarMenu extends React.Component {
  constructor (props) {
    super(props);

    this.handleCollapseRessed = this.handleCollapseRessed.bind(this);
    this.handleExpandPressed = this.handleExpandPressed.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.isExpanded !== this.props.isExpanded || this.props.children !== nextProps.children;
  }

  handleCollapseRessed () {
    this.props.onCollapse();
  }

  handleExpandPressed () {
    this.props.onExpand();
  }

  render () {
    const menuClasses = classNames(
      'ui-sidebar-menu',
      `state-${(this.props.isExpanded ? 'expanded' : 'collapsed')}`
    );

    return (
      <div className={ menuClasses }>
        <div className='ui-sidebar-menu__container'>
          <div className='ui-sidebar-menu__backdrop' onClick={ this.handleCollapseRessed } />
          <div className='ui-menu ui-menu-main'>
            {this.props.children}
          </div>
        </div>
        <div className='ui-sidebar-menu__toggle'>
          <Button icon='menu' iconSize='small' onClick={ this.handleExpandPressed } className='ui-menu-toggle expand' />
          <Button icon='close' iconSize='small' onClick={ this.handleCollapseRessed } className='ui-menu-toggle collapse' />
        </div>
      </div>
    );
  }
}

SidebarMenu.defaultProps = {
  isExpanded: false,
  onCollapse () {},
  onExpand () {}
};

export default SidebarMenu;
