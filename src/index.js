#!/usr/bin/env node

const fs = require('fs');
const Jimp = require('jimp');
const { createCanvas } = require('canvas');
const path = require('path');

const utils = require('./utils');

async function run() {
  const { pointsDensity, colourRadius, inputPath, outputPath, outputFormat } = utils.cli.parseOptions();

  utils.log.info('Loading image…');
  const inputImage = await Jimp.read(path.resolve(inputPath));

  const { width, height } = inputImage.bitmap;

  utils.log.info('Generating points…');
  const points = utils.points.generatePoints({ width, height, densityPercent: pointsDensity });

  utils.log.info('Generating vertices…');
  const vertices = utils.vertices.getVertices({ points });

  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  utils.log.info('Drawing vertices…');

  let lastProgress;
  vertices.forEach((vertex, index) => {
    const midpoint = vertex.midpoint;
    vertex.fillColour = utils.pixels.getAverageColourAroundPoint({ point: midpoint, image: inputImage, radius: colourRadius });

    vertex.draw(context);

    const progress = Math.ceil((index * 100) / vertices.length);

    if (progress % 5 == 0 && progress != lastProgress) {
      lastProgress = progress;
      process.stdout.cursorTo(0);
      process.stdout.write(`[info] Progress: ${progress}%`);
    }
  });

  process.stdout.write('\n');

  const fullOutputPath = path.resolve(`${outputPath}.${outputFormat}`);
  utils.log.info(`Writing file ${fullOutputPath}…`);
  if (outputFormat === 'svg') {
    const svg = utils.svg.verticesToSvg({ vertices, width, height });
    fs.writeFileSync(fullOutputPath, svg);
  } else {
    const buffer = canvas.toBuffer('image/png');

    if (outputFormat === 'png') {
      fs.writeFileSync(fullOutputPath, buffer);
    } else {
      const outputImage = await Jimp.read(buffer);
      await outputImage.writeAsync(fullOutputPath);
    }
  }

  process.exit(0);
}

run();
