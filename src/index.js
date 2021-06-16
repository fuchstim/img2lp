const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const utils = require('./utils');

async function run() {
  utils.log.info('Loading image...');
  const inputImage = await loadImage('./input.png');

  const { width, height } = inputImage;

  utils.log.info('Generating points...');
  const points = utils.points.generatePoints({ width, height, densityPercent: 1.5 });
  utils.log.info('Generating vertices...');
  const vertices = utils.vertices.getVertices({ points });

  const canvasWidth = points.pop().pop().x;
  const canvasHeight = points.pop().pop().y;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext('2d');

  context.drawImage(inputImage, 0, 0, canvasWidth, canvasHeight);

  utils.log.info('Parsing pixel data...');
  const pixelData = utils.pixels.getPixelData(context.getImageData(0, 0, canvasWidth, canvasHeight));
  utils.log.info('Drawing vertices...');
  vertices.forEach((vertex, index) => {
    const midpoint = vertex.midpoint;
    vertex.fillColour = pixelData.getAverageColourAroundPoint({ point: midpoint });

    vertex.draw(context);

    const progress = Math.ceil((index * 100) / vertices.length);
    if (progress % 10 === 0) {
      utils.log.info(`Drawing vertices... (${progress}% done)`);
    }
  });

  utils.log.info('Writing file...');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./output.png', buffer);

  const svg = utils.svg.verticesToSvg({ vertices, width: canvasWidth, height: canvasHeight });
  fs.writeFileSync('output.svg', svg);
}

run();
