import FadeInLeft from '../transitions/FadeInLeft.jsx';
import Notification from './_Notification.jsx';
import React from 'react';
import services from '../../services';
import styles from './styles.css';
import { TransitionGroup } from 'react-transition-group';

class Notifications extends React.PureComponent {
  constructor () {
    super();

    this.handleServiceChanged = this.handleServiceChanged.bind(this);
  }

  componentDidMount () {
    services.notifications.on('changed', this.handleServiceChanged);
  }

  componentWillUnount () {
    services.notifications.removeListener('changed', this.handleServiceChanged);
  }

  handleServiceChanged () {
    this.forceUpdate();
  }

  /* eslint-disable class-methods-use-this */
  render () {
    return (
      <div className={ styles.Notifications }>
        <TransitionGroup>
          { services.notifications.state.items.map(notification => (
            <FadeInLeft key={ notification.id }>
              <Notification type={ notification.type } text={ notification.text } />
            </FadeInLeft>
          ))}
        </TransitionGroup>
      </div>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default Notifications;
