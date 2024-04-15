const STATE_LOADING = 1;
const STATE_MENU = 2;
const STATE_GAME_RUNNING = 3;
const STATE_GAME_FINISHED = 4;

const BASEWIDTH = 1920;
const BASEHEIGHT = 1080;

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


class Game {
    constructor() {
        this.sprites = [];
        this.state = STATE_LOADING;
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
    }
    update(delta) {
        this.sprites.forEach(s=>s.update(delta));
    }
    render() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        this.sprites.forEach(s=>s.doRender(ctx));
    }

    add(sprite) {
        sprite.game = this;
        this.sprites.push(sprite);
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
}

class Sprite {
    constructor({x,y}) {
        this.p = new P(scale(x), scale(y));
        this.game = null;
        this.colliders = [];
        this.ttl = Infinity;
        this.rot = 0;
    }
    update(delta) {}
    doRender(context) {
        this.renderStart(context);
        this.render(context);
        this.renderEnd(context);
    }
    renderStart(context, layer) {
        context.save();
        context.translate(this.p.x, this.p.y - (layer * 2 || 0));
        context.scale(1, 0.7);
        if(this.rot != 0) {
            context.rotate(this.rot);
        }
    }
    render(context) {}
    renderEnd(context) {
        context.restore();
    }
}

class Robo extends Sprite {
    constructor({x,y}) {
        super({x,y});
        this.w = 32;
        this.h = 32;
        this.speed = 30;
        this.rotdir = 1;
        this.rotspeed = 90;
    }
    update(delta) {
        super.update(delta);
        if(Math.abs(this.rot) > PI) {
            this.rotdir *= -1;
        }
        this.rot += toRad(this.rotspeed * delta) * this.rotdir;
        let move = new P(scale(this.speed * delta),0);
        move = move.rotate(this.rot);
        this.p = this.p.addP(move);
    }
    doRender(context) {
        this.render(context);
    }
    render(context) {
        fill(context, '#ffffff');
        let originX = this.w/2;
        let originY = this.h/2;
        
        let definition = roboDefinition;
        definition.layers.forEach((data,layer) => {
            this.renderStart(context, layer);
            data.forEach(d=>{
                switch(d[0]) {
                    case RECTANGLE:
                        if(d[5] != undefined) {
                            fill(context, definition.colors[d[5]]);
                        }
                        context.fillRect(d[1]-originX, d[2]-originY, d[3], d[4]);
                    break;
                }
            })
            this.renderEnd(context);
        });
    }
}

const RECTANGLE = 0;
const roboDefinition = {
    colors: [
        '#666666', // 0 track
        '#aaaaaa', // 1 body
        '#aaaaff', // 2 screen
        '#6666ff', // 3 face
        '#667788', // 4 arms
        '#999999', // 5 body shade
    ],
    layers: [
        // tracks
        [
            [RECTANGLE, 4, 2, 24, 8, 0],
            [RECTANGLE, 4, 22, 24, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 0]
        ],
        // body
        [
            [RECTANGLE, 1, 1, 30, 30, 1]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 5]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 10, -5, 28, 4, 4], // left arm
            [RECTANGLE, 10, 33, 28, 4, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 7, -6, 28, 6, 4], // left arm
            [RECTANGLE, 7, 32, 28, 6, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 7, -6, 28, 6, 4], // left arm
            [RECTANGLE, 7, 32, 28, 6, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3],
            [RECTANGLE, 10, -5, 28, 4, 4], // left arm
            [RECTANGLE, 10, 33, 28, 4, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3], 
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3], 
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1]
        ],
        [
            [RECTANGLE, 1, 1, 30, 30, 5]
        ],
        // Antenna
        [
            [RECTANGLE, 15, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 14, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 13, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 12, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 11, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 10, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 8, 13, 6, 6, 1]
        ],
        [
            [RECTANGLE, 7, 13, 6, 6, 1]
        ],
    ]
}