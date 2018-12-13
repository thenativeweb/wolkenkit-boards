export default function (state) {
  const isEnabled = function () {
    return state.items.length !== 0;
  };

  return isEnabled;
}
