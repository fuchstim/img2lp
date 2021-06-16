const Point = require('../class/Point');

function getRandomValueBetween(min, max) {
  return min + ((max - min) * Math.random());
}

function generatePoints({ width, height, densityPercent = 1.5 }) {
  const density = densityPercent / 100;

  const dist = 1 / density;
  const countW = Math.ceil(width * density);
  const countH = Math.ceil(height * density);

  const points = [];

  for (let indexY = 0; indexY < countH; indexY ++) {
    points[indexY] = [];
    points[indexY].push(Point.create({ x: 0, y: getRandomValueBetween(indexY - 0.5, indexY + 0.5) * dist }));

    for (let indexX = 0; indexX < countW; indexX ++) {
      const x = getRandomValueBetween(indexX - 0.5, indexX + 0.5) * dist;
      const y = getRandomValueBetween(indexY - 0.5, indexY + 0.5) * dist;

      points[indexY].push(Point.create({ x, y }));
    }

    points[indexY].push(Point.create({ x: width, y: getRandomValueBetween(indexY - 0.5, indexY + 0.5) * dist }));
  }

  const firstRow = [
    Point.create({ x: 0, y: 0 }),
    ...Array(countW)
      .fill()
      .map((_, index) => Point.create({ x: getRandomValueBetween(index - 0.5, index + 0.5) * dist, y: 0 })),
    Point.create({ x: width, y: 0 }),
  ];

  const lastRow = [
    Point.create({ x: 0, y: height }),
    ...Array(countW)
      .fill()
      .map((_, index) => Point.create({ x: getRandomValueBetween(index - 0.5, index + 0.5) * dist, y: countH * dist })),
    Point.create({ x: width, y: height }),
  ];

  const rows = [
    firstRow,
    ...points,
    lastRow,
  ];

  return rows.map(row => {
    row.forEach(point => {
      if (point.x < 0) { point.x = 0; } else if (point.x > width) { point.x = width; }

      if (point.y < 0) { point.y = 0; } else if (point.y > height) { point.y = height; }
    });

    return row;
  });
}

module.exports = {
  generatePoints,
};
