const Point = require('./Point');
const Colour = require('./Colour');

class Vertex {
  constructor({ a, b, c, fillColour = Colour.create() }) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.fillColour = fillColour;
  }

  get identifier() {
    return [ this.a.identifier, this.b.identifier, this.c.identifier ]
      .sort()
      .join('.');
  }

  get midpoint() {
    const x = Math.floor((this.a.x + this.b.x + this.c.x) / 3);
    const y = Math.floor((this.a.y + this.b.y + this.c.y) / 3);

    return Point.create({ x, y });
  }

  draw(context) {
    context.fillStyle = this.fillColour.hex;
    context.beginPath();

    context.moveTo(this.a.x, this.a.y);
    context.lineTo(this.b.x, this.b.y);
    context.lineTo(this.c.x, this.c.y);

    context.closePath();

    context.fill();
  }
}

module.exports = Vertex;
module.exports.create = options => new Vertex(options);
