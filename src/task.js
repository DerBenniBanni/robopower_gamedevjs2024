// movement constants
const TASK_FORWARD = 1;
const TASK_BACKWARD = 2;
const TASK_TURN_LEFT = 3;
const TASK_TURN_RIGHT = 4;
// special acions
const TASK_POWERDOWN = 5;
const TASK_ELECTRIC_PULSE = 6;
// board actions
const TASK_BOARD_BELTS = 7;
const TASK_BOARD_LASERS = 8;

const STEPSIZE = 40;
const cleanupToStepsize = (value) => round((value - STEPSIZE/2) / STEPSIZE) * STEPSIZE + STEPSIZE/2;
const cleanupPosition = (obj) => {
    obj.p.x = cleanupToStepsize(obj.p.x);
    obj.p.y = cleanupToStepsize(obj.p.y);
}
const cleanupRotation = (obj) => {
    obj.rot = round(obj.rot / (PI/2)) * PI/2;
}

const POWERDOWN_TIME = 1;
const ELECTRIC_PULSE_TIME = 2;

class Task {
    constructor(task, robo, modifier, sortorder) {
        this.t = task;
        this.b = robo; // the robot 
        this.bo = []; // board-objects with this task
        this.m = modifier; // the selected modifier (extrapower) 
        this.o = sortorder; // the selected modifier (extrapower) 
        this.f = false; // finished
        this.p = null; // targetPoint
        this.r = null; // targetRotation
        this.pushed = []; // pushed objects from robo-movement
        this.timer = 0;
    }
    setTarget() {
        let robo = this.b;
        cleanupPosition(robo);
        cleanupRotation(robo);
        switch(this.t) {
            case TASK_FORWARD:
                this.setMoveTarget(STEPSIZE);
            break;
            case TASK_BACKWARD:
                this.setMoveTarget(-STEPSIZE);
            break;
            case TASK_TURN_RIGHT:
                this.setTurnTarget(PI/2);
            break;
            case TASK_TURN_LEFT:
                this.setTurnTarget(-PI/2);
            break;
            case TASK_POWERDOWN:
                this.timer = POWERDOWN_TIME;
            break;
            case TASK_ELECTRIC_PULSE:
                this.timer = ELECTRIC_PULSE_TIME;
                let move = new P(1,0);
                move = move.rotate(robo.rot);
                let targetPoint = move.multi(40).addP(robo.p);
                let target = game.get(SPRITETYPE_ROBO).find(t=>samePosition(t.p, targetPoint, 10));
                if(target) {
                    target.power = 0;
                }
            break;
        }
    }
    setMoveTarget(step) {
        let robo = this.b;
        let target = new P(step,0);
        target = target.rotate(robo.rot);
        this.p = robo.p.addP(target);
        if(this.p.x < STEPSIZE || this.p.x > BASEWIDTH - STEPSIZE || this.p.y < STEPSIZE || this.p.y > BASEHEIGHT - STEPSIZE) {
            this.f = true;
            return;
        }
        let p2 = this.p.addP(target);
        cleanupPosition(this);
        let blocked = game.get([SPRITETYPE_LASERTOWER]).filter(o => samePosition(o.p, this.p, 5));
        let blockedSecondField = game.get([SPRITETYPE_ROBO, SPRITETYPE_LASERTOWER]).filter(o => samePosition(o.p, p2, 5));
        this.pushed = game.get([SPRITETYPE_ROBO]).filter(o => samePosition(o.p, this.p, 5));
        if(blocked.length > 0 || (this.pushed.length > 0 && blockedSecondField.length > 0)) {
            this.f = true;
        }
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
    
    finished(delta) {
        if(!this.b) {
            switch(this.t) {
                case TASK_BOARD_BELTS:
                    // check all belt tasks
                    return this.bo.filter(o => o.task).length == 0;
                case TASK_BOARD_LASERS:
                    // check all lasers
                    return game.get(SPRITETYPE_LASER).length == 0;
            }
        }
        if(this.f) {
            return true;
        }
        let robo = this.b;
        switch(this.t) {
            case TASK_FORWARD:
            case TASK_BACKWARD:
                if(robo.p.dist(this.p) < 2) {
                    robo.p.x = this.p.x;
                    robo.p.y = this.p.y;
                    this.f = true;
                    this.pushed.forEach(pushed => cleanupPosition(pushed));
                } 
            break;
            case TASK_TURN_RIGHT:
            case TASK_TURN_LEFT:
                if(abs(robo.rot - this.r) < PI/30) {
                    robo.rot = this.r;
                    this.f = true;
                }
            break;
            case TASK_POWERDOWN:
                this.timer -= delta;
                this.f = this.timer < 0;
                if(this.f) {
                    robo.power = clamp(robo.power+POWERDOWN_GAIN, 0, 9);
                    robo.showPower();
                    activeTask = null;
                }
            break;
            case TASK_ELECTRIC_PULSE:
                this.timer -= delta;
                this.f = this.timer < 0;
                if(this.f) {
                    robo.power = clamp(robo.power-ELECTRIC_PULSE_COST, 0, 9);
                    robo.showPower();
                    activeTask = null;
                }
            break;
        }
        return this.f;
    }
}

// the tasklist to do in the current round
const tasklist = [];
let activeTask = null;

const sortTasklist = () => {
    tasklist.sort((task1, task2) => task1.o - task2.o);
}

const insertBoardTasks = () => {
    let tasks = [...tasklist];
    tasklist.length = 0;
    let robos = game.get(SPRITETYPE_ROBO).length;
    let lastOrder = -1;
    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        lastOrder = task.o;
        if(i > 0 && i % robos == 0) {
            addBoardTasks(lastOrder);
        }
        tasklist.push(task);
    }
    addBoardTasks(lastOrder);
}
const addBoardTasks = (lastOrder) => {
    tasklist.push(new Task(TASK_BOARD_BELTS, null, null, lastOrder + 1));
    tasklist.push(new Task(TASK_BOARD_LASERS, null, null, lastOrder + 2));
}