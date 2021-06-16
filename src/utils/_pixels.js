const Colour = require('../class/Colour');
const PixelData = require('../class/PixelData');

function getPixelData(imageData) {
  const pixels = [];
  for (let y = 0; y < imageData.height; y ++) {
    pixels[y] = [];
    for (let x = 0; x < imageData.width; x ++) {
      const index = (y * imageData.width) + x;
      const [ r, g, b ] = imageData.data.slice(index * 4, (index * 4) + 4);

      pixels[y][x] = { colour: Colour.create({ r, g, b }) };
    }
  }

  return PixelData.create({ pixels });
}

module.exports = {
  getPixelData,
};
