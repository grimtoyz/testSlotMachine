import * as WebFont from 'webfontloader'
import { startGame } from './startGame';

export function initGame() {
    let { width, height } = getScreenSize();

    startGame(width, height);

    // let onLoadFiles = () => {
    //     loadCustomFont(() => {
    //         let { width, height } = getScreenSize();
    //         startGame(width, height)
    //     })
    // };
}


function loadCustomFont(onComplete) {
    if (GlobalData.fonts.length > 0) {
        WebFont.load({
            custom: { families: GlobalData.fonts },
            active: function() {
                // console.log('--> load fonts');
                onComplete()
            }
        })
    } else {
        onComplete()
    }
}

export function getScreenSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Possible fix for ios-9 innerWidth/Height bug
    if (!width || !height) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight
    }

    return { width, height }
}