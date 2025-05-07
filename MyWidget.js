require([
    'UWA/Core',
    'DS/WAFData/WAFData'
], function (UWA, WAFData) {
    // Wait for 3DEXPERIENCE platform to fully load the widget
    if (typeof widget !== 'undefined') {
        // Check if widget is loaded and call onLoad event handler
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            // Create a container for the DataGrid
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.style.padding = '10px';

            

            // Make authenticated request to fetch documents from the 3DEXPERIENCE services
            WAFData.authenticatedRequest('enovia/resources/v1/modeler/documents', {
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
                        console.log("rows",rows);
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
