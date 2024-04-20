const FLOORSIZE = 40;
const FLOORSIZE_SCALED = scale(FLOORSIZE);
const floorImagePool = new ImagePool();
for(let i = 0; i < 51 ; i++) {
    let color = new Color('777777');
    color.rand(3).randLight(10);
    let spritebuffer = getSpriteBuffer(FLOORSIZE, FLOORSIZE);
    let context = spritebuffer.ctx;
    let origin = FLOORSIZE_SCALED/2;
    fill(context, color.rgba());
    context.fillRect(0, 0, FLOORSIZE_SCALED, FLOORSIZE_SCALED);
    for(let i = 0; i < 1000; i++) {
        fill(context, color.clone().randLight(10).rgba());
        let sizeX = randInt(2,5);
        let sizeY = randInt(2,5);
        context.fillRect(randInt(0, FLOORSIZE_SCALED-sizeX), randInt(0, FLOORSIZE_SCALED-sizeY), sizeX, sizeY);
    } 
    fill(context, '#fff3');
    context.fillRect(0, 0, 2, FLOORSIZE_SCALED);
    context.fillRect(2, 0, FLOORSIZE_SCALED, 2);
    fill(context, '#0003');
    context.fillRect(FLOORSIZE_SCALED-2, 0, 2, FLOORSIZE_SCALED);
    context.fillRect(0, FLOORSIZE_SCALED-2, FLOORSIZE_SCALED, 2);
    floorImagePool.a(spritebuffer);
}

class Floor extends Sprite {
    constructor({x,y}) {
        super({x,y});
        this.i = floorImagePool.g().c;
    }
    render(context) {
        let halfSize = FLOORSIZE_SCALED/2;
        context.drawImage(this.i, -halfSize, -halfSize);
    } 
}