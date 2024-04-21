// movement constants
const TASK_FORWARD = 1;
const TASK_BACKWARD = 2;
const TASK_TURN_LEFT = 3;
const TASK_TURN_RIGHT = 4;
// special acions
const TASK_POWERDOWN = 5;
const TASK_MODIFIER_EXTRAPOWER = 6;

class Task {
    constructor(task, robo, modifier, sortorder) {
        this.t = task;
        this.b = robo; // the robot 
        this.m = modifier; // the selected modifier (extrapower) 
        this.o = sortorder; // the selected modifier (extrapower) 
        this.f = false; // finished
        this.p = null; // targetPoint
        this.r = null; // targetRotation
    }
    setTarget() {
        let robo = this.b;
        let step = 40;
        switch(this.t) {
            case TASK_FORWARD:
                this.setMoveTarget(step);
            break;
            case TASK_BACKWARD:
                this.setMoveTarget(-step);
            break;
            case TASK_TURN_RIGHT:
                this.setTurnTarget(PI/2);
            break;
            case TASK_TURN_LEFT:
                this.setTurnTarget(-PI/2);
            break;
        }
    }
    setMoveTarget(step) {
        let robo = this.b;
        let target = new P(step,0);
        target = target.rotate(robo.rot);
        this.p = robo.p.addP(target);
        this.p.x = Math.round(this.p.x / step) * step - step/2;
        this.p.y = Math.round(this.p.y / step) * step - step/2;
    }
    setTurnTarget(rotDiff) {
        let robo = this.b;
        this.r = Math.round((robo.rot + rotDiff) / (PI/2)) * (PI/2);
        if(this.r < 0) {
            this.r += PI * 2;
        }
        if(this.r > PI * 2) {
            this.r -= PI * 2;
        }
    }
    checkTarget() {
        let robo = this.b;
        switch(this.t) {
            case TASK_FORWARD:
            case TASK_BACKWARD:
                if(robo.p.dist(this.p) < 2) {
                    robo.p.x = this.p.x;
                    robo.p.y = this.p.y;
                    this.f = true;
                    return true;
                } 
            break;
            case TASK_TURN_RIGHT:
            case TASK_TURN_LEFT:
                if(abs(robo.rot - this.r) < PI/30) {
                    robo.rot = this.r;
                    this.f = true;
                    return true;
                }
            break;
        }
        return false;
    }
}

// the tasklist to do in the current round
const tasklist = [];
let activeTask = null;

const sortTasklist = () => {
    tasklist.sort((task1, task2) => task1.o - task2.o);
}