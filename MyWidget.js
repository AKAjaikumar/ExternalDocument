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
			initializePreferences : function () {
                i3DXCompassServices.getServiceUrl( { 
                    serviceName: '3DCompass',
                    onComplete : exports.onServiceURLComplete,
                    onFailure  : function () {
                        widget.body.innerHTML="URLIssue: Please check with your administrator";
                    } });
            },
            onServiceURLComplete : function(URL3DSpace) {
                if ( typeof URL3DSpace  === "string" ) {
                    URL=URL3DSpace;
                }else if ( typeof URL3DSpace  === "object" ) {
                    URL=URL3DSpace[0].url;
                }
                //remove ../3dspace from url
                URL = URL.substring(0, URL.length-8);
				exports.getWareHouseFilter();
                exports.getDataTable();
				
            }
			console.log("spaceURL:", spaceURL);
			//var url = '/api/' + platformId + '/enovia/resources/v1/modeler/documents';
            var url = 'https://r1132100433648-ap2-space.3dexperience.3ds.com/enovia/resources/v1/modeler/documents';
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
