define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',  // Make sure this exists!
    'DS/WAFData/WAFData'             // Make sure this exists!
], function (UWA, DataGridView, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");
            // Your DataGridView setup logic can go here
        }
    };

    // Register widget events
    widget.addEvent('onLoad', myWidget.onLoad);

    return myWidget;
});
