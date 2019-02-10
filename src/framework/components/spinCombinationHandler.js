import {Util} from "../utils/gameUtils";

export default class SpinCombinationHandler {
    constructor(model){
        this._model = model;
    }

    requestSpinCombination(){
        // server request should be handled here and this class should probably be split into several

        // faking combination
        let reelPositions = [];
        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            let reelPosition = Util.randomInt(0, this._model.reels[0].length - 1);
            reelPositions.push(3);
        }
        let combination = {reelPositions:reelPositions};
        this.onCombinationReceived(combination);
    }

    onCombinationReceived(callback){
        this.onCombinationReceived = callback;
    }
}