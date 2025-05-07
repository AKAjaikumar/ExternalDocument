define('MyWidget', [
    'UWA/Core'
], function (UWA) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            console.log("Widget loaded from JS!");
            var container = widget.body;
            container.innerHTML = '';

            if (!container) {
                console.error("Container not found!");
                return;
            }

            container.innerHTML = '<div style="padding:10px;">Hello from 3DEXPERIENCE widget!</div>';
        }
    };

    if (typeof widget !== 'undefined') {
        widget.addEvent('onLoad', myWidget.onLoad);
    }

    return myWidget;
});
