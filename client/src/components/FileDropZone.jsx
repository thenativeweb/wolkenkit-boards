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
          files = dropEvent.dataTransfer.files,
          readFiles = [];

    const coords = {
      left: dropEvent.clientX - containerPosition.left,
      top: dropEvent.clientY - containerPosition.top
    };

    dropEvent.stopPropagation();
    dropEvent.preventDefault();

    const onImageLoaded = event => {
      readFiles.push(event.target.result);
      if (readFiles.length === files.length) {
        onDrop(readFiles, coords);
      }
    };

    for (let fileCount = 0; fileCount < files.length; fileCount++) {
      const file = files[fileCount];

      if (!file.type.match(fileTypes)) {
        continue;
      }
      const fileReader = new window.FileReader();

      fileReader.onloadend = onImageLoaded;
      fileReader.readAsArrayBuffer(files[fileCount]);
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
