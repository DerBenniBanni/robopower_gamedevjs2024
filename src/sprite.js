
class Sprite {
    constructor({x,y}) {
        this.t = SPRITETYPE_SPRITE;
        this.p = new P(x, y);
        this.game = null;
        this.colliders = [];
        this.ttl = Infinity;
        this.rot = 0;
        this.hScale = 1;
        this.sortMod = 0; // sort modifier
    }
    update(delta) {}
    doRender(context) {
        this.renderStart(context);
        this.render(context);
        this.renderEnd(context);
    }
    renderStart(context, layer) {
        context.save();
        context.translate(this.p.x, this.p.y);
        this.renderStartExt(context);
    }
    renderStartExt(context) {}
    render(context) {}
    renderEnd(context) {
        context.restore();
    }
}