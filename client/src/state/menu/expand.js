export default function (state) {
  const expand = function () {
    if (!state.isExpanded) {
      state.isExpanded = true;
    }
  };

  return expand;
}
