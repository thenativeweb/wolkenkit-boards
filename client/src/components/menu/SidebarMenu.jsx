import Button from '../Button.jsx';
import classNames from 'classnames';
import FadeInRight from '../transitions/FadeInRight.jsx';
import React from 'react';
import styles from './SidebarMenu.css';

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
    const menuClasses = classNames(styles.SidebarMenu, {
      [styles.IsExpanded]: this.props.isExpanded,
      [styles.IsCollapsed]: !this.props.isExpanded
    });

    return (
      <div className={ menuClasses }>
        <div className={ styles.Container }>
          <div className={ styles.Backdrop } onClick={ this.handleCollapseRessed } />
          <FadeInRight in={ this.props.isExpanded }>
            <div className={ styles.Menu }>
              {this.props.children}
            </div>
          </FadeInRight>
        </div>
        <div className={ styles.Toggles }>
          <Button
            icon='menu'
            iconSize='s'
            onClick={ this.handleExpandPressed }
            className={ classNames(styles.Toggle, styles.ToggleExpand) }
          />
          <Button
            icon='close'
            iconSize='s'
            onClick={ this.handleCollapseRessed }
            className={ classNames(styles.Toggle, styles.ToggleCollapse) }
          />
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
