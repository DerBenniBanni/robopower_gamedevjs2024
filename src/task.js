// movement constants
const TASK_FORWARD = 1;
const TASK_BACKWARD = 2;
const TASK_TURN_LEFT = 3;
const TASK_TURN_RIGHT = 4;
// special acions
const TASK_POWERDOWN = 5;
const TASK_MODIFIER_EXTRAPOWER = 6;
// board actions
const TASK_BOARD_BELTS = 7;
const TASK_BOARD_LASERS = 8;

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
    }
    setTarget() {
        let robo = this.b;
        let step = 40;
        robo.p.x = round(robo.p.x / step) * step - step/2;
        robo.p.y = round(robo.p.y / step) * step - step/2;
        robo.rot = round(robo.rot / (PI/2)) * PI/2;
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
    finished() {
        if(!this.b) {
            if(this.bo.length == 0) {
                // no objects, no todo
                return true;
            }
            // check all assigned objects, if any of them has a remaining task
            return this.bo.filter(o => o.task).length == 0;
        }
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