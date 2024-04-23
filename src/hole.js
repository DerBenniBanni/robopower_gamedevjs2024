
const HOLEBORDER = 5;
const HOLESIZE = FLOORSIZE_SCALED + 2* HOLEBORDER;
const holeSpriteBuffer = getSpriteBuffer(HOLESIZE, HOLESIZE);
{
    let context = holeSpriteBuffer.ctx;
    let warn1 = '#000';
    let warn2 = '#ff0';
    let abyss = '#000';
    let abyssLines = new Color('44444444');
    fillStyle(context, warn1)
    fillRect(context,0, 0, HOLESIZE, HOLESIZE);
    
    strokeStyle(context, warn2);
    context.lineWidth = 3;
    beginPath(context);
    for(let x = -HOLESIZE; x < HOLESIZE; x+=3*2.5) {
        moveTo(context,x,HOLESIZE);
        lineTo(context,x+HOLESIZE, 0);
    }
    stroke(context,);
    fillStyle(context, abyss);
    fillRect(context,HOLEBORDER, HOLEBORDER, FLOORSIZE_SCALED, FLOORSIZE_SCALED);
    for(let len = FLOORSIZE_SCALED; len > 2; len -= 5) {
        let stepwidth = 5 * (len/FLOORSIZE_SCALED);
        for(let x= HOLEBORDER; x <=FLOORSIZE_SCALED+HOLEBORDER; x += stepwidth) {
            context.lineWidth = 1;
            strokeStyle(context, abyssLines.randLight(2).rgba());
            beginPath(context);
            moveTo(context,x, HOLEBORDER);
            let middleDist = (FLOORSIZE_SCALED / 2) - (x - HOLEBORDER);
            let x2 = x + middleDist / 2;
            lineTo(context,x2, HOLEBORDER + rand(len-5,len));
            
            stroke(context,);
        }
    }
}
class Hole extends Sprite {
    constructor({x, y, d, t}) {
        super({x,y});
        this.t = SPRITETYPE_HOLE;
        
        this.sortMod = -40;
    }

    render(context) {
        context.drawImage(holeSpriteBuffer.c, -HOLESIZE/2, -HOLESIZE/2);
    }
}