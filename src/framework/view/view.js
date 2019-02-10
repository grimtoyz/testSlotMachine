import * as PIXI from 'pixi.js';
import Reel from "../components/reel";
import MachineButton from "../components/machineButton";
import BalanceMeter from "../components/balanceMeter";

export default class View extends PIXI.Container{
    constructor(app, model) {
        super();

        this._app = app;
        this._model = model;

        this.setup();
    }

    setup(){
        this.createBackground();
        this.createReels();
        this.createSpinButton();
        this.createBalanceMeter();
    }

    createBackground(){
        this._background = new PIXI.Sprite(
            PIXI.loader.resources["atlas"].textures["background.png"]
        );
        this._background.anchor.set(0.5, 0.5);

        this.addChild(this._background);
    }

    createReels(){
        this._reelWrapper = new PIXI.Container();

        for (let i = 0; i < this.REEL_AMOUNT; i++){
            let reel = new Reel(this._model);

            let totalWidth = reel.REEL_WIDTH * this.REEL_AMOUNT + this.REEL_GAP_X * (this.REEL_AMOUNT - 1);
            let firstReelOffset = -totalWidth * 0.5 + reel.REEL_WIDTH * 0.5;
            reel.position.x = firstReelOffset + i * this.REEL_GAP_X + i * reel.REEL_WIDTH;

            this._reelWrapper.addChild(reel);
        }

        this.addChild(this._reelWrapper);
    }

    createSpinButton(){
        let texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
        this._machineButton = new MachineButton(texture);
        this._machineButton.interactive = true;
        this._machineButton.buttonMode = true;
        this._machineButton.on('pointerdown', this.onMachineButtonTapped);

        this.addChild(this._machineButton);
    }

    createBalanceMeter(){
        this._balanceMeter = new BalanceMeter(this._app);
        this.addChild(this._balanceMeter);
    }

    onMachineButtonTapped(){
        console.log('tap');
    }

    applyLayoutPortrait(){
        if (this._reelWrapper){
            // TODO: make responsive reels scaling
            this._reelWrapper.scale.x = this._reelWrapper.scale.y = 0.5;
            this._reelWrapper.position.x = 0;
            this._reelWrapper.position.y = 0;
        }

        if (this._machineButton){
            this._machineButton.position.x = 0;
            this._machineButton.position.y = this._app.screen.height * 0.5 / this.scale.y - this._machineButton.height - 30;
        }

        if (this._balanceMeter){
            this._balanceMeter.position.x = 0;
            this._balanceMeter.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._balanceMeter.height * 0.5 + 200;
        }
    }

    applyLayoutLandscape(){
        if (this._reelWrapper){
            // TODO: make responsive reels scaling
            this._reelWrapper.scale.x = this._reelWrapper.scale.y = 0.8;
            this._reelWrapper.position.x = -100;
            this._reelWrapper.position.y = 0;
        }

        if (this._machineButton){
            this._machineButton.position.x = this._app.screen.width * 0.5 / this.scale.x - this._machineButton.width * 0.5 - 30;
            this._machineButton.position.y = this._app.screen.height * 0.5 / this.scale.y - this._machineButton.height * 0.5 - 30;
        }

        if (this._balanceMeter){
            this._balanceMeter.position.x = this._reelWrapper.position.x;
            this._balanceMeter.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._balanceMeter.height * 0.5 + 20;
        }
    }

    updateBalance(value){
        this._balanceMeter.updateBalance(value);
    }

    get REEL_AMOUNT(){
        return 5;
    }

    get REEL_GAP_X(){
        return 10;
    }
}