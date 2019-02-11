import {RewardTypes} from "../startGame";

export default class RewardCalculator {
    constructor(model){
        this._model = model;
    }

    calculateReward(combination){
        let reward;
        let type;
        let index;

        let rewards = [];

        for (let i = 0; i < this._model.paytable.specials.length; i++){
            let special = this.checkSpecial(combination, this._model.paytable.specials[i].index, this._model.paytable.specials[i].reward);
            if (special > 0){
                reward =  special;
                type = RewardTypes.TYPE_SPECIAL;
                index = this._model.paytable.specials[i].index;
                rewards.push({reward:reward, type:type, index:index});
            }
        }

        for (let i = 0; i < this._model.paytable.anyThree.length; i++){
            let anyThree = this.checkAnyThree(combination, this._model.paytable.anyThree[i].index, this._model.paytable.anyThree[i].reward);
            if (anyThree > 0){
                reward =  anyThree;
                type = RewardTypes.TYPE_THREE;
                index = this._model.paytable.anyThree[i].index;
                rewards.push({reward:reward, type:type, index:index});
            }
        }

        for (let i = 0; i < this._model.paytable.leftAndMiddle.length; i++){
            let leftAndMiddle = this.checkLeftAndMiddle(combination, this._model.paytable.leftAndMiddle[i].index, this._model.paytable.leftAndMiddle[i].reward);
            if (leftAndMiddle > 0){
                reward =  leftAndMiddle;
                type = RewardTypes.TYPE_LEFT_MIDDLE;
                index = this._model.paytable.leftAndMiddle[i].index;
                rewards.push({reward:reward, type:type, index:index});
            }
        }

        return rewards;
    }

    checkAnyThree(combination, index, reward){
        let amount = 0;

        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            if (this._model.reels[i][combination.reelPositions[i] + 2] === index)
                amount++;

            if (amount >= 3)
                return reward;
        }

        return 0;
    }

    checkLeftAndMiddle(combination, index, reward){
        let amount = 0;

        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            if (this._model.reels[i][combination.reelPositions[i] + 2] === index && (i === 0 || i === 2))
                amount++;

            if (amount >= 2)
                return reward;
        }

        return 0;
    }

    checkSpecial(combination, index, reward){
        let amount = 0;

        for (let i = 0; i < this._model.REEL_AMOUNT; i++){
            if (this._model.reels[i][combination.reelPositions[i] + 2] === index)
                amount++;
        }

        return reward * amount;
    }
}