
const game = new Game();

loadMusic(song, 'gameAudio', true);

const roboImagePool = createStackedSprite(roboDefinition);
const robo2ImagePool = createStackedSprite(robo2Definition);
const robo3ImagePool = createStackedSprite(robo3Definition);
const laserTowerImagePool = createStackedSprite(laserTowerDefinition, 90);
const laserImagePool = createStackedSprite(laserDefinition, 90);

game.run();

let robo1 = game.add(new Robo({x:220, y:300,imagePool:roboImagePool, spriteDef:roboDefinition}));
/*[
    TASK_FORWARD,TASK_FORWARD,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
    TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,
].forEach(t => robo1.tasks.push(new Task(t)));
*/
let robo2 = game.add(new Robo({x:460, y:380,imagePool:robo2ImagePool, spriteDef:robo2Definition}));
/*[
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
].forEach(t => robo2.tasks.push(new Task(t)));
*/

let robo3 = game.add(new Robo({x:340, y:460,imagePool:robo3ImagePool, spriteDef:robo3Definition}));
/*[
    TASK_TURN_LEFT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
    TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,
].forEach(t => robo3.tasks.push(new Task(t)));
*/
for(let x = 60; x < 1900; x+=40) {
    for(let y = 60; y < 760; y+=40) {
        game.addBg(new Floor({x,y}));
    }
}

game.add(new Belt({x:380, y:660, d:BELT_UP}));
game.add(new Belt({x:380, y:620, d:BELT_UP, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:420, y:620, d:BELT_RIGHT}));
game.add(new Belt({x:460, y:620, d:BELT_RIGHT, t:BELT_TURN_LEFT}));
game.add(new Belt({x:460, y:580, d:BELT_UP}));

game.add(new LaserTower({x:580,y:580,d:BELT_RIGHT, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
game.add(new Laser({x:620,y:580,d:BELT_RIGHT, imagePool:laserImagePool, spriteDef:laserDefinition}));

game.add(new LaserTower({x:580,y:380,d:BELT_DOWN, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
game.add(new Laser({x:580,y:420,d:BELT_DOWN, imagePool:laserImagePool, spriteDef:laserDefinition}));

game.add(new Hole({x:380, y:380}));
game.add(new Hole({x:620, y:420}));
game.add(new Hole({x:460, y:540}));
game.renderBg();

const appendTask = (robot, taskIndex, taskAction, boost) => {
    let taskActionPower = (10 - taskAction) * (boost ? 8 : 4);
    let taskOrder = (taskIndex + 1) * 100 - taskActionPower;
    tasklist.push(new Task(taskAction, robot, boost, taskOrder));
}

// GUI Listeners
const getButtonAction = button => button.getAttribute('t')*1;

[...document.querySelectorAll('.btn')].forEach(btn => {
    btn.addEventListener('click',(ev)=>{
        let button = ev.target;
        let task = button.closest('.task');
        let classList = button.classList;
        if(classList.contains('execute')) {
            [...document.querySelectorAll('.task')].forEach((task, taskIndex) => {
                let extraPowerButton = task.querySelector('.btn.active.boost');
                let activeButton = task.querySelector('.btn.active:not(.boost)');
                
                if(activeButton) {
                    let boost = extraPowerButton ? true : false;
                    let taskAction = getButtonAction(activeButton);
                    appendTask(robo1, taskIndex, taskAction, boost);
                }
                // Dummy Robos, TODO: make intelligent moves...
                appendTask(robo2, taskIndex, randInt(1,4), false);
                appendTask(robo3, taskIndex, randInt(1,4), false);
            });
        } else if(classList.contains('reset')) {
            [...document.querySelectorAll('.task .btn')].forEach((btn) => {
                btn.classList.remove('active');
            });
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
                } else if(TASK_MODIFIER_EXTRAPOWER == action) {
                    [...task.querySelectorAll('.btn.active.powerdown')].forEach(b => b.classList.remove('active'));
                }
            }
            button.classList.toggle('active');
        }
    })
});
