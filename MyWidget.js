require([
  'UWA/Core',
  'UWA/Controls/DataGridView',
  'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'
], function (UWA, DataGridView, i3DXCompassPlatformServices) {

  const container = document.getElementById('testGridView');

  i3DXCompassPlatformServices.getPlatformTicket()
    .then((ticketInfo) => {
      const baseURL = ticketInfo.url;
      const ticket = ticketInfo.ticket;

      fetch(baseURL + '/resources/v1/modeler/documents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'SecurityContext': 'ctx::VPLMProjectLeader.Company Name.Default',
          'Authorization': 'Bearer ' + ticket
        }
      })
      .then(response => response.json())
      .then(data => {
        const docs = data.member || [];

        const rows = docs.map(doc => ({
          id: doc.id,
          name: doc.dataelements.title,
          type: doc.type,
          revision: doc.dataelements.revision,
          policy: doc.dataelements.policy
        }));

        const grid = new DataGridView({
          columns: [
            { text: 'Name', dataIndex: 'name' },
            { text: 'Type', dataIndex: 'type' },
            { text: 'Revision', dataIndex: 'revision' },
            { text: 'Policy', dataIndex: 'policy' }
          ],
          data: rows
        });

        grid.inject(container);
      })
      .catch(error => {
        container.innerHTML = 'Error fetching documents: ' + error.message;
      });
    });
});
