class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get identifier() {
    return Number([
      parseInt(this.x),
      parseInt(this.y),
    ].join(''));
  }

  distanceTo(point) {
    const distanceX = Math.abs(this.x - point.x);
    const distanceY = Math.abs(this.y - point.y);

    const distance = Math.sqrt((distanceX**2) + (distanceY**2));

    return distance;
  }
}

module.exports = Point;
module.exports.create = options => new Point(options);
