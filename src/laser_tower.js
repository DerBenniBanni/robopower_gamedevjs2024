class LaserTower extends Sprite {
    constructor({x,y,d, imagePool, spriteDef}) {
        super({x,y});
        this.w = scale(40);
        this.h = scale(40);
        this.d = d; // direction
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = scale(41);
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.d) % 360);
        context.drawImage(this.imagePool.g(rotDeg).c,scale(-this.spriteDef.origin.x),scale(-this.spriteDef.origin.y));
    }
}