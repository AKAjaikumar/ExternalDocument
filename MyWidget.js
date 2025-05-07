require([
    'UWA/Core',
    'DS/DataGrid/DataGrid',
    'DS/WAFData/WAFData'
], function (UWA, DataGrid, WAFData) {
    // Wait for 3DEXPERIENCE platform to fully load the widget
    if (typeof widget !== 'undefined') {
        // Check if widget is loaded and call onLoad event handler
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            // Create a container for the DataGrid
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.style.padding = '10px';

            
            var gridView = new DataGrid({
                columns: [
                    { text: 'Name', dataIndex: 'name', sortable: true, width: '150px' },
                    { text: 'Type', dataIndex: 'type', sortable: true, width: '120px' },
                    { text: 'Revision', dataIndex: 'revision', sortable: true, width: '100px' }
                ]
            });

            // Inject the gridView into the container
            gridView.inject(container);

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
                        // Add rows to the DataGridView
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
