define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {
    var myWidget = {
        onLoad: function () {
            console.log("Widget Loaded");

            // Basic DataGridView config
            DataGridView().then(function (GridView) {
                var gridView = new GridView({
                    element: document.getElementById('testGridView'),
                    data: [
                        { name: 'Doc1', type: 'PDF' },
                        { name: 'Doc2', type: 'Word' }
                    ],
                    columns: [
                        { text: 'Name', dataIndex: 'name' },
                        { text: 'Type', dataIndex: 'type' }
                    ]
                });
                gridView.render();
                console.log("DataGridView rendered");
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
