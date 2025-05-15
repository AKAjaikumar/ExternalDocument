define([
  'https://akajaikumar.github.io/ExternalDocument/assets/jspdf.umd.min.js',
  'https://akajaikumar.github.io/ExternalDocument/assets/jspdf.plugin.autotable.min.js'
], function (jspdf) {
  'use strict';

  const { jsPDF } = jspdf;

  return {
    initialize: function () {
      console.log("MyWidget initialized");
      var doc = new jsPDF();
      doc.text("Hello from 3DEXPERIENCE widget!", 10, 10);
      // Save or do more
    }
  };
});
