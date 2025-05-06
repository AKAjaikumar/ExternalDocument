require([
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/TreeModel/TreeDocument',
    'DS/TreeModel/TreeNodeModel'
], function(UWA, DataGridView, TreeDocument, TreeNodeModel) {
    var myWidget = {
        onLoad: function() {
		   console.log("Loaded");
	}
	};

    widget.addEvent('onLoad', myWidget.onLoad);
});

