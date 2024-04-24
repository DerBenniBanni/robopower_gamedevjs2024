class P {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new P(this.x, this.y);
    }
    add(x,y) {
        return new P(this.x+x, this.y+y);
    }
    addP(p) {
        return this.add(p.x, p.y);
    }
    diffP(p) {
        return new P(this.x-p.x, this.y-p.y);
    }
    div(divisor) {
        return new P(this.x/divisor, this.y/divisor);
    }
    multi(factor) {
        return new P(this.x*factor, this.y*factor);
    }
    rotate(angle) {
        return new P(this.x * cos(angle) - this.y * sin(angle), this.x * sin(angle) + this.y * cos(angle));
    }
    dist(p) {
        let x = this.x - p.x;
        let y = this.y - p.y;
        return Math.sqrt(x*x + y*y);
    }
}
const hexToInt = (h) => parseInt('0x' + h);
const intToHex = (d) => (d <=15 ? "0" : "") + Number(d).toString(16);

