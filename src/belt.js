const BELT_RIGHT = 0;
const BELT_UP = PI*1.5;
const BELT_LEFT = PI;
const BELT_DOWN = PI/2;

const BELT_STRAIGHT = 1;
const BELT_TURN_LEFT = 2;
const BELT_TURN_RIGHT = 3;

const BELT_ANIM_DURATION = 1;
const BELT_ANIM_HALF_DURATION = BELT_ANIM_DURATION / 2;
const BELT_ANIM_COLORDIFF = 100;

class Belt extends Sprite {
    constructor({x, y, d, t}) {
        super({x,y});
        this.t = SPRITETYPE_BELT;
        this.w = 40;
        this.h = 40;
        this.d = d; // direction
        this.b = t || BELT_STRAIGHT; // belt-type
        this.a = 0; // animation timer
        this.task = null;
        this.o = null; // object to move
        this.or = 0; // object-rotation, when the next belt is curved
    }
    addTask(task) {
        task.bo.push(this)
        this.a = 0;
        this.task = task;
        this.o = game.get(SPRITETYPE_ROBO).find(robo => samePosition(robo.p, this.p, 5));
        let move = new P(40,0);
        move = move.rotate(this.getDir());
        let p = this.p.addP(move);
        let nextBelt = game.get(SPRITETYPE_BELT).find(belt => samePosition(belt.p, p, 5));
        if(nextBelt) {
            this.or = nextBelt.getTurn();
        }
    }
    getTurn() {
        if(this.b == BELT_TURN_LEFT) {
            return -PI/2;
        }
        if(this.b == BELT_TURN_RIGHT) {
            return PI/2;
        }
        return 0;
    }
    getDir() {
        return this.d + this.getTurn();
    }
    update(delta) {
        if(this.task) {
            let direction = this.getDir();
            this.a += delta;
            if(this.o) {
                let move = new P((40 / BELT_ANIM_DURATION) * delta,0);
                move = move.rotate(direction);
                this.o.p = this.o.p.addP(move);
                if(this.a >= BELT_ANIM_HALF_DURATION) {
                    let rot = (this.or / BELT_ANIM_HALF_DURATION) * delta;
                    this.o.rot += rot;
                }
            }
            if(this.a >= BELT_ANIM_DURATION) {
                this.task = null;
                this.a = 0;
                if(this.o) {
                    let move = new P(40,0);
                    move = move.rotate(direction);
                    this.o.p = this.p.addP(move);
                }
            }
        }
    }
    renderStartExt(context) {
        context.rotate(this.d);
    }
    render(context) {
        let originX = this.w/2;
        let originY = this.h/2;
        let beltpadding = 4;
        let color = new Color('333344');
        let animColorModifier = (BELT_ANIM_HALF_DURATION - abs(BELT_ANIM_HALF_DURATION - this.a)) * BELT_ANIM_COLORDIFF;
        let arrowColor = color.clone().lightness(round(40 + animColorModifier));
        fillStyle(context, color.rgba());
        context.lineWidth = 5;
        if(this.b == BELT_STRAIGHT) {
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
        } else if(this.b == BELT_TURN_LEFT) {
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
        } else if(this.b == BELT_TURN_RIGHT) {
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
