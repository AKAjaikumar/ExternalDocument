require([
    'UWA/Core',
    'enovia/DataGridView/DataGridView',
    'DS/TreeModel/TreeDocument',
    'DS/TreeModel/TreeNodeModel'
], function(UWA, DataGridView, TreeDocument, TreeNodeModel) {
    var myWidget = {
        onLoad: function() {
            console.log("Loaded");

            var treeDocument = new TreeDocument();

            var gridView = new DataGridView({
                treeDocument: treeDocument,
                columns: [
                    { text: "Name", dataIndex: "name" },
                    { text: "Type", dataIndex: "type" }
                ]
            });

            var node = new TreeNodeModel({
                label: "Sample",
                grid: {
                    name: "Sample Doc",
                    type: "Document"
                }
            });

            treeDocument.addRoot(node);
            widget.body.empty().addContent(gridView);
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});

