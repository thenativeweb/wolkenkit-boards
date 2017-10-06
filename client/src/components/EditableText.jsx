import classNames from 'classnames';
import createDOMPurify from 'dompurify';
/* eslint-disable no-unused-vars */
import linkify from 'linkifyjs';
/* eslint-enable no-unused-vars */
import linkifyHtml from 'linkifyjs/html';
import PropTypes from 'prop-types';
import React from 'react';

const KEY_ESCAPE = 27;
const KEY_ENTER = 13;

const DOMPurify = createDOMPurify(window);

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

    this.handleElementRefChanged = this.handleElementRefChanged.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isEditing: false
    };
  }

  componentDidMount () {
    this.editingWasCanceled = false;

    this.linkifiedText = linkifyHtml(this.props.initialText);
    // this.element.innerHTML = this.linkifiedText;
  }

  componentDidUpdate (previousProps) {
    if (this.props.isEditing && !previousProps.isEditing) {
      this.focus();
    }

    // if (previousProps.initialText !== this.props.initialText) {
    //   if (!this.state.isEditing) {
    //     this.linkifyHtml(this.props.initialText);
    //   } else {
    //     this.element.innerHTML = this.props.initialText;
    //   }
    // }
  }

  linkifyHtml (text) {
    this.linkifiedText = linkifyHtml(text);
    this.originalText = text;
    this.element.innerHTML = this.linkifiedText;
  }

  handleElementRefChanged (element) {
    this.element = element;
  }

  focus () {
    this.element.select();

    // let range,
    //     selection;
    //
    // this.element.focus();
    //
    // this.element.innerHTML = this.props.initialText;
    //
    // if (window.document.body.createTextRange) {
    //   range = window.document.body.createTextRange();
    //   range.moveToElementText(this.element);
    //   range.select();
    // } else if (window.getSelection) {
    //   // Satisfy Safari and delay selection of the text onto the next tick
    //   setTimeout(() => {
    //     selection = window.getSelection();
    //     range = window.document.createRange();
    //     range.selectNodeContents(this.element);
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    //   }, 0);
    // }
  }

  getText () {
    return this.element.innerHTML;
  }

  handleKeyUp (event) {
    if (event.which === KEY_ESCAPE) {
      this.element.blur();
      // this.linkifyHtml(this.previousText);
    }
  }

  handleBlur () {
    this.props.onBlur();
  }

  render () {
    const classes = {
      editing: this.state.isEditing
    };

    classes[this.props.className] = true;

    return (
      <div
        className={ classNames(classes) }
        contentEditable={ this.state.isEditing }
        onDoubleClick={ this.handleDoubleClick }
      >
        <textarea
          ref={ this.handleElementRefChanged }
          value={ this.props.initialText }
          onFocus={ this.props.onFocus }
          onChange={ this.props.onChange }
          onKeyDown={ this.handleKeyDown }
          onKeyUp={ this.handleKeyUp }
          onBlur={ this.handleBlur }
        />
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
  className: PropTypes.string,
  initialText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onEdited: PropTypes.func
};

export default EditableText;
