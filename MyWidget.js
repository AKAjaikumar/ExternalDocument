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
   return {
        onLoad: function () {
            console.log("onLoad triggered");

            // Create container
            var container = document.createElement('div');
            container.style.width = '100%';
            container.style.height = '100%';
            widget.body.appendChild(container);

            // Create and render DataGridView
            DataGridView().then(function (gridView) {
                var config = new DataGridViewConfig({
                    id: 'demo-grid',
                    enableSorting: true
                });

                var layout = new DataGridViewLayoutEngine({
                    columns: [
                        { text: 'Name', dataIndex: 'name', width: 200 },
                        { text: 'Type', dataIndex: 'type', width: 100 }
                    ]
                });

                gridView.setConfig(config);
                gridView.setLayoutEngine(layout);
                gridView.setData([{
                    name: 'Document A',
                    type: 'doc'
                }, {
                    name: 'Document B',
                    type: 'pdf'
                }]);

                gridView.inject(container);
            });
        }
    };
});
