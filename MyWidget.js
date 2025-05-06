define('MyWidget', [
    'UWA/Core',
    'DS/DataGridView/DataGridView',
    'DS/WAFData/WAFData'
], function (UWA, DataGridView, WAFData) {

    'use strict';

    var myWidget = {
        onLoad: function () {
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
        }
    };

    return myWidget;
});
