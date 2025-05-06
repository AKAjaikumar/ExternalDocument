define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {
    'use strict';

    console.log("MyWidget module loaded");

    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");

            // Your DataGridView logic here (optional)
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);

    return myWidget;
});
