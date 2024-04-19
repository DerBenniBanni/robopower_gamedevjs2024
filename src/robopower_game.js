
const game = new Game();
game.resize();
const Music = {
    gameAudio:null,
    crashAudio:null,
    playCrash() {
        if(this.crashAudio) {
            this.crashAudio.currentTime = 0;
            this.crashAudio.play();
        }
    },
    play() {
        if(this.gameAudio) {
            this.gameAudio.currentTime = 0;
            this.gameAudio.play();
        }
    },
    stop() {
        if(this.gameAudio) {
            this.gameAudio.pause();
            this.gameAudio.currentTime = 0;
        }
    },
}
const loadMusic = (song, audioname, loop) => {
    let musicplayer = new CPlayer();
    musicplayer.init(song);
    while(musicplayer.generate() < 1) {}
    let wave = musicplayer.createWave();
    Music[audioname] = document.createElement("audio");
    Music[audioname].src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    Music[audioname].loop = loop;
}
loadMusic(song, 'gameAudio', true);

const createStackedSprite = function(stackedSpriteDefinition, stepsDegree) {
    stepsDegree = stepsDegree || 1;
    let imagePool = new ImagePool();
    let p = new P(scale(stackedSpriteDefinition.origin.x), scale(stackedSpriteDefinition.origin.y));
    let hScaleRobo = 0.7;
    for(let rotDeg = 0; rotDeg < 360; rotDeg += stepsDegree) {
        let rot = toRad(rotDeg);
        let spritebuffer = getSpriteBuffer(scale(stackedSpriteDefinition.w), scale(stackedSpriteDefinition.h));
        let context = spritebuffer.ctx;
        fill(context, '#ffffff');
        
        stackedSpriteDefinition.layers.forEach((data,layer) => {
            let y0 = layer ? p.y - scale(layer * 2) : p.y;
            let y1 = y0-scale(1);
            [y0,y1].forEach(y => {
                //translate context
                context.save();
                translateContext(context, p.x, y);
                context.scale(1, hScaleRobo);
                if(rot != 0) {
                    context.rotate(rot);
                }
                // render data
                data.forEach(d=>{
                    switch(d[0]) {
                        case CIRCLE:
                            if(d[4] != undefined) {
                                fill(context, stackedSpriteDefinition.colors[d[4]]);
                            }
                            context.beginPath();
                            context.arc(scale(d[1]), scale(d[2]), scale(d[3]), 0, 2 * Math.PI, false);
                            context.fill();
                        break;
                        case RECTANGLE:
                            if(d[5] != undefined) {
                                fill(context, stackedSpriteDefinition.colors[d[5]]);
                            }
                            context.fillRect(scale(d[1] - stackedSpriteDefinition.originLayers.x), scale(d[2]-stackedSpriteDefinition.originLayers.y), scale(d[3]), scale(d[4]));
                        break;
                    }
                })
                context.restore();
            });
        });
        imagePool.i(rotDeg, spritebuffer);
    }
    return imagePool;
}


const roboImagePool = createStackedSprite(roboDefinition);
const robo2ImagePool = createStackedSprite(robo2Definition);
const robo3ImagePool = createStackedSprite(robo3Definition);
const lazerTowerImagePool = createStackedSprite(lazerTowerDefinition, 90);
const lazerImagePool = createStackedSprite(lazerDefinition, 90);

game.run();

let robo1 = game.add(new Robo({x:340, y:380,imagePool:roboImagePool, spriteDef:roboDefinition}));
[
    TASK_FORWARD,TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
].forEach(t => robo1.tasks.push(new Task(t)));

let robo2 = game.add(new Robo({x:460, y:380,imagePool:robo2ImagePool, spriteDef:robo2Definition}));
[
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
].forEach(t => robo2.tasks.push(new Task(t)));


let robo3 = game.add(new Robo({x:340, y:460,imagePool:robo3ImagePool, spriteDef:robo3Definition}));
[
    TASK_TURN_LEFT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
].forEach(t => robo3.tasks.push(new Task(t)));

for(let x = 220; x < 900; x+=40) {
    for(let y = 220; y < 800; y+=40) {
        game.addBg(new Floor({x,y}));
    }
}

game.add(new Belt({x:380, y:660, d:BELT_UP}));
game.add(new Belt({x:380, y:620, d:BELT_UP, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:420, y:620, d:BELT_RIGHT}));
game.add(new Belt({x:460, y:620, d:BELT_RIGHT, t:BELT_TURN_LEFT}));
game.add(new Belt({x:460, y:580, d:BELT_UP}));

game.add(new LazerTower({x:580,y:580,d:BELT_RIGHT, imagePool:lazerTowerImagePool, spriteDef:lazerTowerDefinition}));
game.add(new Lazer({x:620,y:580,d:BELT_RIGHT, imagePool:lazerImagePool, spriteDef:lazerDefinition}));

game.add(new LazerTower({x:580,y:380,d:BELT_DOWN, imagePool:lazerTowerImagePool, spriteDef:lazerTowerDefinition}));
game.add(new Lazer({x:580,y:420,d:BELT_DOWN, imagePool:lazerImagePool, spriteDef:lazerDefinition}));

game.renderBg();

const getButtonAction = button => button.getAttribute('t')*1;

[...document.querySelectorAll('.btn')].forEach(btn => {
    btn.addEventListener('click',(ev)=>{
        let button = ev.target;
        let task = button.closest('.task');
        let classList = button.classList;
        if(classList.contains('execute')) {
            [...document.querySelectorAll('.task')].forEach(task => {
                let activeButton = task.querySelector('.btn.active');
                if(activeButton) {
                    robo1.tasks.push(new Task(getButtonAction(activeButton)));
                }
            });
        } else if(classList.contains('reset')) {

        } else if(classList.contains('audio')) {
            button.classList.toggle('active');
            if(button.classList.contains('active')) {
                Music.play();
            } else {
                Music.stop();
            }
        } else {
            let action = getButtonAction(button);
            if(!button.classList.contains('active')) {
                if([TASK_FORWARD, TASK_BACKWARD, TASK_TURN_LEFT, TASK_TURN_RIGHT].indexOf(action) > -1) {
                    [...task.querySelectorAll('.btn.active.move, .btn.active.powerdown')].forEach(b => b.classList.remove('active'));
                } else if(TASK_POWERDOWN == action) {
                    [...task.querySelectorAll('.btn.active.move, .btn.active.boost')].forEach(b => b.classList.remove('active'));
                } else if(TASK_EXTRAPOWER == action) {
                    [...task.querySelectorAll('.btn.active.powerdown')].forEach(b => b.classList.remove('active'));
                }
            }
            button.classList.toggle('active');
        }
    })
});
