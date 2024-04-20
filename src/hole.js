const SPRITETYPE_HOLE = "hole";
const HOLEBORDER = scale(5);
const HOLESIZE = FLOORSIZE_SCALED + 2* HOLEBORDER;
const holeSpriteBuffer = getSpriteBuffer(HOLESIZE, HOLESIZE);
{
    let context = holeSpriteBuffer.ctx;
    let warn1 = '#000';
    let warn2 = '#ff0';
    let abyss = '#000';
    let abyssLines = new Color('44444444');
    fill(context, warn1)
    context.fillRect(0, 0, HOLESIZE, HOLESIZE);
    
    stroke(context, warn2);
    context.lineWidth = scale(3);
    context.beginPath();
    for(let x = -HOLESIZE; x < HOLESIZE; x+=scale(3)*2.5) {
        context.moveTo(x,HOLESIZE);
        context.lineTo(x+HOLESIZE, 0);
    }
    context.stroke();
    fill(context, abyss);
    context.fillRect(HOLEBORDER, HOLEBORDER, FLOORSIZE_SCALED, FLOORSIZE_SCALED);
    for(let len = FLOORSIZE_SCALED; len > 2; len -= 5) {
        let stepwidth = 5 * (len/FLOORSIZE_SCALED);
        for(let x= HOLEBORDER; x <=FLOORSIZE_SCALED+HOLEBORDER; x += stepwidth) {
            context.lineWidth = scale(1);
            stroke(context, abyssLines.randLight(2).rgba());
            context.beginPath();
            context.moveTo(x, HOLEBORDER);
            let middleDist = (FLOORSIZE_SCALED / 2) - (x - HOLEBORDER);
            let x2 = x + middleDist / 2;
            context.lineTo(x2, HOLEBORDER + rand(len-5,len));
            
            context.stroke();
        }
    }
}
class Hole extends Sprite {
    constructor({x, y, d, t}) {
        super({x,y});
        this.t = SPRITETYPE_HOLE;
    }

    render(context) {
        context.drawImage(holeSpriteBuffer.c, -HOLESIZE/2, -HOLESIZE/2);
    }
}