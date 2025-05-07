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
    // Wait for 3DEXPERIENCE platform to fully load the widget
    if (typeof widget !== 'undefined') {
        // Check if widget is loaded and call onLoad event handler
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            // Create a container for the DataGridView
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.style.padding = '10px';

           // Check if DataGridView has a valid constructor or factory method
            if (typeof DataGridView === 'function') {
                // If DataGridView is a constructor
                var gridView = new DataGridView({
                    columns: [
                        { text: 'Name', dataIndex: 'name', sortable: true, width: '150px' },
                        { text: 'Type', dataIndex: 'type', sortable: true, width: '120px' },
                        { text: 'Revision', dataIndex: 'revision', sortable: true, width: '100px' }
                    ]
                });
                gridView.inject(container);
            } else if (DataGridView && DataGridView.create) {
                // If DataGridView has a create method or factory function
                var gridView = DataGridView.create({
                    columns: [
                        { text: 'Name', dataIndex: 'name', sortable: true, width: '150px' },
                        { text: 'Type', dataIndex: 'type', sortable: true, width: '120px' },
                        { text: 'Revision', dataIndex: 'revision', sortable: true, width: '100px' }
                    ]
                });
                gridView.inject(container);
            } else {
                console.error('DataGridView is not a constructor or factory method is missing.');
            }

            // Make authenticated request to fetch documents from the 3DEXPERIENCE services
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
        console.error('Widget object is not available');
    }
});
