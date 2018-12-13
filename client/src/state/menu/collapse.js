export default function (state) {
  const collapse = function () {
    if (state.isExpanded) {
      state.isExpanded = false;
    }
  };

  return collapse;
}
