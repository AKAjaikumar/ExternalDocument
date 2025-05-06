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
   var myWidget = {
 
        onLoad: function() {
 
            console.log("Widget Loaded");
		}
	 };
 

 
    widget.addEvent('onLoad', myWidget.onLoad);
});
