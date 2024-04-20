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
const abs = (value) => Math.abs(value);
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

const translateContext = (context, x, y) => context.translate(scaleI(x),scale(y));