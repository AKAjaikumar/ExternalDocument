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
            console.log("onLoad function called");

            // Add further log statements here to trace the flow
            // Your DataGridView logic can go here
        }
    };

    // Register widget events explicitly
    if (widget) {
        console.log('Widget object found, adding onLoad event');
        widget.onLoad = myWidget.onLoad;
    } else {
        console.error('Widget object not found!');
    }

    return myWidget;
});
