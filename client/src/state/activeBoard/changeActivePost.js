export default function (state) {
  const changeActivePost = function (content) {
    if (content === undefined) {
      throw new Error('Content is missing.');
    }

    if (state.activePost) {
      state.activePost.content = content;
    }
  };

  return changeActivePost;
}
