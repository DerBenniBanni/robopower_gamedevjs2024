const BELT_RIGHT = 0;
const BELT_UP = PI*1.5;
const BELT_LEFT = PI;
const BELT_DOWN = PI/2;

const BELT_STRAIGHT = 1;
const BELT_TURN_LEFT = 2;
const BELT_TURN_RIGHT = 3;

class Belt extends Sprite {
    constructor({x, y, d, t}) {
        super({x,y});
        this.w = scale(40);
        this.h = scale(40);
        this.d = d; // direction
        this.t = t || BELT_STRAIGHT; // type
    }
    renderStartExt(context) {
        context.rotate(this.d);
    }
    render(context) {
        let originX = this.w/2;
        let originY = this.h/2;
        let beltpadding = scale(4);
        let color = new Color('333344');
        let arrowColor = color.clone().lightness(30);
        fill(context, color.rgba());
        context.lineWidth = scale(5);
        if(this.t == BELT_STRAIGHT) {
            context.fillRect(-originX, -originY+beltpadding, this.w, this.h-2*beltpadding);
            stroke(context, arrowColor.rgba());
            context.beginPath();
            let h2 = this.h/2 - beltpadding - scale(2);
            let offset = scale(5);
            context.moveTo(-offset, -h2);
            context.lineTo(offset, 0);
            context.lineTo(-offset, h2);
            context.stroke();
            context.lineWidth = scale(3);
            stroke(context,'#222');
            context.beginPath();
            context.moveTo(-originX, -originY+beltpadding);
            context.lineTo(originX, -originY+beltpadding);
            context.moveTo(-originX, originY-beltpadding);
            context.lineTo(originX, originY-beltpadding);
            context.stroke();
        } else if(this.t == BELT_TURN_LEFT) {
            context.beginPath();
            context.moveTo(-originX, -originY + beltpadding);
            context.arcTo(-originX + beltpadding, -originY + beltpadding, -originX + beltpadding, -originY, beltpadding);
            context.lineTo(originX - beltpadding, -originY);
            context.arcTo(originX - beltpadding, originY - beltpadding, -originX, originY - beltpadding, this.w -beltpadding);
            context.fill();
            stroke(context, arrowColor.rgba());
            let offset = scale(3);
            context.beginPath();
            context.moveTo(-originX + beltpadding - offset, -originY + beltpadding + offset);
            context.lineTo(-beltpadding, -beltpadding - offset*1.5);
            context.lineTo(beltpadding - offset, beltpadding + offset);
            context.stroke();

            context.lineWidth = scale(3);
            stroke(context,'#222');
            context.beginPath();
            context.moveTo(-originX, -originY + beltpadding);
            context.arcTo(-originX + beltpadding, -originY + beltpadding, -originX + beltpadding, -originY, beltpadding);
            context.moveTo(originX - beltpadding, -originY);
            context.arcTo(originX - beltpadding, originY - beltpadding, -originX, originY - beltpadding, this.w -beltpadding);
            context.stroke();
        } else if(this.t == BELT_TURN_RIGHT) {
            context.beginPath();
            context.moveTo(-originX, originY - beltpadding);
            context.arcTo(-originX + beltpadding, originY - beltpadding, -originX + beltpadding, originY, beltpadding);
            context.lineTo(originX - beltpadding, originY);
            context.arcTo(originX - beltpadding, -originY + beltpadding, -originX, -originY + beltpadding, this.w -beltpadding);
            context.fill();
            stroke(context, arrowColor.rgba());
            let offset = scale(3);
            context.beginPath();
            context.moveTo(-originX + beltpadding - offset, originY - beltpadding - offset);
            context.lineTo(-beltpadding, beltpadding + offset*1.5);
            context.lineTo(-beltpadding + offset, -beltpadding - offset);
            context.stroke();

            context.lineWidth = scale(3);
            stroke(context,'#222');
            context.beginPath();
            context.moveTo(-originX, originY - beltpadding);
            context.arcTo(-originX + beltpadding, originY - beltpadding, -originX + beltpadding, originY, beltpadding);
            context.moveTo(originX - beltpadding, originY);
            context.arcTo(originX - beltpadding, -originY + beltpadding, -originX, -originY + beltpadding, this.w -beltpadding);
            context.stroke();
        }
        
    }
}
