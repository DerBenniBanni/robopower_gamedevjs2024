class Game {
    constructor() {
        this.sprites = [];
        this.bgSprites = [];
        this.state = STATE_LOADING;
        this.crt = false; // CRT-Effect
    }

    run() {
        getDelta(); // reset to zero
        this.gameloop();
    }
    
    gameloop() {
        let delta = getDelta();
        this.update(delta);
        this.render();
        let self = this;
        requestAnimationFrame(() => self.gameloop());
    }

    resize() {
        gameWidth = window.innerWidth;
        gameHeight = window.innerHeight;
        setDim(canvas, gameWidth, gameHeight);
		ctx.clearRect(0, 0, gameWidth, gameHeight);
        setDim(bgCanvas, gameWidth, gameHeight);
        this.renderBg();
        renderScale = Math.min(gameWidth/BASEWIDTH, gameHeight/BASEHEIGHT);
	}

    renderBg() {
        bgCtx.clearRect(0, 0, gameWidth, gameHeight);
        this.bgSprites.forEach(s=>s.doRender(bgCtx));
    }
    update(delta) {
        this.sprites.forEach(s=>s.update(delta));
    }
    render() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        this.sprites.sort((s1, s2) => (s1.p.y + s1.sortMod) - (s2.p.y + s2.sortMod));
        this.sprites.forEach(s=>s.doRender(ctx));
        if(this.crt) {
            ctx.beginPath();
            stroke(ctx,'#000000' + randInt(70,70));
            for(let y = 1; y < scale(BASEHEIGHT); y += 3) {
                ctx.moveTo(0,y);
                ctx.lineTo(scale(BASEWIDTH), y);
            }
            ctx.stroke();
        }
    }

    add(sprite) {
        sprite.game = this;
        this.sprites.push(sprite);
        return sprite;
    }
    addBg(sprite) {
        sprite.game = this;
        this.bgSprites.push(sprite);
        return sprite;
    }
    get(spritetype) {
        return this.sprites.filter(s => (s.t || '') == spritetype);
    }
}