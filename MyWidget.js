try {
    define('MyWidget', [
        'UWA/Core',
        'DS/DataGridView/DataGridView',
        'DS/WAFData/WAFData'
    ], function (UWA, DataGridView, WAFData) {
        'use strict';

        var myWidget = {
            onLoad: function () {
                console.log("Widget Loaded - onLoad Event Triggered");
            }
        };

        if (widget) {
            console.log("Widget object available.");
            widget.addEvent('onLoad', myWidget.onLoad);
        } else {
            console.error("Widget object is missing!");
        }

        return myWidget;
    });
} catch (error) {
    console.error("Error in widget initialization:", error);
}
