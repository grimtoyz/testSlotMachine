import View from "../view/view";
import Model from "../../model/model";

export default class Controller {
    constructor(app){
        this._app = app;

        this.setup();
    }

    setup(){
        this.createModel();
        this.createView();

        this._view.updateBalance(this._model.balance);
    }

    createModel(){
        this._model = new Model();
    }

    createView(){
        this._view = new View(this._app, this._model);
        this._app.stage.addChild(this._view);
    }

    handleResize(){
        let ratio = this._app.screen.width < this._app.screen.height ? this._app.screen.height / 960 : this._app.screen.width / 960;
        this._view.scale.x = this._view.scale.y = ratio;

        if (this._app.screen.width < this._app.screen.height)
            this.applyLayoutPortrait();
        else
            this.applyLayoutLandscape();

        this._view.position.x = this._app.screen.width * 0.5;
        this._view.position.y = this._app.screen.height * 0.5;
    }

    update(delta){
        if (this._view)
            this._view.update(delta);
    }

    applyLayoutPortrait(){
        if (this._view)
            this._view.applyLayoutPortrait();
    }

    applyLayoutLandscape(){
        if (this._view)
            this._view.applyLayoutLandscape();
    }
}