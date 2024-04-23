class LaserTower extends Sprite {
    constructor({x,y,d, imagePool, spriteDef}) {
        super({x,y});
        this.t = SPRITETYPE_LASERTOWER;
        this.w = 40;
        this.h = 40;
        this.rot = d; // direction
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = 41;
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.rot) % 360);
        if(rotDeg < 0) {
            rotDeg += 360;
        }
        context.drawImage(this.imagePool.g(rotDeg).c,-this.spriteDef.origin.x,-this.spriteDef.origin.y);
    }
    fire() {
        let move = new P(STEPSIZE * 0.5, 0);
        move = move.rotate(this.rot);
        let laserpos = this.p.addP(move);
        game.add(new Laser({
            x:laserpos.x, y:laserpos.y,
            d:this.rot,
            imagePool:laserImagePool, 
            spriteDef:laserDefinition}));
        //game.add(new Laser({x:620,y:580,d:BELT_RIGHT, imagePool:laserImagePool, spriteDef:laserDefinition}));
    }
}