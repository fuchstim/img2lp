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

  for (let rowIndex = 0; rowIndex < countH; rowIndex ++) {
    points[rowIndex] = [];
    points[rowIndex].push(Point.create({ x: 0, y: getRandomValueBetween(rowIndex - 0.5, rowIndex + 0.5) * dist }));

    for (let colIndex = 0; colIndex < countW; colIndex ++) {
      const x = getRandomValueBetween(colIndex - 0.5, colIndex + 0.5) * dist;
      const y = getRandomValueBetween(rowIndex - 0.5, rowIndex + 0.5) * dist;

      points[rowIndex].push(Point.create({ x, y }));
    }

    points[rowIndex].push(Point.create({ x: width, y: getRandomValueBetween(rowIndex - 0.5, rowIndex + 0.5) * dist }));
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
      .map((_, index) => Point.create({ x: getRandomValueBetween(index - 0.5, index + 0.5) * dist, y: height })),
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
