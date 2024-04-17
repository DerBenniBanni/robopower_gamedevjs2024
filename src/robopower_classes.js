const STATE_LOADING = 1;
const STATE_MENU = 2;
const STATE_GAME_RUNNING = 3;
const STATE_GAME_FINISHED = 4;

const BASEWIDTH = 1920;
const BASEHEIGHT = 911;

const setDim = (element, width, height) =>{
    element.width = width; 
    element.height = height;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
let renderScale = 1;
const scale = (value) => value * renderScale;
const unscale = (value) => value / renderScale;
const scaleI = (value) => Math.round(value * renderScale);
const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const toRad = (deg) => deg * (PI / 180);
const toDeg = (rad) => rad / (PI / 180);
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.round(rand(min, max));
// shortcuts for canvas fill-/strokeStyle
const stroke = (context, color) => context.strokeStyle = color;
const fill = (context, color) => context.fillStyle = color;



const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext("2d");
const bgCanvas = document.querySelector('#bgCanvas');
const bgCtx = bgCanvas.getContext("2d");
let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;

let lastUpdate = Date.now();
const getDelta = () => {
    let now = Date.now();
    let delta = clamp((now - lastUpdate) / 1000, 0, 0.1);
    lastUpdate = now;
    return delta;
}

class SpriteBuffer {
    constructor(w, h) {
        this.c = document.createElement("canvas");
        this.c.width = w;
        this.c.height = h;
        this.ctx = this.c.getContext('2d');
        this.colCircles = [];
    }
}
const getSpriteBuffer = (w,h) =>  new SpriteBuffer(scaleI(w),scaleI(h));
const translateContext = (context, x, y) => context.translate(scaleI(x),scale(y));

class ImagePool {
    constructor() {
        this.p = [];
        this.c = -1;
    }
    // add at the end
    a(i) {
        this.p.push(i);
    }
    // overwrite at index
    i(idx, i) {
        this.p[idx] = i;
    }
    // get image at index 
    g(idx) {
        if(idx !== undefined) {
            return this.p[idx];
        }
        this.c++;
        if(this.c >= this.p.length) {
            this.c = 0;
        }
        return this.p[this.c];
    }
    // get length of image-pool
    l() {
        return this.p.length;
    }
}

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
        this.sprites.sort((s1, s2) => (s1.p.y) - (s2.p.y));
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
}

class P {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new P(this.x, this.y);
    }
    add(x,y) {
        return new P(this.x+x, this.y+y);
    }
    addP(p) {
        return this.add(p.x, p.y);
    }
    diffP(p) {
        return new P(this.x-p.x, this.y-p.y);
    }
    div(divisor) {
        return new P(this.x/divisor, this.y/divisor);
    }
    rotate(angle) {
        return new P(this.x * cos(angle) - this.y * sin(angle), this.x * sin(angle) + this.y * cos(angle));
    }
    dist(p) {
        let x = this.x - p.x;
        let y = this.y - p.y;
        return Math.sqrt(x*x + y*y);
    }
}
const hexToInt = (h) => parseInt('0x' + h);
const intToHex = (d) => (d <=15 ? "0" : "") + Number(d).toString(16);

class Color {
    constructor(h) {
        h = h[0] == '#' ? h.substr(1) : h;
        this.r = hexToInt(h.substring(0,2));
        this.g = hexToInt(h.substring(2,4));
        this.b = hexToInt(h.substring(4,6));
        this.a = h.length == 8 ? hexToInt(h.substring(6,8)) : 255;
    }
    rgb() {
        return "#" + intToHex(this.r) + intToHex(this.g) + intToHex(this.b);
    }
    rgba() {
        return "#" + intToHex(this.r) + intToHex(this.g) + intToHex(this.b) + intToHex(this.a);
    }
    clone() {
        return new Color(this.rgba());
    }
    randLight(d) {
        return this.lightness(randInt(-d,d));
    }
    lightness(d) {
        d = Math.round(d);
        this.r = clamp(this.r + d, 0 , 255);
        this.g = clamp(this.g + d, 0 , 255);
        this.b = clamp(this.b + d, 0 , 255);
        return this;
    }
    rand(d) {
        this.r = clamp(this.r + randInt(-d,d), 0 , 255);
        this.g = clamp(this.g + randInt(-d,d), 0 , 255);
        this.b = clamp(this.b + randInt(-d,d), 0 , 255);
        return this;
    }
    fade(a) {
        a = Math.round(a);
        this.a = clamp(this.a - a, 0, 255);
    }
}

class Sprite {
    constructor({x,y}) {
        this.p = new P(scale(x), scale(y));
        this.game = null;
        this.colliders = [];
        this.ttl = Infinity;
        this.rot = 0;
        this.hScale = 1;
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
    }
    render(context) {}
    renderEnd(context) {
        context.restore();
    }
}




class Robo extends Sprite {
    constructor({x,y}) {
        super({x,y});
        //this.w = scale(32);
        //this.h = scale(32);
        this.speed = 80;
        this.rotdir = 1;
        this.rotspeed = 180;
        this.hScale = 0.7;
        this.tasks = [];
        this.currentTask = null;
    }
    update(delta) {
        super.update(delta);
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
            break;
            case TASK_TURN_RIGHT:
                this.rot += toRad(this.rotspeed * delta);
            break;
        }
        this.currentTask.checkTarget(this);
    }
    render(context) {
        let rotDeg = Math.floor(toDeg(this.rot) % 360);
        context.drawImage(roboImagePool.g(rotDeg).c,scale(-roboDefinition.origin.x),scale(-roboDefinition.origin.y));

    }
}


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
                if(Math.abs(robo.rot - this.r) < PI/30) {
                    robo.rot = this.r;
                    this.f = true;
                    return true;
                }
            break;
        }
        return false;
    }
}
class Floor extends Sprite {
    constructor({x,y}) {
        super({x,y});
        this.w = scale(40);
        this.h = scale(40);
        this.c = new Color('777777');
    }
    render(context) {
        let originX = this.w/2;
        let originY = this.h/2;
        fill(context, this.c.rgba());
        context.fillRect(-originX, -originY, this.w, this.h);
        for(let i = 0; i < 1000; i++) {
            fill(context, this.c.clone().randLight(10).rgba());
            let sizeX = randInt(2,5);
            let sizeY = randInt(2,5);
            context.fillRect(randInt(-originX, originX-sizeX), randInt(-originY, originY-sizeY), sizeX, sizeY);
        }
        fill(context, '#ffffff33');
        context.fillRect(-originX, -originY, 2, this.h);
        context.fillRect(-originX + 2, -originY, this.w, 2);
        fill(context, '#00000033');
        context.fillRect(originX-2, -originY, 2, this.h);
        context.fillRect(-originX, originY-2, this.w, 2);
    } 
}
