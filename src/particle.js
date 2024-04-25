const PARTICLE_SPARK = 1;
const PARTICLE_SMOKE = 2;
class Particle extends Sprite {
    constructor(x,y,ttl,rnd, type) {
        super({x,y});
        this.ttl = ttl;
        this.ottl = ttl; // initial ttl for anim steps
        this.sortMod = 48;
        this.type = type || PARTICLE_SPARK;
        this.c = new Color('#ffff00');
        this.dp = new P(randInt(-100,100), randInt(-100,100));
        this.size = 10;
        
        this.rot = rand(0, PI);
        this.rotSpeed = rand(2*PI, 10*PI);
        switch(this.type) {
            case PARTICLE_SPARK:
                this.c = new Color('#ffff00');
            break;
            case PARTICLE_SMOKE:
                this.c = new Color('#33333344');
                if(rand(-5,10) < 0) {
                    this.c = new Color('#ff663333');
                }
                this.dp = new P(randInt(-50,50), randInt(-120,-60));
                this.size = 15;
                this.sortMod = 100;
            break;
        }
        if(rnd) {
            this.c.rand(rnd);
        }
    }
    smoke() {

    }
    update(delta) {
        let dp = this.dp.clone();
        dp.x *= delta;
        dp.y *= delta;
        this.p = this.p.addP(dp);
        this.rot +=this.rotSpeed * delta;
    }
    onRemove() {
        if(this.type == PARTICLE_SPARK) {
            bgCtx.save();
            bgCtx.translate(this.p.x, this.p.y);
            bgCtx.rotate(this.rot);
            fillStyle(bgCtx, '#0002');
            let size = rand(this.size/2, this.size);
            fillRect(bgCtx, -size/2, -size/2, size, size);
            bgCtx.restore();
        }
    }
    renderStartExt(context) {
        context.rotate(this.rot);
    }
    render(context) {
        let animFactor = this.ttl/this.ottl;
        let color = this.c.clone().fade(255 * (1-animFactor));
        fillStyle(context, color.rgba());
        let size = this.size * animFactor;
        fillRect(context, -size/2, -size/2, size, size);
    }
}