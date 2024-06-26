const removeRunningTaskMarker = () => {
    let runningTask = document.querySelector('.task.running');
    if(runningTask) {
        runningTask.classList.remove('running');
    }
}

const setRunningTaskMarker = (idx) => {
    removeRunningTaskMarker();
    let taskDivs = [...document.querySelectorAll('.task')];
    taskDivs[idx].classList.add('running');
}

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
            if(activeTask.finished(delta)) {
                activeTask = null;
            }
        } else if(tasklist.length > 0) {
            if(tasklist.length % 5 == 0) {
                setRunningTaskMarker(Math.floor((25-tasklist.length) / 5));
            }
            activeTask = tasklist.shift();
            if(TASK_BOARD_BELTS == activeTask.t) {
                game.get(SPRITETYPE_BELT).forEach(belt => {
                    belt.addTask(activeTask);
                });
            } else if(TASK_BOARD_LASERS == activeTask.t) {
                Music.play(Music.laserAudio);
                game.get(SPRITETYPE_LASERTOWER).forEach(lt => lt.fire());
            } else {
                // assign task to its robot
                activeTask.b.tasks.push(activeTask);
            }
        } else {
            document.querySelector('.btn.execute').classList.remove('active');
            removeRunningTaskMarker();
            let stillNotWon = game.get(SPRITETYPE_ROBO).filter(r=>!r.isPlayer).some(r=>r.power > 0);
            if(!stillNotWon) {
                Music.stop();
                document.querySelector('#won').classList.remove("hidden");
                document.querySelector('#program').classList.add("hidden");
            }
        }
        this.sprites.filter(s => s.ttl <= 0).forEach(s => s.onRemove());
        this.sprites = this.sprites.filter(s => s.ttl > 0);
        this.sprites.forEach(s=> {
            s.ttl -= delta;
            s.update(delta);
        });
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
        let spritetypes = Array.isArray(spritetype) ? spritetype : [spritetype]; 
        return this.sprites.filter(s => spritetypes.includes(s.t));
    }

}