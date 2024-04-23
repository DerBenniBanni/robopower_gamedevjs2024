class Particle extends Sprite {
    constructor(x,y,ttl,rnd) {
        super({x,y});
        this.ttl = ttl;
        this.ottl = ttl; // initial ttl for anim steps
        this.sortMod = 48;
        this.c = new Color('#ffff00');
        if(rnd) {
            this.c.rand(rnd);
        }
        this.size = 10;
        this.dp = new P(randInt(-100,100), randInt(-100,100));
        this.rot = rand(0, PI);
        this.rotSpeed = rand(2*PI, 10*PI);
    }
    update(delta) {
        let dp = this.dp.clone();
        dp.x *= delta;
        dp.y *= delta;
        this.p = this.p.addP(dp);
        this.rot +=this.rotSpeed * delta;
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