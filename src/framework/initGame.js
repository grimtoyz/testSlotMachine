import * as WebFont from 'webfontloader'
import { startGame } from './startGame';

export function initGame() {
    let { width, height } = getScreenSize();

    startGame(width, height);
}

export function getScreenSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (!width || !height) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight
    }

    return { width, height }
}