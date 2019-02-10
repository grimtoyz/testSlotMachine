import * as PIXI from "pixi.js";

export default class MachineButton extends PIXI.Sprite{
    constructor(texture){
        super(texture);

        this.anchor.set(0.5, 0.5);
    }

    enable(){
        this.texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
    }

    disable(){
        this.texture = PIXI.loader.resources["atlas"].textures["spinButtonDisabled.png"];
    }
}