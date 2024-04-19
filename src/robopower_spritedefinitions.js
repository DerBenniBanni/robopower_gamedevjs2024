const RECTANGLE = 0;
const CIRCLE = 1;
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
        '#66f', // 3 face
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
            [RECTANGLE, 14, 14, 6, 6, 0]
        ],
        [
            [RECTANGLE, 13, 14, 6, 6, 4]
        ],
        [
            [RECTANGLE, 12, 14, 6, 6, 0]
        ],
        [
            [RECTANGLE, 11, 14, 6, 6, 4]
        ],
        [
            [RECTANGLE, 10, 14, 6, 6, 0]
        ],
        [
            [RECTANGLE, 9, 14, 6, 6, 4]
        ],
        //head
        [
            [RECTANGLE, 6, 7, 20, 8, 1],
            [RECTANGLE, 6, 16, 20, 8, 1]
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 8, 17, 20, 6, 2],
        ],
        [
            [RECTANGLE, 6, 6, 20, 10, 1],
            [RECTANGLE, 6, 15, 20, 10, 1],
            [RECTANGLE, 8, 8, 20, 6, 2],
            [RECTANGLE, 8, 17, 20, 6, 2],
        ],
        [
            [RECTANGLE, 6, 7, 20, 8, 1],
            [RECTANGLE, 6, 16, 20, 8, 1]
        ],
        
    ]
}