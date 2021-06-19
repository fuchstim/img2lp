const COMMANDLINE_OPTIONS = {
  pointsDensity: {
    shortName: 'd',
    description: 'Points density in percent',
    demandOption: false,
    default: 1.5,
    type: 'number',
  },
  colourRadius: {
    shortName: 'r',
    description: 'Radius used to calculate average vertex colour in pixels',
    demandOption: false,
    default: 30,
    type: 'number',
  },
  inputPath: {
    shortName: 'i',
    description: 'Input file path',
    demandOption: true,
    type: 'string',
  },
  outputPath: {
    shortName: 'o',
    description: 'Output file path',
    demandOption: true,
    type: 'string',
  },
  outputFormat: {
    shortName: 'f',
    description: 'Output file format',
    demandOption: false,
    default: 'png',
    type: 'string',
    choices: [ 'png', 'jpg', 'bmp', 'svg' ],
  },
};

function parseOptions() {
  const defaultOptions = Object.values(COMMANDLINE_OPTIONS).reduce((acc, { shortName, default: value }) => ({ ...acc, [shortName]: value }), {});
  const aliases = Object.entries(COMMANDLINE_OPTIONS)
    .map(([ longName, { shortName }]) => ({ shortName, longName }));

  const yargs = require('yargs/yargs')(process.argv.slice(2));

  yargs.default(defaultOptions);

  Object.entries(COMMANDLINE_OPTIONS).forEach(([ longName, options ]) => {
    yargs.option(longName, options);
  });
  aliases.forEach(({ shortName, longName }) => yargs.alias(shortName, longName));

  return yargs.argv;
}

module.exports = {
  parseOptions,
};
