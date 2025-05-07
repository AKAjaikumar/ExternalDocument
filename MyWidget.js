require([
    'UWA/Core',
    'DS/WAFData/WAFData',
	'DS/i3DXCompassServices/i3DXCompassServices'
], function (UWA, WAFData, i3DXCompassServices) {
	var URL;
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
			i3DXCompassServices.getServiceUrl({
    serviceName: 'ENOVIA3DSpace',
    onComplete: function (enoviaBaseUrl) {
        const url = enoviaBaseUrl + '/resources/v1/modeler/documents';

                    console.log("Resolved 3DSpace URL:", enoviaBaseUrl);

                    // Call the documents API
                   // const url = baseUrl + '/resources/v1/modeler/documents';

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
                },
                onFailure: function () {
                    console.error('Failed to get 3DSpace URL');
                }
            });
        });
    } else {
        console.error('Widget object is not available');
    }
});
