
const ROBOSTATE_OK = 1;
const ROBOSTATE_HOLE = 2;
const ROBO_HOLE_TIME = 1;

const ELECTRIC_PULSE_COST = 2;
const LASER_COST = 1;
const POWERDOWN_GAIN = 2; // at least one more than a laser would cost

class Robo extends Sprite {
    constructor({x, y, imagePool, spriteDef}) {
        super({x,y});
        this.t = SPRITETYPE_ROBO;
        this.ps = this.p.clone(); // last savepoint
        this.speed = 80;
        this.rotdir = 1;
        this.rotspeed = 180;
        this.hScale = 0.7;
        this.tasks = [];
        this.currentTask = null;
        this.imagePool = imagePool;
        this.spriteDef = spriteDef;
        this.sortMod = 41;
        this.state = ROBOSTATE_OK;
        this.state_time = 0;
        this.power = 6;
        this.isPlayer = false;
    }
    showPower() {
        this.isPlayer = true;
        powerDiv.innerText = this.power;
    }
    update(delta) {
        super.update(delta);
        this.state_time += delta;
        // Handle Hole-Collisions
        if(this.state == ROBOSTATE_OK) {
            game.get(SPRITETYPE_HOLE).forEach(h=>{
                if(abs(h.p.x - this.p.x) < 5 && abs(h.p.y - this.p.y) < 5) {
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

        if(this.power <= 0) {
            game.add(new Particle(rand(this.p.x-16, this.p.x+16), this.p.y-20, 3, 10, PARTICLE_SMOKE));
        }
        // handle Task-assignment
        if(!this.currentTask && this.tasks.length > 0) {
            this.currentTask = this.tasks.shift();
            if((this.power <= 0 && this.currentTask.t != TASK_POWERDOWN) || (this.power < ELECTRIC_PULSE_COST && this.currentTask.t == TASK_ELECTRIC_PULSE)) {
                this.currentTask = null;
                activeTask = null;
            } else {
                this.currentTask.setTarget();
            }
        }
        if(this.currentTask && this.currentTask.f) {
            this.currentTask = null;
        }
        if(!this.currentTask) {
            return;
        }
        switch(this.currentTask.t) {
            case TASK_FORWARD:
                this.updateMove(this.speed, delta);
            break;
            case TASK_BACKWARD:
                this.updateMove(-this.speed, delta);
            break;
            case TASK_TURN_LEFT:
                this.rot -= toRad(this.rotspeed * delta);
            break;
            case TASK_TURN_RIGHT:
                this.rot += toRad(this.rotspeed * delta);
            break;
        }
        if(this.rot < 0) {
            this.rot += PI*2
        }
        if(this.rot > PI*2) {
            this.rot -= PI*2
        }
    }
    updateMove(speed, delta) {
        let move = new P(speed * delta,0);
        move = move.rotate(this.rot);
        this.p = this.p.addP(move);
        this.currentTask.pushed.forEach(pushed=>pushed.p = pushed.p.addP(move));
    }
    renderStartExt(context) {
        if(this.state == ROBOSTATE_HOLE) {
            let scaling = (ROBO_HOLE_TIME - this.state_time) / ROBO_HOLE_TIME;
            context.scale(scaling, scaling);
            translateContext(context, 0, 60 * (1-scaling));
            context.globalAlpha = scaling;
        }
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.rot) % 360);
        if(rotDeg < 0) {
            rotDeg += 360;
        }
        let facingUp = abs(rotDeg-270) < 10;
        if(facingUp) {
            this.renderPulse(context);
        }
        context.drawImage(this.imagePool.g(rotDeg).c,-this.spriteDef.origin.x,-this.spriteDef.origin.y);
        if(!facingUp) {
            this.renderPulse(context);
        }
        if(this.currentTask && this.currentTask.t == TASK_POWERDOWN) {
            fillStyle(context, '#333');
            fillRect(context,-5,-15,10,20);
            fillRect(context,-2,-17,4,2);
            fillStyle(context, '#7f8');
            let h = 18 * (1- this.currentTask.timer / POWERDOWN_TIME);
            fillRect(context,-4, 4 - h, 8,h);
        }
        
    }
    renderPulse(context) {
        if(this.currentTask && this.currentTask.t == TASK_ELECTRIC_PULSE) {
            let move = new P(1,0);
            move = move.rotate(this.rot);
            let startPoint = move.multi(20);
            startPoint.y -=20;
            ['#08f','#00f','#fff'].forEach(color => {
                strokeStyle(context, color);
                beginPath(context);
                moveTo(context, startPoint.x, startPoint.y);
                let currentPoint = startPoint.clone();
                for(let i=0; i < 10; i++) {
                    let rv = 2+i;
                    let r = new P(rand(-rv,rv),rand(-rv,rv));
                    let p = currentPoint.clone().addP(r);
                    lineTo(context, p.x, p.y);
                    currentPoint = currentPoint.addP(move.multi(4));
                }
                stroke(context);
            });
        }
    }
}