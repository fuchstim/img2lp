class Colour {
  constructor({ r = 0, g = 0, b = 0, hex } = {}) {
    this.channels = {
      r: 0,
      g: 0,
      b: 0,
    };

    this._setChannelVal('r', r);
    this._setChannelVal('g', g);
    this._setChannelVal('b', b);

    if (hex) {
      this.hex = hex;
    }
  }

  get hex() {
    const hexString = [ this.r, this.g, this.b ]
      .map(value => {
        const hex = value.toString(16);

        return hex.length < 2 ? `0${hex}` : hex;
      })
      .join('');

    return `#${hexString}`.toUpperCase();
  }

  set hex(value) {
    value = value.replaceAll('#', '');

    let hexR, hexG, hexB;
    if (value.length === 3) {
      const [ inputHexR, inputHexG, inputHexB ] = value.split('');

      hexR = inputHexR + inputHexR;
      hexG = inputHexG + inputHexG;
      hexB = inputHexB + inputHexB;
    } else if (value.length === 6) {
      hexR = value.slice(0, 2);
      hexG = value.slice(2, 4);
      hexB = value.slice(4, 6);
    } else {
      throw new Error('Invalid hex string length');
    }

    console.log({ hexR, hexG, hexB });

    this._setChannelVal('r', parseInt(hexR, 16));
    this._setChannelVal('g', parseInt(hexG, 16));
    this._setChannelVal('b', parseInt(hexB, 16));
  }

  set r(value) { this._setChannelVal('r', value); }
  set g(value) { this._setChannelVal('g', value); }
  set b(value) { this._setChannelVal('b', value); }

  get r() { return this.channels.r; }
  get g() { return this.channels.g; }
  get b() { return this.channels.b; }

  _setChannelVal(channel, value) {
    const numVal = Number(value);
    if (numVal > 255 || numVal < 0) {
      throw new Error(`Invalid value for ${channel}: ${numVal}`);
    }

    this.channels[channel] = Math.round(numVal);
  }
}

module.exports = Colour;
module.exports.create = options => new Colour(options);
