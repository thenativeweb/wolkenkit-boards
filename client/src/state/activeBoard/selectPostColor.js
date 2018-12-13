export default function (state) {
  const selectPostColor = function (color) {
    if (!color) {
      throw new Error('Color is missing.');
    }

    state.selectedPostColor = color;
  };

  return selectPostColor;
}
