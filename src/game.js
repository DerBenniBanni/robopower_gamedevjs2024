class Game {
    constructor() {
        this.sprites = [];
        this.bgSprites = [];
        this.state = STATE_LOADING;
        this.crt = false; // CRT-Effect
        this.setSize();
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

    setSize() {
        canvas.width = BASEWIDTH; 
        canvas.height = BASEHEIGHT;
        bgCanvas.width = BASEWIDTH; 
        bgCanvas.height = BASEHEIGHT;
	}

    renderBg() {
        bgCtx.clearRect(0, 0, BASEWIDTH, BASEHEIGHT);
        this.bgSprites.forEach(s=>s.doRender(bgCtx));
    }
    update(delta) {
        if(activeTask) {
            if(activeTask.finished()) {
                activeTask = null;
            }
        } else if(tasklist.length > 0) {
            activeTask = tasklist.shift();
            if(TASK_BOARD_BELTS == activeTask.t) {
                // TODO: BELTS
                this.get(SPRITETYPE_BELT).forEach(belt => {
                    belt.addTask(activeTask);
                });
            } else if(TASK_BOARD_LASERS == activeTask.t) {
                // TODO: LASERS
                activeTask.f = true;
            } else {
                // assign task to its robot
                activeTask.b.tasks.push(activeTask);
            }
        }
        this.sprites.forEach(s=>s.update(delta));
    }
    render() {
        ctx.clearRect(0, 0, BASEWIDTH, BASEHEIGHT);
        this.sprites.sort((s1, s2) => (s1.p.y + s1.sortMod) - (s2.p.y + s2.sortMod));
        this.sprites.forEach(s=>s.doRender(ctx));
        if(this.crt) {
            beginPath(ctx);
            strokeStyle(ctx,'#000000' + randInt(70,70));
            for(let y = 1; y < BASEHEIGHT; y += 3) {
                moveTo(ctx,0,y);
                lineTo(ctx, BASEWIDTH, y);
            }
            stroke(ctx,);
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