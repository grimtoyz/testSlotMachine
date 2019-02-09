import View from "../view/view";

export default class Controller {
    constructor(app){
        this._app = app;

        this.setup();
    }

    setup(){
        this.createView();
    }

    createView(){
        this._view = new View();
        this._app.stage.addChild(this._view);
    }

    handleResize(){
        // let ratio = Math.min(960 / this._app.renderer.width, 960 / this._app.renderer.height);
        // this._view.scale.x = this._view.scale.y = ratio;

        // renderer.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
        // console.log(this._app.screen.width, this._app.screen.height);
        // return;

        if (this._app.screen.width < this._app.screen.height)
            this.applyLayoutPortrait();
        else
            this.applyLayoutLandscape();

        this._view.position.x = this._app.screen.width * 0.5;
        this._view.position.y = this._app.screen.height * 0.5;
    }

    applyLayoutPortrait(){
        let ratio = this._app.screen.height / 960;
        this._view.scale.x = this._view.scale.y = ratio;

        console.log('portrait');
    }

    applyLayoutLandscape(){
        let ratio = this._app.screen.width / 960;
        this._view.scale.x = this._view.scale.y = ratio;

        console.log('landscape');
    }
}