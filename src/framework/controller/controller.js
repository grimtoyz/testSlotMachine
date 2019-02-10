import View from "../view/view";
import Model from "../../model/model";
import SpinCombinationHandler from "../components/spinCombinationHandler";

export default class Controller {
    constructor(app){
        this._app = app;

        this.setup();
    }

    setup(){
        this.createModel();
        this.createSpinCombinationHandler();
        this.createView();

        this._view.updateBalance(this._model.balance);
    }

    createModel(){
        this._model = new Model();
    }

    createSpinCombinationHandler(){
        this._spinCombinationHandler = new SpinCombinationHandler(this._model);
        this._spinCombinationHandler.onCombinationReceived(this.onSpinCombinationReceived.bind(this));
    }

    createView(){
        this._view = new View(this._app, this._model);
        this._view.onMachineButtonTapped(this.onSpinTapped.bind(this));
        this._view.onAllReelsComplete(this.onAllReelsComplete.bind(this));

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

    onSpinTapped(){
        if (this.canSpin()){
            this._model.balance -= this._model.currentBet;
            this._view.updateBalance(this._model.balance);

            // TODO: instead of spinning after fake combination has been received,
            // TODO: endless spin should be activated, until response from the server is received,
            // TODO: and only afterwards the endless spin should be stopped and the reels will start to slow down till the positions from the data achieved
            this._spinCombinationHandler.requestSpinCombination();
        }
    }

    canSpin(){
        if (this._model._currentBet <= this._model.balance)
            return true;

        return false;
    }

    onSpinCombinationReceived(combination){
        this._view.spin(combination);
    }

    onAllReelsComplete(){
        this._view.enableControls();
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