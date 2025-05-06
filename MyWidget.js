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

      var container = document.getElementById('testGridView');
      if (!container) {
        console.error("Container not found!");
        return;
      }

      var model = new DataGridModel();

      var gridView = new DataGridView({
        model: model,
        columns: [
          new ColumnText({ text: 'Name', dataIndex: 'name', sortable: true }),
          new ColumnText({ text: 'Type', dataIndex: 'type', sortable: true }),
          new ColumnText({ text: 'Revision', dataIndex: 'revision', sortable: true })
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
            model.addRows(rows);
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
