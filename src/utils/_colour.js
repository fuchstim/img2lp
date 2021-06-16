const Colour = require('../class/Colour');

function generateColour() {
  const [ r, g, b ] = Array(3)
    .fill()
    .map(() => Math.floor(Math.random() * 255));

  return Colour.create({ r, g, b });
}

module.exports = {
  generateColour,
};
