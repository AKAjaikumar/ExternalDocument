require([
    'UWA/Core',
    'DS/DataGridView/DataGridView'
], function(UWA, DataGridView) {
    var myWidget = {
        onLoad: function() {
			console.log("Widget loaded from JS !");
            var container = widget.body;
            container.innerHTML = '';
            if (!container) {
                console.error("Container #testGridView not found!");
                return;
            }
			
		}
	};
	widget.addEvent('onLoad', myWidget.onLoad);
});
