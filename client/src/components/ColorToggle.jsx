import classNames from 'classnames';
import React from 'react';

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
    let colorClasses = `ui-color-toggle__button ${color}`;

    if (color === this.props.selectedColor) {
      colorClasses += ' selected';
    }

    return (
      <div
        className={ colorClasses }
        key={ color }
        data-color={ color }
        onClick={ this.handleColorClicked }
      >
        <div data-type={ color } className='color' />
      </div>
    );
  }

  render () {
    return (
      <div className={ classNames('ui-color-toggle', this.props.className) }>
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
