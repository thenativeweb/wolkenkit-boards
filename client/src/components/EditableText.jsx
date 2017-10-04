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
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isEditing: false
    };
  }

  componentDidMount () {
    this.editingWasCanceled = false;

    this.linkifiedText = linkifyHtml(this.props.initialText);
    this.element.innerHTML = this.linkifiedText;
  }

  componentDidUpdate (previousProps, previousState) {
    if (this.state.isEditing && !previousState.isEditing) {
      this.focus();
    }

    if (previousProps.initialText !== this.props.initialText) {
      if (!this.state.isEditing) {
        this.linkifyHtml(this.props.initialText);
      } else {
        this.element.innerHTML = this.props.initialText;
      }
    }
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
    let range,
        selection;

    this.element.focus();

    this.element.innerHTML = this.props.initialText;

    if (window.document.body.createTextRange) {
      range = window.document.body.createTextRange();
      range.moveToElementText(this.element);
      range.select();
    } else if (window.getSelection) {
      // Satisfy Safari and delay selection of the text onto the next tick
      setTimeout(() => {
        selection = window.getSelection();
        range = window.document.createRange();
        range.selectNodeContents(this.element);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 0);
    }
  }

  getText () {
    return this.element.innerHTML;
  }

  handleDoubleClick () {
    this.previousText = this.getText();
    this.editingWasCanceled = false;
    this.setState({
      isEditing: true
    }, () => {
      this.props.onEditingStarted(this.previousText);
    });
  }

  handleChange () {
    const text = this.getText();

    if (this.props.onChange) {
      this.props.onChange(text);
    }
  }

  handleKeyUp (event) {
    if (event.which === KEY_ESCAPE) {
      this.editingWasCanceled = true;
      this.element.blur();
      this.linkifyHtml(this.previousText);
    }
  }

  handleBlur () {
    const text = this.getText();

    this.setState({
      isEditing: false
    }, () => {
      this.props.onEditingStopped(text);

      if (this.editingWasCanceled) {
        this.editingWasCanceled = false;
        this.linkifyHtml(this.previousText);

        return;
      }

      if (text !== this.previousText && !this.editingWasCanceled) {
        const clean = DOMPurify.sanitize(text);

        this.linkifyHtml(clean);
        this.props.onEdited(clean);
      }
    });
  }

  render () {
    const classes = {
      editing: this.state.isEditing
    };

    classes[this.props.className] = true;

    return (
      <div
        ref={ this.handleElementRefChanged }
        className={ classNames(classes) }
        onDoubleClick={ this.handleDoubleClick }
        onInput={ this.handleChange }
        onKeyDown={ this.handleKeyDown }
        onKeyUp={ this.handleKeyUp }
        onBlur={ this.handleBlur }
        contentEditable={ this.state.isEditing }
      />
    );
  }
}

EditableText.defaultProps = {
  onChange () {},
  onEditingStarted () {},
  onEditingStopped () {},
  onEdited () {}
};

EditableText.propTypes = {
  className: PropTypes.string,
  initialText: PropTypes.string,
  onChange: PropTypes.func,
  onEdited: PropTypes.func,
  onEditingStarted: PropTypes.func,
  onEditingStopped: PropTypes.func
};

export default EditableText;
