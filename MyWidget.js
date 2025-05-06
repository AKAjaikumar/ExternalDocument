define('MyWidget', [
  'UWA/Core',
  'UWA/Controls/Abstract',
  'DS/DataGridView/DataGridView',
  'DS/DataGridView/Columns/ColumnText',
  'DS/DataGridView/DataGridModel',
  'DS/WAFData/WAFData'
], function (UWA, Abstract, DataGridView, ColumnText, DataGridModel, WAFData) {
  'use strict';

  var MyWidget = Abstract.extend({
    setup: function () {
		console.log("JS CALLED !");
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
  });

  return MyWidget;
});
