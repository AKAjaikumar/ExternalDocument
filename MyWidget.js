require.config({
    baseUrl: 'https://akajaikumar.github.io/ExternalDocument/',
    paths: {
        'DataGridView': 'DS/DataGridView/DataGridView',
        'WAFData': 'DS/WAFData/WAFData'
    }
});

require([
    'UWA/Core',
    'DataGridView',
    'WAFData'
], function (UWA, DataGridView, WAFData) {
    // Wait for the platform to load the widget
    if (typeof widget !== 'undefined' && widget.addEvent) {
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            
        });
    } else {
        console.error('widget object is not available');
    }
});
