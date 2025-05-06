define('MyWidget', [
  'UWA/Core',
  'DS/DataGridView/DataGridView',
  'UWA/Controls/Abstract'
], function (UWA, DataGridView, Abstract) {
  'use strict';

  var MyWidget = Abstract.extend({
    setup: function () {
      console.log('MyWidget loaded');
      
    }
  });

  return MyWidget;
});
