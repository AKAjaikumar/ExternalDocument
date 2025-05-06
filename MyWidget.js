define('MyWidget', [
  'UWA/Core',
  'DS/DataGridView/DataGridView',
  'UWA/Controls/Abstract'
], function (UWA, DataGridView, Abstract) {
  'use strict';

  var myWidget = {
        onLoad: function() {

            var container = widget.body;
            container.innerHTML = '';
            if (!container) {
                console.error("Container #testGridView not found!");
                return;
            }
            var wrapper = UWA.createElement('div', {
                class: 'grid-wrapper',
                styles: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%' // Full height of the widget
                }
            });

            var toolbar = UWA.createElement('div', {
                class: 'toolbar',
                styles: {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '10px',
                    padding: '8px',
                    flex: 'none',
                    minHeight: '40px',
                    background: '#f8f8f8',
                    borderBottom: '1px solid #ddd',
                    position: 'relative', 
                    zIndex: 10 
                }
            });

            var addButton = UWA.createElement('button', {
                text: 'Add EIN',
                styles: {
                    padding: '6px 12px',
                    background: '#0073E6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                },
                events: {
                    click: function() {
                        var selectedNodes = doc.getSelectedNodes();

                        if (selectedNodes.length === 0) {
                            alert("No rows selected!");
                            return;
                        }

                        // Extract data from selected rows
                        var selectedData = selectedNodes.map(function(node) {
                            return {
                                name: node.getLabel(),
                                quantity: node.options.grid.quantity
                            };
                        });

                        // Do something with the selectedData
                        console.log("Selected EINs:", selectedData);


                        alert("Selected:\n" + selectedData.map(d => `Name --- ${d.name}: Qty ---- ${d.quantity}`).join("\n"));
                    }
                }
            });

            addButton.inject(toolbar);
        }
  }
  return MyWidget;
});
