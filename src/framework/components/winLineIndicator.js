export default class WinLineIndicator extends PIXI.Container{
    constructor(model){
        super();

        this._model = model;
        this.setup();

        this._isBlinking = false;
        this._timer = 0;
        this._counter = 0;

        this.visible = false;
    }

    setup(){
        let width = this._model.REEL_AMOUNT * this._model.SYMBOL_WIDTH;
        let height = 10;

        this._line = new PIXI.Graphics();
        this._line.beginFill(0x070101);
        this._line.drawRect(- width * 0.5 - 4, - height * 0.5 - 4, width + 8, height + 8);
        this._line.endFill();
        this._line.beginFill(0x66b400);
        this._line.drawRect(- width * 0.5, - height * 0.5, width, height);
        this._line.endFill();

        this.addChild(this._line);
    }

    show(){
        this._isBlinking = true;
        this.visible = true;
        this._timer = 0;
    }

    update(delta){
        if (!this._isBlinking)
            return;

        if (this._timer < 10)
            this._timer += delta;
        else{
            this._timer = 0;
            this.visible = !this.visible;
            this._counter ++;

            if (this._counter >= 10){
                this._isBlinking = false;
                this.visible = false;
            }
        }
    }
}