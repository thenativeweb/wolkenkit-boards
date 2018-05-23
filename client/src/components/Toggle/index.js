import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';

const styles = {

};

class Toggle extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChangeValue (newValue) {
    this.props.onChange(newValue);
  }

  render () {
    const { classes, className, selectedValue, values } = this.props;

    const componentClasses = classNames(classes.Toggle, className);

    return (
      <div className={ componentClasses }>
        {values.map(value => this.props.children({ value, isSelected: selectedValue === value, changeValue: this.handleChangeValue }))}
      </div>
    );
  }
}

Toggle.defaultProps = {
  values: [ 'yellow', 'red', 'green' ],
  selectedValue: 'yellow',
  onChange () {}
};

export default injectSheet(styles)(Toggle);
