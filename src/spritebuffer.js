
class SpriteBuffer {
    constructor(w, h) {
        this.c = document.createElement("canvas");
        this.c.width = w;
        this.c.height = h;
        this.ctx = this.c.getContext('2d');
        this.colCircles = [];
    }
}
const getSpriteBuffer = (w,h) =>  new SpriteBuffer(w,h);
