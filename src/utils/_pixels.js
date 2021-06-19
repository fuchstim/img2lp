const Jimp = require('jimp');

const Colour = require('../class/Colour');

function getAverageColourAroundPoint({ point, image, radius = 30 }) {
  const colours = [];

  const { width, height } = image.bitmap;

  for (let indexY = 0; indexY < radius; indexY ++) {
    for (let indexX = 0; indexX < radius; indexX ++) {
      const x = (point.x - (radius / 2)) + indexX;
      const y = (point.y - (radius / 2)) + indexY;

      if (y < 0 || y >= height) { continue; }
      if (x < 0 || x >= width) { continue; }

      const colour = Jimp.intToRGBA(image.getPixelColor(x, y));

      colours.push(Colour.create(colour));
    }
  }

  if (!colours.length) { return new Colour(); }

  return Colour.create({
    r: _calculateAverage(colours.map(({ r }) => r)),
    g: _calculateAverage(colours.map(({ g }) => g)),
    b: _calculateAverage(colours.map(({ b }) => b)),
  });
}

function _calculateAverage(values) {
  const sum = values.reduce((acc, value) => acc + (value**2), 0);

  return Math.sqrt(sum / values.length);
}

module.exports = {
  getAverageColourAroundPoint,
};
