export default function (state) {
  const stopEditingPost = function () {
    if (!state.activePost) {
      return;
    }

    state.activePost = undefined;
  };

  return stopEditingPost;
}
