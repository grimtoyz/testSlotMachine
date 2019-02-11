import * as PIXI from 'pixi.js';
import Reel from "../components/reel";
import MachineButton from "../components/machineButton";
import BalanceMeter from "../components/balanceMeter";
import Paytable from "../components/paytable";
import WinLineIndicator from "../components/winLineIndicator";
import WinIndicator from "../components/winIndicator";

export default class View extends PIXI.Container{
    constructor(app, model) {
        super();

        this._app = app;
        this._model = model;

        this._isSpinning = false;
        this.setup();
    }

    setup(){
        this.createBackground();
        this.createReels();
        this.createWinLine();
        this.createWinIndicator();
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

    createWinIndicator(){
        this._winIndicator = new WinIndicator();
        this._winIndicator.updateWinText(0);
        this.addChild(this._winIndicator);
    }

    createSpinButton(){
        let texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
        this._machineButton = new MachineButton(texture);
        this._machineButton.interactive = true;
        this._machineButton.buttonMode = true;
        this._machineButton.on('pointerdown', (function(){
            this.onMachineButtonTapped(this._isSpinning);
        }).bind(this));

        this.addChild(this._machineButton);
    }

    createBalanceMeter(){
        this._balanceMeter = new BalanceMeter(this._app);
        this.addChild(this._balanceMeter);
    }

    createPaytable(){
        this._paytable = new Paytable(this._model);
        this.addChild(this._paytable);
    }

    spin(combination, reward){
        this._winLine.hide();

        this._isSpinning = true;
        this._reelsStopped = 0;

        this._winIndicator.updateWinText(0);

        this._machineButton.changeToStopButton();

        this._currentReward = reward;

        for (let i = 0; i < this._reels.length; i++){
            this._reels[i].spin(combination.reelPositions[i]);
        }
    }

    instantStop(){
        for (let i = 0; i < this._reels.length; i++){
            this._reels[i].instantStop();
        }
    }

    showSpinButton(){
        this._machineButton.changeToSpinButton();
    }

    onMachineButtonTapped(callback){
        this.onMachineButtonTapped = callback;
    }

    onReelSpinComplete(reelIndex){
        this._reelsStopped ++;

        if (this._reelsStopped === this._model.REEL_AMOUNT){
            console.log("all reels stopped");

            let reward = 0
            for (let i = 0; i < this._currentReward.length; i++){
                reward += this._currentReward[i].reward;
            }

            if (reward > 0){
                this._winLine.show();
                this._winIndicator.updateWinText(reward);
                this._paytable.blinkReward(this._currentReward);
            }
            this._isSpinning = false;
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

        if (this._paytable)
            this._paytable.update(delta);
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
            this._balanceMeter.position.y = this._reelWrapper.position.y + this._reelWrapper.height * 0.5 + 30;
        }

        if (this._paytable){
            this._paytable.position.x = 0;
            this._paytable.position.y = -this._app.screen.height * 0.5 / this.scale.y + this._paytable.height * 0.5 + 200;
        }

        if (this._winLine){
            this._winLine.scale.set(this._reelWrapper.scale.x, this._reelWrapper.scale.y);
            this._winLine.position.set(this._reelWrapper.position.x, this._reelWrapper.position.y);
        }

        if (this._paytable){
            this._paytable.scale.set(1, 1);
            this._paytable.position.set(0, this._reelWrapper.position.y - this._reelWrapper.height * 0.5 - this._paytable.height - 20);
        }

        if (this._winIndicator){
            this._winIndicator.position.set(0, this._balanceMeter.position.y + 70);
        }
    }

    applyLayoutLandscape(){
        if (this._reelWrapper){
            // TODO: make responsive reels scaling
            this._reelWrapper.scale.x = this._reelWrapper.scale.y = 0.6;
            this._reelWrapper.position.set(- this._reelWrapper.width * 0.5 / this.scale.y + 50, 0);
        }

        if (this._machineButton){
            this._machineButton.position.x = this._app.screen.width * 0.5 / this.scale.x - this._machineButton.width * 0.5 - 30;
            this._machineButton.position.y = this._app.screen.height * 0.5 / this.scale.y - this._machineButton.height * 0.5 - 30;
        }

        if (this._balanceMeter){
            this._balanceMeter.position.x = this._reelWrapper.position.x;
            this._balanceMeter.position.y = this._reelWrapper.position.y + this._reelWrapper.height * 0.5 + 30;
        }

        if (this._paytable){
            this._paytable.position.x = (this._app.screen.width * 0.5 - this._paytable.width * 0.5) / this.scale.y - 30;
            this._paytable.position.y = -this._reelWrapper.position.y - this._paytable.height * 0.5;
        }

        if (this._winLine){
            this._winLine.scale.set(this._reelWrapper.scale.x, this._reelWrapper.scale.y);
            this._winLine.position.set(this._reelWrapper.position.x, this._reelWrapper.position.y);
        }

        if (this._winIndicator){
            this._winIndicator.position.set(this._paytable.position.x, this._reelWrapper.position.y + 70);
        }
    }

    updateBalance(value){
        this._balanceMeter.updateBalance(value);
    }
}