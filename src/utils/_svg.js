function verticesToSvg({ vertices, width, height }) {
  const objects = vertices.map(vertex => {
    const path = `M ${vertex.a.x} ${vertex.a.y} `
      + `L ${vertex.b.x} ${vertex.b.y} `
      + `L ${vertex.c.x} ${vertex.c.y} Z`;

    return `<path d="${path}" fill="${vertex.fillColour.hex}"/>`;
  });

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${objects.join(' ')}
    </svg>
  `;

  return svg;
}

module.exports = {
  verticesToSvg,
};
