define('MyWidget', [
  'UWA/Core',
  'UWA/Controls/DataGridView',
  'DS/DataDragAndDrop/DataDragAndDrop',
  'DS/WAFData/WAFData',
  'UWA/Drivers/Alone'
], function (UWA, DataGridView, DataDragAndDrop, WAFData) {
  'use strict';

  var myWidget = {
    onLoad: function () {
      var container = widget.body;
      container.empty();

      var grid = new DataGridView({
        className: 'document-grid',
        columns: [
          { text: 'Title', dataIndex: 'title', width: 300 },
          { text: 'Type', dataIndex: 'type', width: 100 },
          { text: 'Owner', dataIndex: 'owner', width: 150 },
          { text: 'Modified', dataIndex: 'modified', width: 150 }
        ],
        selectable: true
      });

      container.setContent(grid);

      // Call to platform to get document data
      WAFData.authenticatedRequest(
        '/resources/v1/modeler/documents?select=title,type,owner,modified&limit=50',
        {
          method: 'GET',
          type: 'json',
          onComplete: function (data) {
            var docs = data.member.map(function (doc) {
              return {
                id: doc.id,
                title: doc.title,
                type: doc.type,
                owner: doc.owner,
                modified: doc.modified
              };
            });

            grid.addRows(docs);
          },
          onFailure: function (error) {
            container.setContent('Error loading documents: ' + JSON.stringify(error));
          }
        }
      );
    }
  };

  widget.addEvent('onLoad', myWidget.onLoad);
  return myWidget;
});