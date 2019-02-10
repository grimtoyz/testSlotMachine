import * as PIXI from "pixi.js";

export default class MachineButton extends PIXI.Sprite{
    constructor(texture){
        super(texture);

        this.anchor.set(0.5, 0.5);
    }

    changeToSpinButton(){
        this.texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
    }

    changeToStopButton(){
        this.texture = PIXI.loader.resources["atlas"].textures["stopButton.png"];
    }
}