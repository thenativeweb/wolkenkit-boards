const constrain = function (num, low, high) {
  return Math.max(Math.min(num, high), low);
};

const translateToRange = function (num, start1, stop1, start2, stop2, withinBounds) {
  const newval = (num - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  if (!withinBounds) {
    return newval;
  }

  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  }

  return constrain(newval, stop2, start2);
};

export default translateToRange;
