require([
    'UWA/Core',
    'ExternalDocument/DS/DataGridView/DataGridView',
	'ExternalDocument/DS/DataGridView/Columns/ColumnText',
  'ExternalDocument/DS/DataGridView/DataGridModel',
  'ExternalDocument/DS/WAFData/WAFData'
], function (UWA, Abstract, DataGridView, ColumnText, DataGridModel, WAFData) {
    var myWidget = {
        onLoad: function() {
            console.log("Widget Loaded");
			var container = widget.body;
      container.setStyle('padding', '10px');
      container.innerHTML = ''; // Clear any existing content

      if (!container) {
        console.error("Container not found!");
        return;
      }

      // Set up model
      var model = new DataGridModel();

      // Set up DataGridView
      var gridView = new DataGridView({
        model: model,
        columns: [
          new ColumnText({ text: 'Name', dataIndex: 'name', sortable: true }),
          new ColumnText({ text: 'Type', dataIndex: 'type', sortable: true }),
          new ColumnText({ text: 'Revision', dataIndex: 'revision', sortable: true })
        ]
      });

      // Inject the grid into the container
      gridView.inject(container);

      // Call OOTB Document service to get documents
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
            model.addRows(rows); // Add rows to the model
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
