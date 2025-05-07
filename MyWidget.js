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
  securityContext: 'ctx::VPLMProjectLeader.Company Name.APTIV INDIA'
});
			console.log("Context:", widget.getValue("ctx"));
			console.log("Platform ID:", widget.getValue("x3dPlatformId"));
			var platformId = widget.getValue("x3dPlatformId"); 
			var spaceURL = widget.getValue('x3dSpaceURL');
			console.log("spaceURL:", spaceURL);
			i3DXCompassServices.getServiceUrl({
				platformId: platformId,
                serviceName: '3DSpace',
                onComplete: function (URL3DSpace) {
					
                    let baseUrl;
                    if (typeof URL3DSpace === "string") {
                        baseUrl = URL3DSpace;
                    } else if (typeof URL3DSpace === "object" && URL3DSpace[0]) {
                        baseUrl = URL3DSpace[0].url;
                    }

                    // Remove /3dspace if present
                    if (baseUrl.endsWith('/3dspace')) {
                        baseUrl = baseUrl.replace('/3dspace', '');
                    }

                    console.log("Resolved 3DSpace URL:", baseUrl);
				  WAFData.authenticatedRequest(
						enoviaBaseUrl + '/resources/modeler/pno/csrf', {
							method: 'GET',
							type: 'json',
							onComplete: function (csrfData) {
								const csrfToken = csrfData.csrf.value;
								const csrfHeaderName = csrfData.csrf.name;
								console.log("CSRF Token:", csrfToken);
                    // Call the documents API
                    const url = baseUrl + '/resources/v1/modeler/documents';

                    WAFData.authenticatedRequest(
                            enoviaBaseUrl + '/resources/modeler/pno/csrf', {
                                method: 'GET',
                                type: 'json',
                                onComplete: function (csrfData) {
                                    const csrfToken = csrfData.csrf.value;
                                    const csrfHeaderName = csrfData.csrf.name;
                                    console.log("CSRF Token:", csrfToken);

                                    // Step 2: Fetch Document Items using CSRF Token
                                    const url = enoviaBaseUrl + '/resources/v1/modeler/documents';
                                    WAFData.authenticatedRequest(url, {
                                        method: 'POST',
                                        type: 'json',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            [csrfHeaderName]: csrfToken // Include CSRF token in header
                                        },
                                        data: JSON.stringify({
                                            select: ['name', 'type', 'revision'],
                                            top: 20
                                        }),
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
                                onFailure: function (error) {
                                    console.error('Failed to fetch CSRF token:', error);
                                }
                            }
                        );
                    } else {
                        console.error('No 3DSpace services found.');
                    }
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
