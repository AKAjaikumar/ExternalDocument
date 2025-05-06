define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {
    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");
            DataGridView().then(function (gridView) {
                console.log("DataGridView ready");
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
