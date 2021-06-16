const Vertex = require('../class/Vertex');

function getVertices({ points }) {
  const vertices = [];

  for (let rowIndex = 0; rowIndex < points.length - 1; rowIndex ++) {
    for (let colIndex = 0; colIndex < points[rowIndex].length - 1; colIndex ++) {
      vertices.push(Vertex.create({
        a: points[rowIndex][colIndex],
        b: points[rowIndex][colIndex + 1],
        c: points[rowIndex + 1][colIndex],
      }));

      vertices.push(Vertex.create({
        a: points[rowIndex][colIndex + 1],
        b: points[rowIndex + 1][colIndex + 1],
        c: points[rowIndex + 1][colIndex],
      }));
    }
  }

  return vertices;
}

module.exports = {
  getVertices,
};
