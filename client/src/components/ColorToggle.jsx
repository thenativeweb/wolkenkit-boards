import classNames from 'classnames';
import React from 'react';
import styles from './ColorToggle.css';

class ColorToggle extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleColorClicked = this.handleColorClicked.bind(this);
    this.renderColor = this.renderColor.bind(this);
  }

  handleColorClicked (event) {
    this.props.onChange(event.currentTarget.getAttribute('data-color'));
  }

  renderColor (color) {
    const buttonClassNames = classNames(styles.Button, {
      [styles.ButtonSelected]: color === this.props.selectedColor
    });

    const colorClassNames = classNames(styles.Color, {
      [styles.ColorGreen]: color === 'green',
      [styles.ColorPaperLined]: color === 'paper-lined',
      [styles.ColorRed]: color === 'red',
      [styles.ColorYellow]: color === 'yellow'
    });

    return (
      <div
        className={ buttonClassNames }
        key={ color }
        data-color={ color }
        onClick={ this.handleColorClicked }
      >
        <div className={ colorClassNames } />
      </div>
    );
  }

  render () {
    return (
      <div className={ classNames(styles.ColorToggle, this.props.className) }>
        {this.props.colors.map(this.renderColor)}
      </div>
    );
  }
}

ColorToggle.defaultProps = {
  colors: [ 'yellow', 'red', 'green' ],
  selectedColor: 'yellow',
  onChange () {}
};

export default ColorToggle;
