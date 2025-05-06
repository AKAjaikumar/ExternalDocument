define([
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {
    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");

            // Example usage of DataGridView (via promise)
            DataGridView().then(function (gridView) {
                console.log("DataGridView ready");
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
