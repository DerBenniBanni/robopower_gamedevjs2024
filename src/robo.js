const ROBOSTATE_OK = 1;
const ROBOSTATE_HOLE = 2;
const ROBO_HOLE_TIME = 1;
class Robo extends Sprite {
    constructor({x, y, imagePool, spriteDef}) {
        super({x,y});
        this.ps = this.p.clone(); // last savepoint
        //this.w = scale(32);
        //this.h = scale(32);
        this.speed = 80;
        this.rotdir = 1;
        this.rotspeed = 180;
        this.hScale = 0.7;
        this.tasks = [];
        this.currentTask = null;
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = scale(41);
        this.state = ROBOSTATE_OK;
        this.state_time = 0;
    }
    update(delta) {
        super.update(delta);
        this.state_time += delta;
        if(this.state == ROBOSTATE_OK) {
            game.get(SPRITETYPE_HOLE).forEach(h=>{
                if(abs(h.p.x - this.p.x) < scale(5) && abs(h.p.y - this.p.y) < scale(5)) {
                    this.state = ROBOSTATE_HOLE;
                    this.state_time = 0;
                    this.tasks = [];
                }
            });
        } else if(this.state == ROBOSTATE_HOLE) {
            if(this.state_time > ROBO_HOLE_TIME) {
                this.p = this.ps.clone();
                this.state = ROBOSTATE_OK;
                this.state_time = 0;
            }
        }

        if(!this.currentTask && this.tasks.length > 0) {
            this.currentTask = this.tasks.shift();
            this.currentTask.setTarget(this);
        }
        if(this.currentTask && this.currentTask.f) {
            this.currentTask = null;
        }
        if(!this.currentTask) {
            return;
        }
        let move = null;
        switch(this.currentTask.t) {
            case TASK_FORWARD:
                move = new P(scale(this.speed * delta),0);
                move = move.rotate(this.rot);
                this.p = this.p.addP(move);
            break;
            case TASK_BACKWARD:
                move = new P(scale(-this.speed * delta),0);
                move = move.rotate(this.rot);
                this.p = this.p.addP(move);
            break;
            case TASK_TURN_LEFT:
                this.rot -= toRad(this.rotspeed * delta);
                if(this.rot < 0) {
                    this.rot += PI*2
                }
            break;
            case TASK_TURN_RIGHT:
                this.rot += toRad(this.rotspeed * delta);
                if(this.rot > PI*2) {
                    this.rot -= PI*2
                }
            break;
        }
        this.currentTask.checkTarget(this);
    }
    renderStartExt(context) {
        if(this.state == ROBOSTATE_HOLE) {
            let scaling = (ROBO_HOLE_TIME - this.state_time) / ROBO_HOLE_TIME;
            context.scale(scaling, scaling);
            context.translate(0, scale(60) * (1-scaling));
            context.globalAlpha = scaling;
        }
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.rot) % 360);
        
        context.drawImage(this.imagePool.g(rotDeg).c,scale(-this.spriteDef.origin.x),scale(-this.spriteDef.origin.y));
    }
}