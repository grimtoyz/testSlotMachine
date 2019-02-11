import * as PIXI from "pixi.js";
import {RewardTypes} from "../startGame";

export default class Paytable extends PIXI.Container{
    constructor(model){
        super();

        this._model = model;
        this.setup();

        this._isBlinking = false;
        this._timer = 0;
        this._counter = 0;
    }

    setup(){
        this.createBackground();

        this._specialWrapper = this.createSpecialWrapper(this._model.paytable.specials[0].index, this._model.paytable.specials[0].reward);
        this._specialWrapper.position.set(0, - this._specialWrapper.height * 0.5 - 30);
        this.addChild(this._specialWrapper);

        this._threesWrapper = new PIXI.Container;
        this.addChild(this._threesWrapper);

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            let index = this._model.paytable.anyThree[i].index;
            let reward = this._model.paytable.anyThree[i].reward;
            let line = this.createThree(index, reward);
            line.position.set(0, i * this.ICON_GAP_Y);
            this._threesWrapper.addChild(line);
        }

        this._threesWrapper.position.set(this._threesWrapper.width * 0.5 + 20, 0);

        this._twosWrapper = new PIXI.Container;
        this.addChild(this._twosWrapper);

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            let index = this._model.paytable.leftAndMiddle[i].index;
            let reward = this._model.paytable.leftAndMiddle[i].reward;
            let line = this.createTwo(index, reward);
            line.position.set(0, i * this.ICON_GAP_Y);
            this._twosWrapper.addChild(line);
        }

        this._twosWrapper.position.set(- this._twosWrapper.width * 0.5 - 20, 0);

        this.drawBackground();
    }

    createBackground(){
        this._background = new PIXI.Graphics;
        this.addChild(this._background);
    }

    drawBackground(){
        this._background.beginFill(0x040301);
        this._background.drawRect(- this.width * 0.5, - this.height * 0.5 + 20, this.width + 20, this.height + 20);
        this._background.endFill();
    }

    createThree(index, reward){
        let container = new PIXI.Container;

        for (let i = 0; i < 3; i++){
            let icon = new PIXI.Sprite(
                PIXI.loader.resources["atlas"].textures[`symbol${index}.png`]
            );
            icon.anchor.set(0.5, 0.5);
            icon.scale.set(this.ICON_SCALE, this.ICON_SCALE);
            icon.position.set((i-1.5) * this.ICON_GAP_X, 0);
            container.addChild(icon);
        }

        let text = new PIXI.Text(reward, {fontFamily : 'gamefont', fontSize: 35, fill : 0xffffff, align : 'center'});
        text.anchor.set(0.5, 0.5);
        text.position.set(this.ICON_GAP_X * 2, 0);
        container.addChild(text);

        return container;
    }

    createTwo(index, reward){
        let container = new PIXI.Container;

        for (let i = 0; i < 3; i++){
            if (i === 2){
                continue;
            }

            let icon = new PIXI.Sprite(
                PIXI.loader.resources["atlas"].textures[`symbol${index}.png`]
            );
            icon.anchor.set(0.5, 0.5);
            icon.scale.set(this.ICON_SCALE, this.ICON_SCALE);
            icon.position.set((i-1.5) * this.ICON_GAP_X, 0);
            container.addChild(icon);
        }

        let text = new PIXI.Text(reward, {fontFamily : 'gamefont', fontSize: 35, fill : 0xffffff, align : 'center'});
        text.anchor.set(0.5, 0.5);
        text.position.set(this.ICON_GAP_X * 2, 0);
        container.addChild(text);

        return container;
    }

    createSpecialWrapper(index, reward){
        let container = new PIXI.Container;

        let icon = new PIXI.Sprite(
            PIXI.loader.resources["atlas"].textures[`symbol${index}.png`]
        );
        icon.anchor.set(0.5, 0.5);
        icon.scale.set(this.ICON_SCALE, this.ICON_SCALE);
        icon.position.set(- icon.width * 0.5 - 10, 0);
        container.addChild(icon);

        let text = new PIXI.Text(reward, {fontFamily : 'gamefont', fontSize: 35, fill : 0xffffff, align : 'center'});
        text.anchor.set(0.5, 0.5);
        text.position.set(text.width * 0.5 + 10, 0);
        container.addChild(text);

       return (container);
    }

    blinkReward(rewardsObj){
        this._currentBlinkingRewards = [];

        for (let k = 0; k < rewardsObj.length; k++){
            let rewardObj = rewardsObj[k];

            let type = rewardObj.type;
            let rewardIndex = rewardObj.index;

            if (type === RewardTypes.TYPE_THREE){
                for (let i = 0; i < this._model.paytable.anyThree.length; i++){
                    if (this._model.paytable.anyThree[i].index === rewardIndex){
                        this._currentBlinkingRewards.push(this._threesWrapper.children[i]);
                    }
                }
            }

            if (type === RewardTypes.TYPE_LEFT_MIDDLE){
                for (let i = 0; i < this._model.paytable.leftAndMiddle.length; i++){
                    if (this._model.paytable.leftAndMiddle[i].index === rewardIndex){
                        this._currentBlinkingRewards.push(this._twosWrapper.children[i]);
                    }
                }
            }

            if (type === RewardTypes.TYPE_SPECIAL)
                this._currentBlinkingRewards.push(this._specialWrapper);


            this._isBlinking = true;
        }

    }

    update(delta){
        if (!this._isBlinking)
            return;

        if (this._timer < 10)
            this._timer += delta;
        else{
            this._timer = 0;

            for (let i = 0; i < this._currentBlinkingRewards.length; i++){
                this._currentBlinkingRewards[i].visible = ! this._currentBlinkingRewards[i].visible;
            }

            this._counter ++;

            if (this._counter >= 15){
                this._isBlinking = false;

                for (let i = 0; i < this._currentBlinkingRewards.length; i++){
                    this._currentBlinkingRewards[i].visible = true;
                }

                this._counter = 0;
            }
        }
    }

    get ICON_SCALE(){
        return 0.2;
    }

    get ICON_GAP_X(){
        return 35;
    }

    get ICON_GAP_Y(){
        return 50;
    }
}