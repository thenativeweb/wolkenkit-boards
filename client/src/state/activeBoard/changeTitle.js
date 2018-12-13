export default function (state) {
  const changeTitle = function (title) {
    if (title === undefined) {
      throw new Error('Title is missing.');
    }

    state.newTitle = title;
  };

  return changeTitle;
}
