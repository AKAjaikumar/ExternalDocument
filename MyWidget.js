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
    var myWidget = {
        onLoad: function() {
            console.log("Widget Loaded");

            var container = document.createElement('div');  // Create the container element
            myWidget.body = container;  // Assign it to the widget's body
            document.body.appendChild(container);  // Append to the DOM

            // Set styles using the standard DOM API
            container.style.padding = '10px';
            container.innerHTML = ''; // Clear any existing content

            if (!container) {
                console.error("Container not found!");
                return;
            }

            // DataGridView setup
            var gridView = new DataGridView({
                columns: [
                    {
                        text: 'Name',
                        dataIndex: 'name',
                        sortable: true,
                        width: '150px'
                    },
                    {
                        text: 'Type',
                        dataIndex: 'type',
                        sortable: true,
                        width: '120px'
                    },
                    {
                        text: 'Revision',
                        dataIndex: 'revision',
                        sortable: true,
                        width: '100px'
                    }
                ]
            });

            // Inject the grid into the container
            gridView.inject(container);

            // Fetch documents using OOTB document service
            WAFData.authenticatedRequest('/resources/v1/modeler/documents', {
                method: 'GET',
                type: 'json',
                onComplete: function (data) {
                    if (data && data.member) {
                        // Prepare rows from the document data
                        var rows = data.member.map(function (doc) {
                            return {
                                name: doc.name,
                                type: doc.type,
                                revision: doc.revision
                            };
                        });

                        // Add rows to the grid
                        gridView.addRows(rows);
                    } else {
                        console.error('No documents returned');
                    }
                },
                onFailure: function (error) {
                    console.error('Failed to fetch documents:', error);
                }
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
