import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

export default class Reel extends PIXI.Container{
    constructor(model, index){
        super();

        this._model = model;
        this._index = index;
        this._symbols = [];
        this._nextTopSymbolIndex = this._model.reels[0].length - 1;

        this.setup();
    }

    setup(){
        this.createBackground();
        this.setupSymbols();
        this.createMask();
    }

    createBackground(){
        let posX = -this._model.SYMBOL_WIDTH * 0.5;
        let posY = - this._model.SYMBOL_HEIGHT * this._model.ROWS_AMOUNT * 0.5;
        let rWidth = this._model.SYMBOL_WIDTH;
        let rHeight = this._model.SYMBOL_HEIGHT * this._model.ROWS_AMOUNT;

        this._background = new PIXI.Graphics();
        this._background.beginFill(0xfffeec);
        this._background.drawRect(posX, posY, rWidth, rHeight);
        this._background.endFill();

        this.addChild(this._background);
    }

    setupSymbols(){
        this._symbolWrapper = new PIXI.Container();
        this.addChild(this._symbolWrapper);

        for (let i = 0; i < this._model.ROWS_AMOUNT + 2; i++){
            let symbolModelIndex = i - 1;
            if (symbolModelIndex < 0)
                symbolModelIndex = this._model.reels[this._index].length - 1;

            let symbol = new PIXI.Sprite(
                PIXI.loader.resources["atlas"].textures[`symbol${this._model.reels[this._index][symbolModelIndex]}.png`]
            );
            symbol.anchor.set(0.5, 0.5);

            this._symbolWrapper.addChild(symbol);
            this._symbols.push(symbol);
        }

        this.updateSymbolPositions(0, false);
        this._currentPosition = 0;
        // TweenMax.to(this._currentPosition, 50);
        TweenMax.to(this, 10, {_currentPosition:"+=20", ease:Sine.easeIn});
    }

    createMask(){
        let mask = new PIXI.Graphics();
        mask.beginFill(0xff0000);
        mask.drawRect(-this._background.width * 0.5,- this._background.height * 0.5, this._background.width, this._background.height);
        mask.endFill();

        this.addChild(mask);
        this._symbolWrapper.mask = mask;
    }

    updateSymbolPositions(position, normalize = true){
        let totalHeight = this._model.ROWS_AMOUNT * this._model.SYMBOL_HEIGHT;

        for (let i = 0; i < this._symbols.length; i++){
            let symbol = this._symbols[i];

            let topSymbolStartingPosition =  - totalHeight * 0.5 - this._model.SYMBOL_HEIGHT * 0.5;
            let relativeSymbolPosition =  position * this._model.SYMBOL_HEIGHT + i * this._model.SYMBOL_HEIGHT;
            let allSymbolsHeight = (this._model.ROWS_AMOUNT + 2) * this._model.SYMBOL_HEIGHT;

            let symbolPosition = topSymbolStartingPosition + relativeSymbolPosition;
            let symbolPositionNormalized = topSymbolStartingPosition + relativeSymbolPosition%allSymbolsHeight;

            // symbol transfered to top
            if(symbolPositionNormalized < symbol.position.y){
                symbol.texture = PIXI.loader.resources["atlas"].textures[`symbol${this._model.reels[this._index][this._nextTopSymbolIndex]}.png`];
                this._nextTopSymbolIndex --;
                if (this._nextTopSymbolIndex < 0)
                    this._nextTopSymbolIndex = this._model.reels[this._index].length - 1;
            }

            symbol.position.y = normalize ? symbolPositionNormalized : symbolPosition;
        }
    }

    update(delta){
        this.updateSymbolPositions(this._currentPosition);
    }
}