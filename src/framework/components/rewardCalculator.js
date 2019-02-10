export default class RewardCalculator {
    constructor(model){
        this._model = model;
    }

    calculateReward(combination){
        let reward = 0;

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            // reward += this.checkAnyThree(combination, this._model._paytable.anyThree[i].index, this._model._paytable.anyThree[i].reward);
            let anyThree = this.checkAnyThree(combination, this._model.paytable.anyThree[i].index, this._model.paytable.anyThree[i].reward);
            // if (anyThree === 0)
            //     reward += this.checkLeftMiddle();
            // else
            //     reward += this.c

        }

        reward = 100;

        return reward;
    }

    checkAnyThree(combination, index, reward){
        let amount = 0;

        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            if (combination.reelPositions[i] === index)
                amount++;

            if (amount >= 3)
                return reward;
        }

        return 0;
    }
}