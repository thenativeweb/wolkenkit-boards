import eventbus from '../../services/eventbus';
import MenuItem from './MenuItem.jsx';
import React from 'react';
import styles from './ContextMenu.css';

class ContextMenu extends React.Component {
  constructor (props) {
    super(props);

    this.handleRefContainerChanged = this.handleRefContainerChanged.bind(this);
    this.handleOpenEvent = this.handleOpenEvent.bind(this);
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
    this.handleItemClicked = this.handleItemClicked.bind(this);
    this.handleDocumentClicked = this.handleDocumentClicked.bind(this);

    this.onItemSelected = undefined;

    this.state = {
      target: null,
      items: null
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
    this.onItemSelected = options.onItemSelected;

    this.setState({
      target: options.target,
      items: options.items
    });

    window.document.addEventListener('mouseup', this.handleDocumentClicked, true);
  }

  close () {
    if (this.onItemSelected) {
      this.setState({
        target: null,
        items: null,
        onItemSelected: null
      });
    }

    window.document.removeEventListener('mouseup', this.handleDocumentClicked, true);
  }

  handleRefContainerChanged (ref) {
    this.container = ref;
  }

  handleOpenEvent (options) {
    this.open(options);
  }

  handleCloseEvent () {
    this.close();
  }

  handleItemClicked (id, data) {
    if (this.onItemSelected) {
      this.onItemSelected(id, data);
      this.close();
    }
  }

  handleDocumentClicked (event) {
    if (!this.container.contains(event.target)) {
      this.close();
    }
  }

  render () {
    if (!this.state.items) {
      return <div />;
    }

    const style = {
      left: this.state.target.getBoundingClientRect().left +
        (window.pageXOffset || window.scrollX),
      top: this.state.target.getBoundingClientRect().top +
        (window.pageYOffset || window.scrollY),
      position: 'absolute'
    };

    return (
      <div
        id='ui-context-menu'
        ref={ this.handleRefContainerChanged }
        className={ styles.Container }
        style={ style }
      >
        <div className={ styles.ContextMenu }>
          {this.state.items.map((item, i) =>
            <MenuItem key={ i } id={ item.id } data={ item.data } onClick={ this.handleItemClicked }>{item.label}</MenuItem>
          )}
        </div>
      </div>
    );
  }
}

export default ContextMenu;
