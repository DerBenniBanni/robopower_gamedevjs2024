const createStackedSprite = function(stackedSpriteDefinition, stepsDegree) {
    stepsDegree = stepsDegree || 1;
    let imagePool = new ImagePool();
    let p = new P(stackedSpriteDefinition.origin.x, stackedSpriteDefinition.origin.y);
    let hScaleRobo = 0.7;
    for(let rotDeg = 0; rotDeg < 360; rotDeg += stepsDegree) {
        let rot = toRad(rotDeg);
        let spritebuffer = getSpriteBuffer(stackedSpriteDefinition.w, stackedSpriteDefinition.h);
        let context = spritebuffer.ctx;
        fillStyle(context, '#ffffff');
        
        stackedSpriteDefinition.layers.forEach((data,layer) => {
            let y0 = layer ? p.y - layer * 2 : p.y;
            let y1 = y0-1;
            [y0,y1].forEach(y => {
                //translate context
                context.save();
                translateContext(context, p.x, y);
                context.scale(1, hScaleRobo);
                if(rot != 0) {
                    context.rotate(rot);
                }
                // render data
                data.forEach(d=>{
                    switch(d[0]) {
                        case CIRCLE:
                            if(d[4] != undefined) {
                                fillStyle(context, stackedSpriteDefinition.colors[d[4]]);
                            }
                            beginPath(context);
                            context.arc(d[1], d[2], d[3], 0, 2 * Math.PI, false);
                            fill(context);
                        break;
                        case RECTANGLE:
                            if(d[5] != undefined) {
                                fillStyle(context, stackedSpriteDefinition.colors[d[5]]);
                            }
                            fillRect(context,d[1] - stackedSpriteDefinition.originLayers.x, d[2]-stackedSpriteDefinition.originLayers.y, d[3], d[4]);
                        break;
                    }
                })
                context.restore();
            });
        });
        imagePool.i(rotDeg, spritebuffer);
    }
    return imagePool;
}