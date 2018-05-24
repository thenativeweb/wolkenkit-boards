import eventbus from '../../services/eventbus';
import injectSheet from 'react-jss';
import MenuItem from './MenuItem';
import React from 'react';

const styles = theme => ({
  Container: {
    position: 'absolute',
    background: theme.color.brand.white,
    'border-radius': theme.components.borderRadius.default,
    'min-width': theme.grid.stepSize * 15,
    'z-index': theme.zIndex.menu,
    'box-shadow': theme.shadow.overlay
  }
});

class ContextMenu extends React.Component {
  constructor (props) {
    super(props);

    this.handleRefContainerChanged = this.handleRefContainerChanged.bind(this);
    this.handleOpenEvent = this.handleOpenEvent.bind(this);
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
    this.handleItemClicked = this.handleItemClicked.bind(this);
    this.handleDocumentClicked = this.handleDocumentClicked.bind(this);

    this.state = {
      isVisible: false,
      target: undefined,
      items: [],
      onItemSelected: undefined
    };
  }

  componentDidMount () {
    eventbus.on('context-menu-open', this.handleOpenEvent);
    eventbus.on('context-menu::close', this.handleCloseEvent);
  }

  componentWillUnmount () {
    eventbus.removeListener('context-menu-open', this.handleOpenEvent);
    eventbus.removeListener('context-menu::close', this.handleCloseEvent);
  }

  open (options) {
    this.setState({
      isVisible: true,
      target: options.target,
      items: options.items,
      onItemSelected: options.onItemSelected
    });

    window.document.addEventListener('mouseup', this.handleDocumentClicked, true);
  }

  close () {
    this.setState({
      isVisible: false,
      target: undefined,
      items: [],
      onItemSelected: undefined
    });

    window.document.removeEventListener('mouseup', this.handleDocumentClicked, true);
  }

  handleRefContainerChanged (ref) {
    this.container = ref;
  }

  handleOpenEvent (options) {
    if (!options.target) {
      throw new Error('Target is missing.');
    }
    if (!options.items) {
      throw new Error('Items are missing.');
    }
    if (!options.onItemSelected) {
      throw new Error('onItemSelected is missing.');
    }

    this.open(options);
  }

  handleCloseEvent () {
    this.close();
  }

  handleItemClicked (id, data) {
    if (typeof this.state.onItemSelected === 'function') {
      this.state.onItemSelected(id, data);
      this.close();
    }
  }

  handleDocumentClicked (event) {
    if (!this.container.contains(event.target)) {
      this.close();
    }
  }

  render () {
    const { classes } = this.props;
    const { isVisible, items, target } = this.state;

    if (!isVisible) {
      return null;
    }

    let targetRect = { left: 0, top: 0 };

    if (target) {
      targetRect = target.getBoundingClientRect();
    }

    const style = {
      left: targetRect.left + (window.pageXOffset || window.scrollX),
      top: targetRect.top + (window.pageYOffset || window.scrollY),
      position: 'absolute'
    };

    return (
      <div
        id='ui-context-menu'
        ref={ this.handleRefContainerChanged }
        className={ classes.Container }
        style={ style }
      >
        <div className={ classes.ContextMenu }>
          {items.map(
            (item, i) =>
              <MenuItem key={ i } id={ item.id } data={ item.data } onClick={ this.handleItemClicked }>{item.label}</MenuItem>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(ContextMenu);
