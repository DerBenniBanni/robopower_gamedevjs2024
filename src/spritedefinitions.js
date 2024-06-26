const RECTANGLE = 0;
const CIRCLE = 1;
const laserTowerDefinition = {
    w:64,
    h:80,
    origin:{x:32, y:65},
    originLayers:{x:16, y:16},
    colors: [
        '#666', // 0 grey
        '#444', // 1 grey darker
        '#ff0', // 2 yellow
        '#bb0', // 3 yellow darker
        '#000', // 4 black
        '#f00', // 5 red
    ],    
    layers: [
        // base
        
        [
            [CIRCLE, 0, 0, 12, 1],
        ],
        [
            [CIRCLE, 0, 0, 11, 0],
        ],
        [
            [CIRCLE, 0, 0, 9, 1],
        ],
        [
            [CIRCLE, 0, 0, 7, 0],
        ],
        /*
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 1, 1, 30, 30, 0],
            [RECTANGLE, 0, 0, 2, 2, 1],
            [RECTANGLE, 30, 0, 2, 2, 1],
            [RECTANGLE, 30, 30, 2, 2, 1],
            [RECTANGLE, 0, 30, 2, 2, 1]
        ],
        [
            [RECTANGLE, 2, 2, 28, 28, 0],
            [RECTANGLE, 1, 1, 2, 2, 1],
            [RECTANGLE, 29, 1, 2, 2, 1],
            [RECTANGLE, 29, 29, 2, 2, 1],
            [RECTANGLE, 1, 29, 2, 2, 1]
        ],
        [
            [RECTANGLE, 3, 3, 26, 26, 0],
            [RECTANGLE, 2, 2, 2, 2, 1],
            [RECTANGLE, 28, 2, 2, 2, 1],
            [RECTANGLE, 28, 28, 2, 2, 1],
            [RECTANGLE, 2, 28, 2, 2, 1]
        ],
        [
            [RECTANGLE, 3, 3, 26, 26, 1],
            [RECTANGLE, 4, 4, 24, 24, 0],
        ],*/
        [
            [CIRCLE, 0, 0, 5, 1],
        ],
        [
            [CIRCLE, 0, 0, 5, 0],
        ],
        [
            [CIRCLE, 0, 0, 5, 1],
        ],
        [
            [CIRCLE, 0, 0, 5, 0],
        ],
        [
            [RECTANGLE, 5, 10, 17, 12, 3]
        ],
        [
            [RECTANGLE, 5, 10, 15, 12, 2],
            [RECTANGLE, 20, 15, 15, 3, 4],
            [RECTANGLE, 32, 15, 2, 3, 5],
        ],
        [
            [RECTANGLE, 5, 10, 15, 12, 2],
            [RECTANGLE, 20, 15, 15, 3, 4],
            [RECTANGLE, 32, 15, 2, 3, 5],
        ],
        [
            [RECTANGLE, 5, 10, 17, 12, 3]
        ],
    ]
}

const laserDefinition = {
    w:64,
    h:80,
    origin:{x:32, y:65},
    originLayers:{x:16, y:16},
    colors: [
        '#f005', // 0 red glow
        '#ff08', // 1 yellow glow
        '#f401', // 2 red glow
    ],    
    layers: [
        // base
        [
            [RECTANGLE, 0, 12, 32, 8, 2],
            [RECTANGLE, 2, 13, 28, 6, 2],
            [RECTANGLE, 4, 14, 24, 4, 2],
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
            [RECTANGLE, -2, 12, 34, 8, 0],
            [RECTANGLE, 0, 14, 24, 2, 0],
            [RECTANGLE, 2, 14, 24, 2, 0],
            [RECTANGLE, 4, 14, 24, 2, 0],
            [RECTANGLE, 6, 14, 24, 2, 0],
            [RECTANGLE, 8, 14, 24, 2, 0],
            [RECTANGLE, 24, 15, 8, 2, 1],
            [RECTANGLE, 26, 15, 6, 2, 1],
            [RECTANGLE, 28, 15, 4, 2, 1],
            [RECTANGLE, 30, 15, 2, 2, 1],
        ],
    ]
}

const roboDefinition = {
    w:64,
    h:80,
    origin:{x:32, y:65},
    originLayers:{x:16, y:16},
    colors: [
        '#999', // 0 track
        '#da5', // 1 body
        '#aaf', // 2 screen
        '#66f', // 3 face
        '#678', // 4 arms
        '#c83', // 5 body shade
        '#0001', // 6 shadow
        '#333', // 7 track outside
    ],
    layers: [
        // tracks
        [
            [CIRCLE, 0 , 0, 22, 6],
            [CIRCLE, 0 , 0, 18, 6],
            [RECTANGLE, 4, 2, 24, 8, 0],
            [RECTANGLE, 4, 22, 24, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 7],
            [RECTANGLE, 3, 2, 26, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 7],
            [RECTANGLE, 3, 22, 26, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 0]
        ],
        // body
        [
            [RECTANGLE, 1, 1, 30, 30, 1]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 5]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 10, -5, 28, 4, 4], // left arm
            [RECTANGLE, 10, 33, 28, 4, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 7, -6, 28, 6, 4], // left arm
            [RECTANGLE, 7, 32, 28, 6, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 7, -6, 28, 6, 4], // left arm
            [RECTANGLE, 7, 32, 28, 6, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3],
            [RECTANGLE, 10, -5, 28, 4, 4], // left arm
            [RECTANGLE, 10, 33, 28, 4, 4], // right arm
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3], 
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2],
            [RECTANGLE, 30, 5, 2, 5, 3],
            [RECTANGLE, 30, 22, 2, 5, 3], 
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1],
            [RECTANGLE, 30, 1, 2, 30, 2]
        ],
        [
            [RECTANGLE, 0, 0, 32, 32, 1]
        ],
        [
            [RECTANGLE, 1, 1, 30, 30, 5]
        ],
        // Antenna
        [
            [RECTANGLE, 15, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 14, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 13, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 12, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 11, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 10, 15, 2, 2, 0]
        ],
        [
            [RECTANGLE, 8, 13, 6, 6, 1]
        ],
        [
            [RECTANGLE, 7, 13, 6, 6, 1]
        ],
    ]
}

const robo2Definition = {
    w:64,
    h:80,
    origin:{x:32, y:65},
    originLayers:{x:16, y:16},
    colors: [
        '#777', // 0 track
        '#c33', // 1 body
        '#aaf', // 2 screen
        '#007', // 3 face
        '#555', // 4 arms
        '#a00', // 5 body shade
        '#0001', // 6 shadow
        '#444', // 7 track outside
    ],
    layers: [
        // tracks
        [
            [CIRCLE, 0 , 0, 22, 6],
            [CIRCLE, 0 , 0, 20, 6],
            [CIRCLE, 0 , 0, 18, 6],
            [RECTANGLE, 4, 2, 24, 8, 0],
            [RECTANGLE, 4, 22, 24, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 7],
            [RECTANGLE, 3, 2, 26, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 7],
            [RECTANGLE, 3, 22, 26, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 0]
        ],
        // body
        [
            [RECTANGLE, 0, 0, 32, 32, 5]
        ],
        [
            [RECTANGLE, 1, 1, 30, 30, 1]
        ],
        [
            [RECTANGLE, 2, 2, 28, 28, 5]
        ],
        [
            [RECTANGLE, 3, 3, 26, 26, 1]
        ],
        
        // Neck
        [
            [RECTANGLE, 14, 13, 6, 6, 0]
        ],
        [
            [RECTANGLE, 13, 13, 6, 6, 4]
        ],
        [
            [RECTANGLE, 12, 13, 6, 6, 0]
        ],
        [
            [RECTANGLE, 11, 13, 6, 6, 4]
        ],
        [
            [RECTANGLE, 10, 13, 6, 6, 0]
        ],
        [
            [RECTANGLE, 9, 13, 6, 6, 4]
        ],
        //head
        [
            [RECTANGLE, 6, 7, 20, 8, 5],
            [RECTANGLE, 6, 16, 20, 8, 5]
        ],
        [
            
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 9, 9, 20, 4, 3],
            [RECTANGLE, 8, 17, 20, 6, 2],
            [RECTANGLE, 9, 18, 20, 4, 3],
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 8, 17, 20, 6, 2],
        ],
        [
            [RECTANGLE, 6, 7, 20, 8, 5],
            [RECTANGLE, 7, 8, 18, 6, 1],
            [RECTANGLE, 6, 16, 20, 8, 5],
            [RECTANGLE, 7, 17, 18, 6, 1]
        ],
        
    ]
}


const robo3Definition = {
    w:64,
    h:80,
    origin:{x:32, y:65},
    originLayers:{x:16, y:16},
    colors: [
        '#777', // 0 track
        '#33c', // 1 body
        '#af5', // 2 screen
        '#080', // 3 face
        '#555', // 4 arms
        '#11a', // 5 body shade
        '#0001', // 6 shadow
        '#444', // 7 track outside
    ],
    layers: [
        // tracks
        [
            [CIRCLE, 0 , 0, 22, 6],
            [CIRCLE, 0 , 0, 20, 6],
            [CIRCLE, 0 , 0, 18, 6],
            [RECTANGLE, 4, 2, 24, 8, 0],
            [RECTANGLE, 4, 22, 24, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 7],
            [RECTANGLE, 3, 2, 26, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 7],
            [RECTANGLE, 3, 22, 26, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 0, 2, 32, 8, 7],
            [RECTANGLE, 1, 2, 30, 8, 0],
            [RECTANGLE, 0, 22, 32, 8, 7],
            [RECTANGLE, 1, 22, 30, 8, 0]
        ],
        [
            [RECTANGLE, 2, 2, 28, 8, 0],
            [RECTANGLE, 2, 22, 28, 8, 0]
        ],
        // body
        [
            [RECTANGLE, 0, 0, 32, 32, 5]
        ],
        [
            [RECTANGLE, 1, 1, 30, 30, 1]
        ],
        [
            [RECTANGLE, 2, 2, 28, 28, 5]
        ],
        [
            [RECTANGLE, 3, 3, 26, 26, 1]
        ],
        
        //head
        [
            [RECTANGLE, 6, 7, 20, 8, 5],
            [RECTANGLE, 6, 16, 20, 8, 5]
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 9, 9, 20, 4, 3],
            [RECTANGLE, 8, 17, 20, 6, 2],
            [RECTANGLE, 9, 18, 20, 4, 3],
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 9, 9, 20, 4, 3],
            [RECTANGLE, 8, 17, 20, 6, 2],
            [RECTANGLE, 9, 18, 20, 4, 3],
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 8, 17, 20, 6, 2],
        ],
        [
            [RECTANGLE, 6, 7, 20, 8, 5],
            [RECTANGLE, 7, 8, 18, 6, 1],
            [RECTANGLE, 6, 16, 20, 8, 5],
            [RECTANGLE, 7, 17, 18, 6, 1]
        ],
        
    ]
}