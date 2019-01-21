import React from 'react';
import { Transition } from 'thenativeweb-ux';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

const styles = theme => ({
  SidebarMenu: {},

  Container: {},

  Backdrop: {
    background: theme.color.backdrop,
    position: 'fixed',
    left: 0,
    top: 0,
    height: `100%`,
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
    left: theme.components.sidebar.width,
    top: 0,
    width: 300,
    zIndex: theme.zIndex.navigation,
    height: `100%`,
    background: theme.color.brand.white,
    'border-top': `1px solid ${theme.color.brand.lightGrey}`,
    'will-change': 'transform'
  },

  IsExpanded: {
    '& $Backdrop': {
      opacity: 1,
      'pointer-events': 'all'
    }
  },

  IsCollapsed: {}
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
      </div>
    );
  }
}

SidebarMenu.defaultProps = {
  isExpanded: false,
  onCollapse () {},
  onExpand () {}
};

export default withStyles(styles)(SidebarMenu);
