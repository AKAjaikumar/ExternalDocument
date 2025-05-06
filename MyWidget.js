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

            var container = document.createElement('div');
            document.body.appendChild(container);
            container.style.padding = '10px';

            var gridView = new DataGridView({
                columns: [
                    { text: 'Name', dataIndex: 'name', sortable: true, width: '150px' },
                    { text: 'Type', dataIndex: 'type', sortable: true, width: '120px' },
                    { text: 'Revision', dataIndex: 'revision', sortable: true, width: '100px' }
                ]
            });

            gridView.inject(container);

            WAFData.authenticatedRequest('/resources/v1/modeler/documents', {
                method: 'GET',
                type: 'json',
                onComplete: function (data) {
                    if (data && data.member) {
                        var rows = data.member.map(function (doc) {
                            return {
                                name: doc.name,
                                type: doc.type,
                                revision: doc.revision
                            };
                        });
                        gridView.addRows(rows);
                    } else {
                        console.error('No documents returned');
                    }
                },
                onFailure: function (error) {
                    console.error('Failed to fetch documents:', error);
                }
            });
        });
    } else {
        console.error('widget object is not available');
    }
});
