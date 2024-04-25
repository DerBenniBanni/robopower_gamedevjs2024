
const game = new Game();

loadMusic(song, 'gameAudio', true);
loadMusic(audioHit, 'hitAudio', false);
loadMusic(audioLaser, 'laserAudio', false);

const roboImagePool = createStackedSprite(roboDefinition);
const robo2ImagePool = createStackedSprite(robo2Definition);
const robo3ImagePool = createStackedSprite(robo3Definition);
const laserTowerImagePool = createStackedSprite(laserTowerDefinition);
const laserImagePool = createStackedSprite(laserDefinition, 90);


let robo1 = null;
let robo2 = null;
let robo3 = null;

let level = levels[0];
level.data.forEach((data, row) => {
    let y = STEPSIZE*2 + row * STEPSIZE - STEPSIZE/2;
    data.split('').forEach((d,col) =>{
        let x = STEPSIZE*2 + col * STEPSIZE - STEPSIZE/2;
        switch(d) {
            case LEVEL_PLAYER:
                robo1 = game.add(new Robo({x:x, y:y,imagePool:roboImagePool, spriteDef:roboDefinition}));
                robo1.showPower();
            break;
            case LEVEL_ROBO2:
                robo2 = game.add(new Robo({x:x, y:y,imagePool:robo2ImagePool, spriteDef:robo2Definition}));
            break;
            case LEVEL_ROBO3:
                robo3 = game.add(new Robo({x:x, y:y,imagePool:robo3ImagePool, spriteDef:robo3Definition}));
            break;
            case LEVEL_HOLE:
                game.add(new Hole({x:x, y:y}));
            break;
            case LEVEL_BELT_RIGHT:
                game.add(new Belt({x:x, y:y, d:BELT_RIGHT}));
            break;
            case LEVEL_BELT_RIGHT_CANNON:
                game.add(new Belt({x:x, y:y, d:BELT_RIGHT}));
                game.add(new LaserTower({x:x,y:y,d:BELT_UP, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
            case LEVEL_BELT_RIGHT_TURN_RIGHT:
                game.add(new Belt({x:x, y:y, d:BELT_RIGHT, t:BELT_TURN_RIGHT}));
            break;
            case LEVEL_BELT_RIGHT_TURN_LEFT:
                game.add(new Belt({x:x, y:y, d:BELT_RIGHT, t:BELT_TURN_LEFT}));
            break;
            case LEVEL_BELT_LEFT:
                game.add(new Belt({x:x, y:y, d:BELT_LEFT}));
            break;
            case LEVEL_BELT_LEFT_CANNON:
                game.add(new Belt({x:x, y:y, d:BELT_LEFT}));
                game.add(new LaserTower({x:x,y:y,d:BELT_DOWN, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
            case LEVEL_BELT_LEFT_TURN_RIGHT:
                game.add(new Belt({x:x, y:y, d:BELT_LEFT, t:BELT_TURN_RIGHT}));
            break;
            case LEVEL_BELT_LEFT_TURN_LEFT:
                game.add(new Belt({x:x, y:y, d:BELT_LEFT, t:BELT_TURN_LEFT}));
            break;
            case LEVEL_BELT_DOWN:
                game.add(new Belt({x:x, y:y, d:BELT_DOWN}));
            break;
            case LEVEL_BELT_DOWN_TURN_RIGHT:
                game.add(new Belt({x:x, y:y, d:BELT_DOWN, t:BELT_TURN_RIGHT}));
            break;
            case LEVEL_BELT_DOWN_TURN_LEFT:
                game.add(new Belt({x:x, y:y, d:BELT_DOWN, t:BELT_TURN_LEFT}));
            break;
            case LEVEL_BELT_UP:
                game.add(new Belt({x:x, y:y, d:BELT_UP}));
            break;
            case LEVEL_BELT_UP_TURN_RIGHT:
                game.add(new Belt({x:x, y:y, d:BELT_UP, t:BELT_TURN_RIGHT}));
            break;
            case LEVEL_BELT_UP_TURN_LEFT:
                game.add(new Belt({x:x, y:y, d:BELT_UP, t:BELT_TURN_LEFT}));
            break;
            
            case LEVEL_CANNON_LEFT:
                game.add(new LaserTower({x:x,y:y,d:BELT_LEFT, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
            case LEVEL_CANNON_RIGHT:
                game.add(new LaserTower({x:x,y:y,d:BELT_RIGHT, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
            case LEVEL_CANNON_UP:
                game.add(new LaserTower({x:x,y:y,d:BELT_UP, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
            case LEVEL_CANNON_DOWN:
                game.add(new LaserTower({x:x,y:y,d:BELT_DOWN, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));
            break;
        }

    });
})

game.run();
/*
robo1 = game.add(new Robo({x:340, y:660,imagePool:roboImagePool, spriteDef:roboDefinition}));
robo2 = game.add(new Robo({x:460, y:380,imagePool:robo2ImagePool, spriteDef:robo2Definition}));
robo3 = game.add(new Robo({x:340, y:460,imagePool:robo3ImagePool, spriteDef:robo3Definition}));
*/
for(let x = 60; x < 1900; x+=40) {
    for(let y = 60; y < 760; y+=40) {
        game.addBg(new Floor({x,y}));
    }
}

/*
game.add(new Belt({x:420, y:660, d:BELT_UP}));
game.add(new Belt({x:420, y:620, d:BELT_UP, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:460, y:620, d:BELT_RIGHT, t:BELT_TURN_LEFT}));
game.add(new Belt({x:460, y:580, d:BELT_UP}));

game.add(new Belt({x:420, y:380, d:BELT_UP}));
game.add(new Belt({x:420, y:340, d:BELT_UP, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:460, y:340, d:BELT_RIGHT}));
game.add(new Belt({x:500, y:340, d:BELT_RIGHT, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:500, y:380, d:BELT_DOWN}));
game.add(new Belt({x:500, y:420, d:BELT_DOWN, t:BELT_TURN_RIGHT}));
game.add(new Belt({x:460, y:420, d:BELT_LEFT}));
game.add(new Belt({x:420, y:420, d:BELT_LEFT, t:BELT_TURN_RIGHT}));


game.add(new LaserTower({x:580,y:660,d:BELT_LEFT, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));

game.add(new LaserTower({x:460,y:340,d:BELT_RIGHT, imagePool:laserTowerImagePool, spriteDef:laserTowerDefinition}));

game.add(new Hole({x:380, y:380}));
game.add(new Hole({x:620, y:420}));
game.add(new Hole({x:460, y:540}));
game.add(new Hole({x:500, y:540}));
game.add(new Hole({x:500, y:500}));
*/
game.renderBg();

const appendTask = (robot, taskIndex, taskAction, boost) => {
    let taskActionPower = (10 - taskAction) * (boost ? 8 : 4);
    let taskOrder = (taskIndex + 1) * 100 - taskActionPower;
    tasklist.push(new Task(taskAction, robot, boost, taskOrder));
}

// GUI Listeners
const getButtonAction = button => button.getAttribute('t')*1;
document.querySelector('#title').addEventListener("click", (ev) => {
    document.querySelector('#title').classList.add("hidden");
    document.querySelector('#program').classList.remove("hidden");
    document.querySelector('.btn.audio').click();
});
[...document.querySelectorAll('.btn')].forEach(btn => {
    btn.addEventListener('click',(ev)=>{
        let button = ev.target;
        let task = button.closest('.task');
        let classList = button.classList;
        if(classList.contains('execute')) {
            if(button.classList.contains('active')) {
                return;
            }
            button.classList.add('active');
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
            sortTasklist();
            insertBoardTasks();
        } else if(classList.contains('reset')) {
            [...document.querySelectorAll('.task .btn')].forEach((btn) => {
                btn.classList.remove('active');
                if(btn.classList.contains('powerdown')) {
                    btn.classList.add('active');
                }
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
                [...task.querySelectorAll('.btn.active')].forEach(b => b.classList.remove('active'));
            }
            button.classList.add('active');
        }
    })
});
