require([
    'UWA/Core',
    'ExternalDocument/DS/DataGridView/DataGridView'
], function(UWA, DataGridView) {
    var myWidget = {
        onLoad: function() {
            console.log("Widget Loaded");
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
