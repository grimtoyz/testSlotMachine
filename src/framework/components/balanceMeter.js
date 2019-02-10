import * as PIXI from "pixi.js";

export default class BalanceMeter extends PIXI.Container{
    constructor(app){
        super();

        this._app = app;
        this.setup();
    }

    setup(){
        this._text = new PIXI.Text('',{fontFamily : 'gamefont', fontSize: 35, fill : 0xffffff, align : 'center'});
        this._text.anchor.set(0.5, 0.5);
        this._text.stroke = 0x050402;
        this._text.strokeThickness = 6;
        this.addChild(this._text);
    }

    updateBalance(value){
        this._text.text = `YOUR BALANCE: $${value}`;
    }
}