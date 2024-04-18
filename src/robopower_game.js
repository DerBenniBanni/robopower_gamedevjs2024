
const game = new Game();
game.resize();

const roboImagePool = new ImagePool();
let p = new P(scale(roboDefinition.origin.x), scale(roboDefinition.origin.y));
let hScaleRobo = 0.7;
for(let rotDeg = 0; rotDeg < 360; rotDeg++) {
    let rot = toRad(rotDeg);
    let spritebuffer = getSpriteBuffer(scale(roboDefinition.w), scale(roboDefinition.h));
    let context = spritebuffer.ctx;
    fill(context, '#ffffff');
    
    roboDefinition.layers.forEach((data,layer) => {

        //translate context
        context.save();
        let y = layer ? p.y - layer * scale(2) : p.y;
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
                        fill(context, roboDefinition.colors[d[4]]);
                    }
                    context.beginPath();
                    context.arc(scale(d[1]), scale(d[2]), scale(d[3]), 0, 2 * Math.PI, false);
                    context.fill();
                break;
                case RECTANGLE:
                    if(d[5] != undefined) {
                        fill(context, roboDefinition.colors[d[5]]);
                    }
                    context.fillRect(scale(d[1] - roboDefinition.originLayers.x), scale(d[2]-roboDefinition.originLayers.y), scale(d[3]), scale(d[4]));
                break;
            }
        })
        context.restore();
    });
    roboImagePool.i(rotDeg, spritebuffer);
}


game.run();

let robo1 = game.add(new Robo({x:380, y:380}));
[TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_LEFT,TASK_BACKWARD,TASK_BACKWARD,TASK_TURN_RIGHT].forEach(t => robo1.tasks.push(new Task(t)));

let robo2 = game.add(new Robo({x:460, y:500}));
[TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_LEFT,TASK_TURN_LEFT,TASK_FORWARD,TASK_TURN_RIGHT,TASK_BACKWARD].forEach(t => robo2.tasks.push(new Task(t)));

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

game.renderBg();

const getButtonAction = button => button.getAttribute('t')*1;

[...document.querySelectorAll('.btn')].forEach(btn => {
    btn.addEventListener('click',(ev)=>{
        let target = ev.target;
        let classList = target.classList;
        if(classList.contains('execute')) {
            [...document.querySelectorAll('.task')].forEach(task => {
                let button = task.querySelector('.btn.active');
                if(button) {
                    robo1.tasks.push(new Task(getButtonAction(button)));
                }
            });
        } else if(classList.contains('reset')) {

        } else {
            let button = ev.target;
            let task = button.closest('.task');
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