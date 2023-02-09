// Detect Closest Edge
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
const closestEdge = (x, y, w, h) => {
  var topEdgeDist = distMetric(x, y, w / 2, 0);
  var bottomEdgeDist = distMetric(x, y, w / 2, h);
  var min = Math.min(topEdgeDist, bottomEdgeDist);
  return min === topEdgeDist ? "top" : "bottom";
};

// Distance Formula
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
const distMetric = (x, y, x2, y2) => {
  var xDiff = x - x2;
  var yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
};

export { closestEdge };
