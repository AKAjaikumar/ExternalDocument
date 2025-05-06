require([
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/TreeModel/TreeDocument',
    'DS/TreeModel/TreeNodeModel'
], function(UWA, DataGridView, TreeDocument, TreeNodeModel) {
    var myWidget = {
        onLoad: function() {
            console.log("Widget Loaded");

            // Create a new TreeDocument
            var treeDocument = new TreeDocument();

            // Create a new grid view and pass the tree document and columns
            var gridView = new DataGridView({
                columns: [
                    { text: "Name", dataIndex: "name" },
                    { text: "Type", dataIndex: "type" }
                ]
            });

            // Create a node to be added to the treeDocument
            var node = new TreeNodeModel({
                label: "Sample Node",
                grid: {
                    name: "Sample Doc",
                    type: "Document"
                }
            });

            // Add the node as the root of the tree
            treeDocument.addRoot(node);

            // Assuming you want to display data in the grid, you might need to bind this data
            gridView.setData(treeDocument.getNodes());

            // Add the grid to the widget body
            widget.body.empty().addContent(gridView);
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
