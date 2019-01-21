export default function (state) {
  const startEditingTitle = function (title) {
    if (!title) {
      throw new Error('Title is missing.');
    }

    state.newTitle = title;
  };

  return startEditingTitle;
}
