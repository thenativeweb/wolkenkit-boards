import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';
import { Button, Transition } from 'thenativeweb-ux';

const styles = theme => ({
  SidebarMenu: {
    height: theme.grid.stepSize * 4,
    width: theme.grid.stepSize * 4
  },

  Container: {},

  Backdrop: {
    background: theme.color.backdrop,
    position: 'fixed',
    left: 0,
    top: theme.grid.stepSize * 4,
    height: `calc(100% - ${theme.grid.stepSize * 4}px)`,
    width: '100%',
    overflow: 'hidden',
    zIndex: theme.zIndex.navigation,
    opacity: 0,
    transition: 'opacity 300ms',
    'will-change': 'opacity',
    'pointer-events': 'none'
  },

  Menu: {
    position: 'fixed',
    left: 0,
    top: theme.grid.stepSize * 4,
    width: 300,
    zIndex: theme.zIndex.navigation,
    height: `calc(100% - ${theme.grid.stepSize * 4}px)`,
    background: theme.color.panelBackground,
    'border-top': `1px solid ${theme.color.brand.lightGrey}`,
    'will-change': 'transform'
  },

  Toggles: {
    position: 'relative'
  },

  Toggle: {
    position: 'absolute',
    height: theme.grid.stepSize * 4,
    width: theme.grid.stepSize * 4,
    display: 'none',
    margin: 0
  },

  ToggleCollapse: {},
  ToggleExpand: {},

  IsExpanded: {
    '& $Backdrop': {
      opacity: 1,
      'pointer-events': 'all'
    },

    '& $ToggleCollapse': {
      display: 'flex'
    }
  },

  IsCollapsed: {
    '& $ToggleExpand': {
      display: 'flex'
    }
  }
});

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
    const { classes } = this.props;

    const componentClasses = classNames(classes.SidebarMenu, {
      [classes.IsExpanded]: this.props.isExpanded,
      [classes.IsCollapsed]: !this.props.isExpanded
    });

    return (
      <div className={ componentClasses }>
        <div className={ classes.Container }>
          <div className={ classes.Backdrop } onClick={ this.handleCollapseRessed } />
          <Transition type='FadeInRight' in={ this.props.isExpanded }>
            <div className={ classes.Menu }>
              {this.props.children}
            </div>
          </Transition>
        </div>
        <div className={ classes.Toggles }>
          <Button
            icon='menu'
            iconSize='s'
            onClick={ this.handleExpandPressed }
            className={ classNames(classes.Toggle, classes.ToggleExpand) }
          />
          <Button
            icon='close'
            iconSize='s'
            onClick={ this.handleCollapseRessed }
            className={ classNames(classes.Toggle, classes.ToggleCollapse) }
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

export default injectSheet(styles)(SidebarMenu);
