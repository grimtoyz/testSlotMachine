import * as PIXI from "pixi.js";

export default class Paytable extends PIXI.Container{
    constructor(model){
        super();

        this._model = model;
        this.setup();
    }

    setup(){
        this.createBackground();

        let specialWrapper = this.createSpecialWrapper(this._model.paytable.specials[0].index, this._model.paytable.specials[0].reward);
        specialWrapper.position.set(0, -specialWrapper.height * 0.5 - 30);
        this.addChild(specialWrapper);

        let threesWrapper = new PIXI.Container;
        this.addChild(threesWrapper);

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            let index = this._model.paytable.anyThree[i].index;
            let reward = this._model.paytable.anyThree[i].reward;
            let line = this.createThree(index, reward);
            line.position.set(0, i * this.ICON_GAP_Y);
            threesWrapper.addChild(line);
        }

        threesWrapper.position.set(threesWrapper.width * 0.5 + 20, 0);

        let twosWrapper = new PIXI.Container;
        this.addChild(twosWrapper);

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            let index = this._model.paytable.leftAndMiddle[i].index;
            let reward = this._model.paytable.leftAndMiddle[i].reward;
            let line = this.createTwo(index, reward);
            line.position.set(0, i * this.ICON_GAP_Y);
            twosWrapper.addChild(line);
        }

        twosWrapper.position.set(- twosWrapper.width * 0.5 - 20, 0);

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