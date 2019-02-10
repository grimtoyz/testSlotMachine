import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

export default class Reel extends PIXI.Container{
    constructor(model){
        super();

        this._model = model;
        this.setup();
    }

    setup(){
        this.createBackground();
        this.setupSymbols();
    }

    createBackground(){
        let posX = -this.SYMBOL_WIDTH * 0.5 - this.MARGIN;
        let posY = - this.SYMBOL_HEIGHT * this._model.ROWS_AMOUNT * 0.5;
        let rWidth = this.SYMBOL_WIDTH + 2 * this.MARGIN;
        let rHeight = this.SYMBOL_HEIGHT * this._model.ROWS_AMOUNT;

        this._background = new PIXI.Graphics();
        this._background.beginFill(0xfffeec);
        this._background.drawRect(posX, posY, rWidth, rHeight);
        this._background.endFill();

        this.addChild(this._background);
    }

    setupSymbols(){
        // var slotTextures = [
        //     PIXI.Texture.fromImage("required/assets/eggHead.png"),
        //     PIXI.Texture.fromImage("required/assets/flowerTop.png"),
        //     PIXI.Texture.fromImage("required/assets/helmlok.png"),
        //     PIXI.Texture.fromImage("required/assets/skully.png")
        // ];
        // this._background = new PIXI.Sprite(
        //     PIXI.loader.resources["atlas"].textures["background.png"]
        // );
        // this._background.anchor.set(0.5, 0.5);
        //
        // this.addChild(this._background);
    }

    spin(){
        TweenMax.to(this._background, 10, { rotation: 60 * Math.PI / 180 });
    }

    get MARGIN(){
        return 10;
    }

    get SYMBOL_WIDTH(){
        return PIXI.loader.resources["atlas"].textures["symbol0.png"].width;
    }

    get SYMBOL_HEIGHT(){
        return PIXI.loader.resources["atlas"].textures["symbol0.png"].height;
    }

    get REEL_WIDTH(){
        return this._background.width;
    }
}