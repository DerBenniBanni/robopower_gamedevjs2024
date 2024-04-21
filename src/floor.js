const FLOORSIZE = 40;
const FLOORSIZE_SCALED =FLOORSIZE;
const floorImagePool = new ImagePool();
const renderFloor = (lightness) => {
    lightness = lightness || 0;
    let color = new Color('777777');
    color.rand(3).randLight(10);
    if(lightness) {
        color.lightness(lightness);
    }
    let spritebuffer = getSpriteBuffer(FLOORSIZE, FLOORSIZE);
    let context = spritebuffer.ctx;
    let origin = FLOORSIZE_SCALED/2;
    fillStyle(context, color.rgba());
    fillRect(context,0, 0, FLOORSIZE_SCALED, FLOORSIZE_SCALED);
    for(let i = 0; i < 1000; i++) {
        fillStyle(context, color.clone().randLight(10).rgba());
        let sizeX = randInt(2,5);
        let sizeY = randInt(2,5);
        fillRect(context,randInt(0, FLOORSIZE_SCALED-sizeX), randInt(0, FLOORSIZE_SCALED-sizeY), sizeX, sizeY);
    } 
    fillStyle(context, '#fff3');
    fillRect(context,0, 0, 2, FLOORSIZE_SCALED);
    fillRect(context,2, 0, FLOORSIZE_SCALED, 2);
    fillStyle(context, '#0003');
    fillRect(context,FLOORSIZE_SCALED-2, 0, 2, FLOORSIZE_SCALED);
    fillRect(context,0, FLOORSIZE_SCALED-2, FLOORSIZE_SCALED, 2);
    return spritebuffer;
}
for(let i = 0; i < 51 ; i++) {
    floorImagePool.a(renderFloor());
}

class Floor extends Sprite {
    constructor({x,y}) {
        super({x,y});
        this.i = floorImagePool.r().c;
    }
    render(context) {
        let halfSize = FLOORSIZE_SCALED/2;
        context.drawImage(this.i, -halfSize, -halfSize);
    } 
}