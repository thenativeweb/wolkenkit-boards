import FileDropZone from './FileDropZone.jsx';
import Post from './Post.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import styles from './Posts.css';

class Posts extends React.Component {
  constructor (props) {
    super(props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick (event) {
    if (!event.target.classList.contains(styles.Posts)) {
      return;
    }

    this.props.onTextNote(event);
  }

  render () {
    return (
      <FileDropZone onFileDropped={ this.props.onImageNote }>
        <div className={ styles.Posts } onDoubleClick={ this.handleDoubleClick }>
          <ReactTransitionGroup>
            {this.props.posts.map(post => (
              <Post
                id={ post.id }
                key={ post.id }
                left={ post.position.left }
                top={ post.position.top }
                color={ post.color }
                type={ post.type }
                content={ post.content }
                creator={ post.creator }
                isDone={ post.isDone }
                onMoveEnd={ this.props.onMove }
                onColorChange={ this.props.onColorChange }
                onEdit={ this.props.onEdit }
                onMarkAsDone={ this.props.onMarkAsDone }
                onThrowAway={ this.props.onThrowAway }
                onFullscreenRequest={ this.props.onFullscreenRequest }
              />
            ))}
          </ReactTransitionGroup>
        </div>
      </FileDropZone>
    );
  }
}

Posts.defaultProps = {
  posts: [],
  onColorChange () {},
  onEdit () {},
  onImageNote () {},
  onMarkAsDone () {},
  onMove () {},
  onTextNote () {},
  onFullscreenRequest () {},
  onThrowAway () {}
};

Post.propTypes = {
  posts: PropTypes.array,
  onColorChange: PropTypes.func,
  onEdit: PropTypes.func,
  onImageNote: PropTypes.func,
  onMarkAsDone: PropTypes.func,
  onMove: PropTypes.func,
  onTextNote: PropTypes.func,
  onThrowAway: PropTypes.func
};

export default Posts;
