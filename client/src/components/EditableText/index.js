import { classNames } from 'thenativeweb-ux/dist/styles';
/* eslint-disable no-unused-vars */
import linkify from 'linkifyjs';
/* eslint-enable no-unused-vars */
import linkifyHtml from 'linkifyjs/html';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-textarea-autosize';

const KEY_ESCAPE = 27;
const KEY_ENTER = 13;

class EditableText extends React.PureComponent {
  static handleKeyDown (event) {
    if (event.which === KEY_ENTER) {
      event.stopPropagation();
      event.preventDefault();
      window.document.execCommand('insertHTML', false, '<br><br>');
    }
  }

  constructor (props) {
    super(props);

    this.onElementRefChanged = this.onElementRefChanged.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isEditing: false
    };
  }

  componentDidMount () {
    this.editingWasCanceled = false;

    this.linkifiedText = linkifyHtml(this.props.content);
  }

  componentDidUpdate (previousProps) {
    if (this.props.isEditing && !previousProps.isEditing) {
      this.focus();
    }
  }

  onElementRefChanged (element) {
    this.element = element;
  }

  focus () {
    this.element.select();
  }

  getText () {
    return this.element.innerHTML;
  }

  handleKeyUp (event) {
    if (event.which === KEY_ESCAPE) {
      this.element.blur();
    }
  }

  handleBlur () {
    this.props.onBlur();
  }

  renderStaticContent () {
    return (
      <div className='textarea' dangerouslySetInnerHTML={{ __html: linkifyHtml(this.props.content) }} />
    );
  }

  renderTextArea () {
    return (
      <Textarea
        className='textarea'
        style={{ boxSizing: 'border-box' }}
        minRows={ 1 }
        maxRows={ 9 }
        inputRef={ this.onElementRefChanged }
        value={ this.props.content }
        onFocus={ this.props.onFocus }
        onChange={ this.props.onChange }
        onKeyDown={ this.handleKeyDown }
        onKeyUp={ this.handleKeyUp }
        onBlur={ this.handleBlur }
      />
    );
  }

  render () {
    const { className, isEditing } = this.props;

    const classes = {
      editing: isEditing
    };

    classes[className] = true;

    return (
      <div
        className={ classNames(classes) }
        onDoubleClick={ this.handleDoubleClick }
      >
        { isEditing ? this.renderTextArea() : this.renderStaticContent() }
      </div>
    );
  }
}

EditableText.defaultProps = {
  onBlur () {},
  onChange () {},
  onEdited () {}
};

EditableText.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  onBlur: PropTypes.func
};

export default EditableText;
