export default class Model {
    constructor(){
        this._balance = 5000;
        this._currentBet = 10;

        this._reels = [
            [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
            [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
            [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
            [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
            [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
        ]

        this._paytable = {
            anyThree:[
                {index:0, reward:50},
                {index:2, reward:50},
                {index:3, reward:50}
                ],
            leftAndMiddle:[
                {index:0, reward:20},
                {index:2, reward:20},
                {index:3, reward:20}
            ],
            specials:[{index:1, reward:25}]
        }
    }

    get reels() {
        return this._reels;
    }

    get ROWS_AMOUNT(){
        return 3;
    }

    get SYMBOL_WIDTH(){
        return 160;
    }

    get SYMBOL_HEIGHT(){
        return 200;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get currentBet() {
        return this._currentBet;
    }

    set currentBet(value) {
        this._currentBet = value;
    }

    get paytable() {
        return this._paytable;
    }

    get REEL_AMOUNT(){
        return 5;
    }

    get REEL_GAP(){
        return 10;
    }
}