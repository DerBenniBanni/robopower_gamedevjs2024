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
        this.w = 40;
        this.h = 40;
        this.d = d; // direction
        this.t = t || BELT_STRAIGHT; // type
    }
    renderStartExt(context) {
        context.rotate(this.d);
    }
    render(context) {
        let originX = this.w/2;
        let originY = this.h/2;
        let beltpadding = 4;
        let color = new Color('333344');
        let arrowColor = color.clone().lightness(30);
        fillStyle(context, color.rgba());
        context.lineWidth = 5;
        if(this.t == BELT_STRAIGHT) {
            fillRect(context,-originX, -originY+beltpadding, this.w, this.h-2*beltpadding);
            strokeStyle(context, arrowColor.rgba());
            beginPath(context);
            let h2 = this.h/2 - beltpadding - 2;
            let offset = 5;
            moveTo(context,-offset, -h2);
            lineTo(context,offset, 0);
            lineTo(context,-offset, h2);
            stroke(context,);
            context.lineWidth = 3;
            strokeStyle(context,'#222');
            beginPath(context);
            moveTo(context,-originX, -originY+beltpadding);
            lineTo(context,originX, -originY+beltpadding);
            moveTo(context,-originX, originY-beltpadding);
            lineTo(context,originX, originY-beltpadding);
            stroke(context,);
        } else if(this.t == BELT_TURN_LEFT) {
            beginPath(context);
            moveTo(context,-originX, -originY + beltpadding);
            context.arcTo(-originX + beltpadding, -originY + beltpadding, -originX + beltpadding, -originY, beltpadding);
            lineTo(context,originX - beltpadding, -originY);
            context.arcTo(originX - beltpadding, originY - beltpadding, -originX, originY - beltpadding, this.w -beltpadding);
            fill(context);
            strokeStyle(context, arrowColor.rgba());
            let offset = 3;
            beginPath(context);
            moveTo(context,-originX + beltpadding - offset, -originY + beltpadding + offset);
            lineTo(context,-beltpadding, -beltpadding - offset*1.5);
            lineTo(context,beltpadding - offset, beltpadding + offset);
            stroke(context,);

            context.lineWidth = 3;
            strokeStyle(context,'#222');
            beginPath(context);
            moveTo(context,-originX, -originY + beltpadding);
            context.arcTo(-originX + beltpadding, -originY + beltpadding, -originX + beltpadding, -originY, beltpadding);
            moveTo(context,originX - beltpadding, -originY);
            context.arcTo(originX - beltpadding, originY - beltpadding, -originX, originY - beltpadding, this.w -beltpadding);
            stroke(context,);
        } else if(this.t == BELT_TURN_RIGHT) {
            beginPath(context);
            moveTo(context,-originX, originY - beltpadding);
            context.arcTo(-originX + beltpadding, originY - beltpadding, -originX + beltpadding, originY, beltpadding);
            lineTo(context,originX - beltpadding, originY);
            context.arcTo(originX - beltpadding, -originY + beltpadding, -originX, -originY + beltpadding, this.w -beltpadding);
            fill(context);
            strokeStyle(context, arrowColor.rgba());
            let offset = 3;
            beginPath(context);
            moveTo(context,-originX + beltpadding - offset, originY - beltpadding - offset);
            lineTo(context,-beltpadding, beltpadding + offset*1.5);
            lineTo(context,-beltpadding + offset, -beltpadding - offset);
            stroke(context,);

            context.lineWidth = 3;
            strokeStyle(context,'#222');
            beginPath(context);
            moveTo(context,-originX, originY - beltpadding);
            context.arcTo(-originX + beltpadding, originY - beltpadding, -originX + beltpadding, originY, beltpadding);
            moveTo(context,originX - beltpadding, originY);
            context.arcTo(originX - beltpadding, -originY + beltpadding, -originX, -originY + beltpadding, this.w -beltpadding);
            stroke(context,);
        }
        
    }
}
