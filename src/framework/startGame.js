import * as WebFont from "webfontloader";
import Controller from "./controller/controller";
import * as PIXI from 'pixi.js';

export const RewardTypes = Object.freeze({
    TYPE_NONE:   "TYPE_NONE",
    TYPE_SPECIAL:  "TYPE_SPECIAL",
    TYPE_THREE: "TYPE_THREE",
    TYPE_LEFT_MIDDLE: "TYPE_LEFT_MIDDLE"
});


export function startGame(deviceWidth, deviceHeight) {
    let orientation = (deviceWidth > deviceHeight) ? 'landscape' : 'portrait';
    let deviceRatio = deviceWidth / deviceHeight;
    let isLandscape = (orientation === 'landscape');

    const app = new PIXI.Application(deviceWidth, deviceHeight, {
        autoResize: true,
        resolution: devicePixelRatio,
        backgroundColor : 0x076542});
    document.body.appendChild(app.view);

    window.addEventListener('resize', resize);

    function resize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);

        if (app.controller)
            app.controller.handleResize();
    }

    PIXI.loader
        .add('atlas', './assets/assets.json')
        .load(onAssetsLoaded);

    function onAssetsLoaded(){
        app.controller = new Controller(app);
        app.ticker.add(delta => update(delta));

        resize();
    }

    function update(delta){
        if (app.controller)
            app.controller.update(delta);
    }
}

