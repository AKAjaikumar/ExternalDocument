define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");

            DataGridView().then(function (gridView) {
                console.log("DataGridView ready");
                // TODO: Add DataGridView usage logic here
            }).catch(function (error) {
                console.error("Failed to load DataGridView:", error);
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);

    return myWidget;
});
