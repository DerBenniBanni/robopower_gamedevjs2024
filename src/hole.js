
const HOLEBORDER = 5;
const HOLESIZE = FLOORSIZE_SCALED + 2* HOLEBORDER;

const createHoleImage = (top,right,bottom,left) => {
    let topHole = top == "1";
    let rightHole = right == "1";
    let bottomHole = bottom == "1";
    let leftHole = left == "1";

    let holeSpriteBuffer = getSpriteBuffer(HOLESIZE, HOLESIZE);
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
    if(!topHole) {
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
    
    if(topHole) {
        context.clearRect(0, 0, HOLESIZE, HOLEBORDER);
    }
    if(rightHole) {
        context.clearRect(HOLESIZE - HOLEBORDER, 0, HOLEBORDER, HOLESIZE);
    }
    if(bottomHole) {
        context.clearRect(0, HOLESIZE - HOLEBORDER, HOLESIZE, HOLEBORDER);
    }
    if(leftHole) {
        context.clearRect(0,0,HOLEBORDER, HOLESIZE);
    }
    return holeSpriteBuffer;
}

const holeImagePool  = new ImagePool();
['0000','0001','0010','0011','0100','0101','0110','0111','1000','1001','1010','1011','1100','1101','1110','1111'].forEach(variant => {
    let [top,right,left,bottom] = variant.split("");
    holeImagePool.i(variant, createHoleImage(top,right,left,bottom));
});

const isThereAnotherHole = (p) => {
    return game.get(SPRITETYPE_HOLE).some(h => samePosition(h.p, p, 10)) ? '1' : '0';
}
const getHoleVariant = (p) => {
    let variant = '';
    variant += isThereAnotherHole(p.add(0, -STEPSIZE)); // top
    variant += isThereAnotherHole(p.add(STEPSIZE, 0)); // right
    variant += isThereAnotherHole(p.add(0, STEPSIZE)); // bottom
    variant += isThereAnotherHole(p.add(-STEPSIZE, 0)); // left
    return variant;
}

class Hole extends Sprite {
    constructor({x, y, d, t}) {
        super({x,y});
        this.t = SPRITETYPE_HOLE;
        this.spritebuffer = null;
        this.sortMod = -40;
    }

    render(context) {
        if(!this.spritebuffer) {
            let variant = getHoleVariant(this.p);
            this.spritebuffer = holeImagePool.g(variant);
        }
        context.drawImage(this.spritebuffer.c, -HOLESIZE/2, -HOLESIZE/2);
    }
}