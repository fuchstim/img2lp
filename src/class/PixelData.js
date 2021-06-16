const Point = require('./Point');
const Colour = require('./Colour');

class PixelData {
  constructor({ pixels }) {
    this.pixels = pixels;
  }

  getColourAtPoint(point) {
    if (point.y < 0) { point.y = 0; }
    if (point.x < 0) { point.x = 0; }

    const pixelY = point.y >= this.pixels.length ? this.pixels.length - 1 : point.y;
    const pixelX = point.x >= this.pixels[pixelY].length ? this.pixels[pixelY].length - 1 : point.x;

    return this.pixels[pixelY][pixelX].colour;
  }

  getAverageColourAroundPoint({ point, radius = 10 }) {
    const colours = [];

    for (let indexY = 0; indexY < radius; indexY ++) {
      for (let indexX = 0; indexX < radius; indexX ++) {
        const x = (point.x - (radius / 2)) + indexX;
        const y = (point.y - (radius / 2)) + indexY;

        if (y < 0 || y >= this.pixels.length) { continue; }
        if (x < 0 || x >= this.pixels[y].length) { continue; }

        colours.push(
          this.getColourAtPoint(Point.create({ x, y }))
        );
      }
    }

    if (!colours.length) { return new Colour(); }

    return Colour.create({
      r: this._calculateAverage(colours.map(({ r }) => r)),
      g: this._calculateAverage(colours.map(({ g }) => g)),
      b: this._calculateAverage(colours.map(({ b }) => b)),
    });
  }

  _calculateAverage(values) {
    const sum = values.reduce((acc, value) => acc + (value**2), 0);

    return Math.sqrt(sum / values.length);
  }
}

module.exports = PixelData;
module.exports.create = options => new PixelData(options);
