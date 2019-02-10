import { initGame } from './initGame';
import * as WebFont from "webfontloader";

window.onload = () => {
        window.removeLoader();

        WebFont.load(
        {
            // this event is triggered when the fonts have been rendered, see https://github.com/typekit/webfontloader
            active : function()
            {
                initGame();
            },

            // multiple fonts can be passed here
            custom :
                {
                    families: [ 'gameFont' ]
                }
        });

        // initGame();
        return;
    };
