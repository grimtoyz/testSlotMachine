import * as PIXI from 'pixi.js';

export default class View extends PIXI.Container{
    constructor() {
        super();

        this.setup();
    }

    setup(){
        this.createBackground();
    }

    createBackground(){
        this._background = new PIXI.Sprite(
            PIXI.loader.resources["atlas"].textures["background.png"]
        );
        this._background.anchor.set(0.5, 0.5);

        this.addChild(this._background);
    }
}