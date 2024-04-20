const TASK_FORWARD = 1;
const TASK_BACKWARD = 2;
const TASK_TURN_LEFT = 3;
const TASK_TURN_RIGHT = 4;
const TASK_POWERDOWN = 5;
const TASK_EXTRAPOWER = 6;
class Task {
    constructor(task, data) {
        this.t = task;
        this.d = data;
        this.f = false; // finished
        this.p = null; // targetPoint
        this.r = null; // targetRotation
    }
    setTarget(robo) {
        let step = scale(40);
        switch(this.t) {
            case TASK_FORWARD:
                this.setMoveTarget(robo, step);
            break;
            case TASK_BACKWARD:
                this.setMoveTarget(robo, -step);
            break;
            case TASK_TURN_RIGHT:
                this.setTurnTarget(robo, PI/2);
            break;
            case TASK_TURN_LEFT:
                this.setTurnTarget(robo, -PI/2);
            break;
        }
    }
    setMoveTarget(robo, step) {
        let target = new P(step,0);
        target = target.rotate(robo.rot);
        this.p = robo.p.addP(target);
        this.p.x = Math.round(this.p.x / step) * step - step/2;
        this.p.y = Math.round(this.p.y / step) * step - step/2;
    }
    setTurnTarget(robo, rotDiff) {
        this.r = Math.round((robo.rot + rotDiff) / (PI/2)) * (PI/2);
        if(this.r < 0) {
            this.r += PI * 2;
        }
        if(this.r > PI * 2) {
            this.r -= PI * 2;
        }
    }
    checkTarget(robo) {
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