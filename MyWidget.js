require([
        'UWA/Core',
        'UWA/Drivers/Alone',
        'DS/WAFData/WAFData',
        'DS/i3DXCompassServices/i3DXCompassServices'
    ], function (UWA, Alone, WAFData, i3DXCompassServices) {
    if (typeof widget !== 'undefined') {
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            widget.body.empty();
            var container = new UWA.Element('div', {
                styles: {
                    padding: '15px'
                }
            }).inject(widget.body);
            var container1 = new UWA.Element('div', {
                styles: {
                    padding: '15px'
                }
            }).inject(widget.body);
			var container2 = new UWA.Element('div', {
                styles: {
                    padding: '15px'
                }
            }).inject(widget.body);
			const platformId = widget.getValue("x3dPlatformId");
            // Create button inside widget.body
            var button = new UWA.Element('button', {
                text: 'Create Document',
                styles: {
                    padding: '10px 15px',
                    background: '#0078d4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                },
                events: {
                    click: function () {
                       
                        i3DXCompassServices.getServiceUrl({
                            platformId: platformId,
                            serviceName: '3DSpace',
                            onComplete: function (URL3DSpace) {
                                let baseUrl = typeof URL3DSpace === "string" ? URL3DSpace : URL3DSpace[0].url;
                                if (baseUrl.endsWith('/3dspace')) {
                                    baseUrl = baseUrl.replace('/3dspace', '');
                                }

                                const csrfURL = baseUrl + '/resources/v1/application/CSRF';

                                WAFData.authenticatedRequest(csrfURL, {
                                    method: 'GET',
                                    type: 'json',
                                    onComplete: function (csrfData) {
                                        const csrfToken = csrfData.csrf.value;
                                        const csrfHeaderName = csrfData.csrf.name;

                                        const createDocURL = baseUrl + '/resources/v1/modeler/documents';
                                        const payload = {
                                            data: [{
                                                    attributes: {
                                                        name: "Test_Document_" + Date.now(),
                                                        type: "Document",
                                                        policy: "Document Release"
                                                    }
                                                }
                                            ]
                                        };

                                        WAFData.authenticatedRequest(createDocURL, {
                                            method: 'POST',
                                            type: 'json',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                [csrfHeaderName]: csrfToken
                                            },
                                            data: JSON.stringify(payload),
                                            onComplete: function (response) {
                                                console.log("Document Created:", response);
                                                alert("Document created successfully!");
                                            },
                                            onFailure: function (err) {
                                                console.error("Failed to create document:", err);
                                                alert("Failed to create document.");
                                            }
                                        });
                                    },
                                    onFailure: function (err) {
                                        console.error("Failed to fetch CSRF token:", err);
                                    }
                                });
                            },
                            onFailure: function () {
                                console.error("Failed to get 3DSpace URL");
                            }

                        });
                    }
                }
            });
            var button1 = new UWA.Element('button', {
                text: 'GET Attachment',
                styles: {
                    padding: '10px 15px',
                    background: '#0078d4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                },
                events: {
                    click: function () {
                    
                        i3DXCompassServices.getServiceUrl({
                            platformId: platformId,
                            serviceName: '3DSpace',
                            onComplete: function (URL3DSpace) {
                                let baseUrl = typeof URL3DSpace === "string" ? URL3DSpace : URL3DSpace[0].url;
                                if (baseUrl.endsWith('/3dspace')) {
                                    baseUrl = baseUrl.replace('/3dspace', '');
                                }

                                const csrfURL = baseUrl + '/resources/v1/application/CSRF';

                                WAFData.authenticatedRequest(csrfURL, {
                                    method: 'GET',
                                    type: 'json',
                                    onComplete: function (csrfData) {
                                        const csrfToken = csrfData.csrf.value;
                                        const csrfHeaderName = csrfData.csrf.name;

                                        const createDocURL = baseUrl + '/resources/v1/modeler/documents/parentId/4111F597B51B1000681B4FB50001A9A0?parentRelName=Reference Document&parentDirection=from&$fields=indexedImage,indexedTypeicon,isDocumentType,organizationTitle,isLatestRevision,!parentId';

                                        WAFData.authenticatedRequest(createDocURL, {
                                            method: 'GET',
                                            type: 'json',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                [csrfHeaderName]: csrfToken
                                            },
                                            onComplete: function (response) {
												 if (response && response.data && response.data.length > 0) {
													const documentList = response.data || [];
													let allFileIds = [];

													documentList.forEach(doc => {
														const docId = doc.id || 'N/A';
														const docName = doc.dataelements?.name || 'N/A';

														allFileIds.push({
															id: docId,
															name: docName
														});
													});

													alert(`Document List: ${JSON.stringify(allFileIds, null, 2)}`);
												} else {
													console.warn('No document found');
													alert("No document data found.");
												}
											},
											onFailure: function (err) {
												console.error("Failed to get attachments:", err);
												alert("Failed to get attachments.");
											}
                                        });
                                    },
                                    onFailure: function (err) {
                                        console.error("Failed to fetch CSRF token:", err);
                                    }
                                });
                            },
                            onFailure: function () {
                                console.error("Failed to get 3DSpace URL");
                            }

                        });
                    }
                }
            });
			var promoteBtn = new UWA.Element('button', {
				text: 'Promote Attached Document',
				styles: {
					padding: '10px 15px',
					background: '#28a745',
					color: '#fff',
					border: 'none',
					borderRadius: '5px',
					marginLeft: '10px',
					cursor: 'pointer'
				},
				events: {
					click: function () {
                        
                        i3DXCompassServices.getServiceUrl({
                            platformId: platformId,
                            serviceName: '3DSpace',
                            onComplete: function (URL3DSpace) {
                                let baseUrl = typeof URL3DSpace === "string" ? URL3DSpace : URL3DSpace[0].url;
                                if (baseUrl.endsWith('/3dspace')) {
                                    baseUrl = baseUrl.replace('/3dspace', '');
                                }

                                const csrfURL = baseUrl + '/resources/v1/application/CSRF';

                                WAFData.authenticatedRequest(csrfURL, {
                                    method: 'GET',
                                    type: 'json',
                                    onComplete: function (csrfData) {
                                        const csrfToken = csrfData.csrf.value;
                                        const csrfHeaderName = csrfData.csrf.name;

                                        const createDocURL = baseUrl + '/resources/v1/modeler/documents/parentId/4111F597B51B1000681B4FB50001A9A0?parentRelName=Reference Document&parentDirection=from&$fields=indexedImage,indexedTypeicon,isDocumentType,organizationTitle,isLatestRevision,!parentId';

                                        WAFData.authenticatedRequest(createDocURL, {
                                            method: 'GET',
                                            type: 'json',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                [csrfHeaderName]: csrfToken
                                            },
                                            onComplete: function (response) {
												 if (response && response.data && response.data.length > 0) {
													const documentList = response.data || [];
													let allFileIds = [];

													documentList.forEach(doc => {
														const docId = doc.id || 'N/A';
														const promoteUrl = baseUrl + '/resources/v1/modeler/documents/parentId/'+docId+'/promote';
														 WAFData.authenticatedRequest(promoteUrl, {
															method: 'POST',
															type: 'json',
															headers: {
																'Content-Type': 'application/json',
																[csrfHeaderName]: csrfToken
															},
															onComplete: function (response) {
																console.log('Promote Success:', response);
																alert("Document promoted to next state.");
															},
															onFailure: function (err) {
																console.error("Promote failed:", err);
																alert("Failed to promote document.");
															}
														});
													});
                                                    
                                                } else {
                                                    console.warn('No document found');
                                                    alert("No document data found.");
                                                }
											},
											onFailure: function (err) {
												console.error("Failed to get attachments:", err);
												alert("Failed to get attachments.");
											}
                                        });
                                    },
                                    onFailure: function (err) {
                                        console.error("Failed to fetch CSRF token:", err);
                                    }
                                });
                            },
                            onFailure: function () {
                                console.error("Failed to get 3DSpace URL");
                            }

                        });
                    }
				}
			}).inject(container2);
            // Inject the button into the widget container
            button.inject(container);
            button1.inject(container1);
        });
    } else {
        console.error('Widget object is not available');
    }
});
