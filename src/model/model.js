export default class Model {
    constructor(){
        this._balance = 5000;
    }

    get ROWS_AMOUNT(){
        return 3;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }
}