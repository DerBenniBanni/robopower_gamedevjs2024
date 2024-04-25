const LASERSPEED = 500;
class Laser extends Sprite {
    constructor({x,y,d, imagePool, spriteDef}) {
        super({x,y});
        this.t = SPRITETYPE_LASER;
        this.w = 40;
        this.h = 40;
        this.d = d; // direction
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = 40;
    }
    update(delta) {
        let move = new P(LASERSPEED * delta, 0);
        move = move.rotate(this.d);
        this.p = this.p.addP(move);
        if(this.p.x < 0 || this.p.x > BASEWIDTH || this.p.y < 0 || this.p.y > BASEHEIGHT) {
            this.ttl = 0;
        }
        game.get([SPRITETYPE_ROBO, SPRITETYPE_LASERTOWER]).forEach(obj => {
            if(samePosition(obj.p, this.p, 10)) {
                Music.play(Music.hitAudio);
                this.ttl = 0;
                if(obj.t == SPRITETYPE_ROBO && obj.isPlayer) {
                    obj.power = clamp(obj.power-LASER_COST, 0, 9);
                    obj.showPower();
                }
                for(let i = 0; i < 30; i++) {
                    game.add(new Particle(
                        this.p.x + rand(-5,5), 
                        this.p.y-16 + rand(-5,5), 
                        rand(0.5,1),
                        5
                    ));
                }
            }
        })
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.d) % 360);
        context.drawImage(this.imagePool.g(rotDeg).c,-this.spriteDef.origin.x,-this.spriteDef.origin.y);
    }
}