require([
    'UWA/Core',
    'ExternalDocument/DataGridView/DataGridView'
], function(UWA, DataGridView) {
    var myWidget = {
        onLoad: function() {
		   console.log("Loaded");
	}
	};

    widget.addEvent('onLoad', myWidget.onLoad);
});


