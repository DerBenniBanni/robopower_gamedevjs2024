class LaserTower extends Sprite {
    constructor({x,y,d, imagePool, spriteDef}) {
        super({x,y});
        this.w = 40;
        this.h = 40;
        this.d = d; // direction
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = 41;
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.d) % 360);
        context.drawImage(this.imagePool.g(rotDeg).c,-this.spriteDef.origin.x,-this.spriteDef.origin.y);
    }
}