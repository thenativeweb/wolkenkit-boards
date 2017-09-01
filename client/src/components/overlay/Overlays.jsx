import classNames from 'classnames';
import eventbus from '../../services/eventbus';
import Overlay from './Overlay.jsx';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import styles from './Overlays.css';

class Overlays extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleShowAlertEvent = this.handleShowAlertEvent.bind(this);
    this.handleAlertDismissedTimeout = this.handleAlertDismissedTimeout.bind(this);

    this.state = {
      isVisible: false,
      text: 'Hello world!',
      dismissAfter: 2000,
      onDismiss () {}
    };
  }

  componentDidMount () {
    eventbus.on('overlay::alert::show', this.handleShowAlertEvent);
  }

  componentWillUpdate (nextProps, nextState) {
    if (!this.state.isVisible && nextState.isVisible && nextState.dismissAfter) {
      this.dismissTimer = setTimeout(this.handleAlertDismissedTimeout, nextState.dismissAfter);
    }
  }

  componentWillUnmount () {
    clearTimeout(this.dismissTimer);
    eventbus.off('overlay::alert::show', this.handleShowAlertEvent);
  }

  handleShowAlertEvent (options) {
    this.setState({
      isVisible: true,
      text: options.text,
      onDismiss: options.onDismiss,
      dismissAfter: options.dismissAfter
    });
  }

  handleAlertDismissedTimeout () {
    this.setState({
      isVisible: false
    });

    // Wait until closing transition is finished
    setTimeout(() => {
      this.state.onDismiss();
      eventbus.emit('overlay::alert::closed');
    }, Overlay.transitionDuration);
  }

  renderOverlay () {
    if (!this.state.isVisible) {
      return null;
    }

    return <Overlay key={ new Date() }>{ this.state.text }</Overlay>;
  }

  render () {
    const containerClasses = classNames(styles.Overlays);

    return (
      <div className={ containerClasses }>
        <ReactTransitionGroup>
          { this.renderOverlay() }
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default Overlays;
