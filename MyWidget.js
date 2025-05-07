require([
    'UWA/Core',
    'DS/WAFData/WAFData'
], function (UWA, WAFData) {

    if (typeof widget !== 'undefined') {

        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");
		widget.setValue('ctx', {
  securityContext: 'ctx::VPLMProjectLeader.Company Collaborative Space.Role'
});
			console.log("Context:", widget.getValue("ctx"));
			console.log("Platform ID:", widget.getValue("x3dPlatformId"));
			var platformId = widget.getValue("x3dPlatformId"); 
			var spaceURL = widget.getValue('x3dSpaceURL');
			console.log("spaceURL:", spaceURL);
			//var url = '/api/' + platformId + '/enovia/resources/v1/modeler/documents';
            var url = '/enovia/resources/v1/modeler/documents';
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.style.padding = '10px';
            WAFData.authenticatedRequest(url, {
				method: 'GET',
				type: 'json',
				onComplete: function (data) {
					if (data && data.member) {
						const rows = data.member.map(item => ({
							name: item.name,
							type: item.type,
							revision: item.revision
						}));
						console.log('Document Items:', rows);
					} else {
						console.warn('No Document Items found');
					}
				},
				onFailure: function (error) {
					console.error('Failed to fetch Document Items:', error);
				}
			});
        });
    } else {
        console.error('Widget object is not available');
    }
});
