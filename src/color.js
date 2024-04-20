class Color {
    constructor(h) {
        h = h[0] == '#' ? h.substr(1) : h;
        this.r = hexToInt(h.substring(0,2));
        this.g = hexToInt(h.substring(2,4));
        this.b = hexToInt(h.substring(4,6));
        this.a = h.length == 8 ? hexToInt(h.substring(6,8)) : 255;
    }
    rgb() {
        return "#" + intToHex(this.r) + intToHex(this.g) + intToHex(this.b);
    }
    rgba() {
        return "#" + intToHex(this.r) + intToHex(this.g) + intToHex(this.b) + intToHex(this.a);
    }
    clone() {
        return new Color(this.rgba());
    }
    randLight(d) {
        return this.lightness(randInt(-d,d));
    }
    lightness(d) {
        d = Math.round(d);
        this.r = clamp(this.r + d, 0 , 255);
        this.g = clamp(this.g + d, 0 , 255);
        this.b = clamp(this.b + d, 0 , 255);
        return this;
    }
    rand(d) {
        this.r = clamp(this.r + randInt(-d,d), 0 , 255);
        this.g = clamp(this.g + randInt(-d,d), 0 , 255);
        this.b = clamp(this.b + randInt(-d,d), 0 , 255);
        return this;
    }
    fade(a) {
        a = Math.round(a);
        this.a = clamp(this.a - a, 0, 255);
    }
}