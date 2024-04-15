const game = new Game();
game.run();
game.resize();
let robo1 = game.add(new Robo({x:200, y:200}));
[TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_LEFT,TASK_BACKWARD,TASK_BACKWARD,TASK_TURN_RIGHT].forEach(t => robo1.tasks.push(new Task(t)));

let robo2 = game.add(new Robo({x:280, y:240}));
[TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_RIGHT,TASK_FORWARD,TASK_FORWARD,TASK_TURN_LEFT,TASK_TURN_LEFT,TASK_FORWARD,TASK_TURN_RIGHT,TASK_BACKWARD].forEach(t => robo2.tasks.push(new Task(t)));

for(let x = 80; x < 500; x+=40) {
    for(let y = 80; y < 500; y+=40) {
        game.addBg(new Floor({x,y}));
    }
}

game.renderBg();