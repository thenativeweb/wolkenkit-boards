import React from 'react';
import styles from './DialogChrome.css';

class DialogChrome extends React.PureComponent {
  render () {
    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className={ styles.DialogChrome }>
        { this.props.titlebar }
        <div className='dialog__content'>
          {this.props.children}
        </div>
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

DialogChrome.transitionDuration = 300;

export default DialogChrome;
