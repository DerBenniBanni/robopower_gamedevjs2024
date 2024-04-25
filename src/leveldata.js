// TODO: add MORE levels
const LEVEL_PLAYER = "a";
const LEVEL_ROBO2 = "b";
const LEVEL_ROBO3 = "c";
const LEVEL_HOLE = "H";

const LEVEL_BELT_RIGHT = ">";
const LEVEL_BELT_RIGHT_TURN_RIGHT = "U";
const LEVEL_BELT_RIGHT_TURN_LEFT = "T";
const LEVEL_BELT_RIGHT_CANNON = "D";

const LEVEL_BELT_LEFT = "<";
const LEVEL_BELT_LEFT_TURN_RIGHT = "R";
const LEVEL_BELT_LEFT_TURN_LEFT = "L";
const LEVEL_BELT_LEFT_CANNON = "C";

const LEVEL_BELT_DOWN = "v";
const LEVEL_BELT_DOWN_TURN_RIGHT = "]";
const LEVEL_BELT_DOWN_TURN_LEFT = "[";

const LEVEL_BELT_UP = "A";
const LEVEL_BELT_UP_TURN_RIGHT = "(";
const LEVEL_BELT_UP_TURN_LEFT = ")";

const LEVEL_CANNON_LEFT = "4";
const LEVEL_CANNON_UP = "8";
const LEVEL_CANNON_RIGHT = "6";
const LEVEL_CANNON_DOWN = "2";

/*
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
const LEVEL_ = "";
*/
const levels = [
    {
        desc:'',
        data:[
            '2                            v               4',
            '       HHH            2      v                ',
            '         H     a             [>>>U            ',
            '             H   H    >>>>U      v            ',
            '                          v      H            ',
            '          v               [>>>>>HHHU          ',
            '          v   HHH                H v     4    ',
            '          v               (DU      v  H       ',
            '          HHHH  L<<<<<    A v      v HH       ',
            '          HHHH  v         A v      v          ',
            '           A    v         RC]      v          ',
            '           R<<<<]     H            v          ',
            '       b       v              HH   v    c     ',
            '    6          [>>>>>>>H       HH<<]          ',
            '               (>U              H             ',
            '               A v              A             ',
            '               RC]              A             ',
            '6                               A            8',
        ]
    }
];