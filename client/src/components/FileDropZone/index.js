import PropTypes from 'prop-types';
import React from 'react';

class FileDropZone extends React.Component {
  static handleDragOver (event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  constructor (props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop (dropEvent) {
    const { fileTypes, onDrop } = this.props;

    const containerPosition = dropEvent.target.getBoundingClientRect(),
          files = dropEvent.dataTransfer.files;

    const coords = {
      left: dropEvent.clientX - containerPosition.left,
      top: dropEvent.clientY - containerPosition.top
    };

    dropEvent.stopPropagation();
    dropEvent.preventDefault();

    const firstFile = files[0];

    if (firstFile.type.match(fileTypes)) {
      onDrop(files, coords);
    }
  }

  render () {
    return (
      <div className='ui-file-drop-zone' onDragOver={ FileDropZone.handleDragOver } onDrop={ this.handleDrop }>
        {this.props.children}
      </div>
    );
  }
}

FileDropZone.defaultProps = {
  fileTypes: 'image.*'
};

FileDropZone.propTypes = {
  fileTypes: PropTypes.string,
  onDrop: PropTypes.func
};

export default FileDropZone;
