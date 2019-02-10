import * as PIXI from 'pixi.js';
import Reel from "../components/reel";
import MachineButton from "../components/machineButton";
import BalanceMeter from "../components/balanceMeter";
import Paytable from "../components/paytable";
import WinLineIndicator from "../components/winLineIndicator";

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
        this.createWinLine();
        this.createSpinButton();
        this.createBalanceMeter();
        this.createPaytable();
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
        this._reels = [];

        let totalWidth = this._model.SYMBOL_WIDTH * this._model.REEL_AMOUNT + this._model.REEL_GAP * (this._model.REEL_AMOUNT - 1);
        let firstReelOffset = -totalWidth * 0.5 + this._model.SYMBOL_WIDTH * 0.5;

        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            let reel = new Reel(this._model, i);
            reel.onSpinComplete((function (i) {
                this.onReelSpinComplete(i);
            }).bind(this));

            reel.position.x = firstReelOffset + i * this._model.REEL_GAP + i * this._model.SYMBOL_WIDTH;

            this._reelWrapper.addChild(reel);
            this._reels.push(reel);
        }

        this.addChild(this._reelWrapper);
    }

    createWinLine(){
        this._winLine = new WinLineIndicator(this._model);
        this.addChild(this._winLine);
    }

    createSpinButton(){
        let texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
        this._machineButton = new MachineButton(texture);
        this._machineButton.interactive = true;
        this._machineButton.buttonMode = true;
        this._machineButton.on('pointerdown', (function(){
            this.onMachineButtonTapped();
        }).bind(this));

        this.addChild(this._machineButton);
    }

    createBalanceMeter(){
        this._balanceMeter = new BalanceMeter(this._app);
        this.addChild(this._balanceMeter);
    }

    createPaytable(){
        this._paytable = new Paytable();
        this.addChild(this._paytable);
    }

    spin(combination, reward){
        this._reelsStopped = 0;

        this._machineButton.disable();
        this._machineButton.interactive = false;

        this._currentReward = reward;

        for (let i = 0; i < this._reels.length; i++){
            this._reels[i].spin(combination.reelPositions[i]);
        }
    }

    enableControls(){
        this._machineButton.interactive = true;
        this._machineButton.enable();
    }

    onMachineButtonTapped(callback){
        this.onMachineButtonTapped = callback;
    }

    onReelSpinComplete(reelIndex){
        this._reelsStopped ++;

        if (this._reelsStopped === this._model.REEL_AMOUNT){
            if (this._currentReward > 0)
                this._winLine.show();
            this.onAllReelsComplete();
        }
    }

    onAllReelsComplete(callback){
        this.onAllReelsComplete = callback;
    }

    update(delta){
        if (this._reels){
            for (let i = 0; i < this._reels.length; i++){
                this._reels[i].update(delta);
            }
        }

        if (this._winLine)
            this._winLine.update(delta);
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

        if (this._paytable){
            this._paytable.position.x = 0;
            this._paytable.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._paytable.height * 0.5 + 200;
        }

        if (this._winLine){
            this._winLine.scale.set(this._reelWrapper.scale.x, this._reelWrapper.scale.y);
            this._winLine.position.set(this._reelWrapper.position.x, this._reelWrapper.position.y);
        }
    }

    applyLayoutLandscape(){
        if (this._reelWrapper){
            // TODO: make responsive reels scaling
            this._reelWrapper.scale.x = this._reelWrapper.scale.y = 0.8;
            this._reelWrapper.position.set(-100, 0);
        }

        if (this._machineButton){
            this._machineButton.position.x = this._app.screen.width * 0.5 / this.scale.x - this._machineButton.width * 0.5 - 30;
            this._machineButton.position.y = this._app.screen.height * 0.5 / this.scale.y - this._machineButton.height * 0.5 - 30;
        }

        if (this._balanceMeter){
            this._balanceMeter.position.x = this._reelWrapper.position.x;
            this._balanceMeter.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._balanceMeter.height * 0.5 + 20;
        }

        if (this._paytable){
            this._paytable.position.x = this._reelWrapper.position.x;
            this._paytable.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._paytable.height * 0.5 + 20;
        }

        if (this._winLine){
            this._winLine.scale.set(this._reelWrapper.scale.x, this._reelWrapper.scale.y);
            this._winLine.position.set(this._reelWrapper.position.x, this._reelWrapper.position.y);
        }
    }

    updateBalance(value){
        this._balanceMeter.updateBalance(value);
    }
}