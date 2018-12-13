export default function (state) {
  const stopEditingTitle = function () {
    if (!state.newTitle) {
      return;
    }

    state.newTitle = undefined;
  };

  return stopEditingTitle;
}
