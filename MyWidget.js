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
			var container3 = new UWA.Element('div', {
                styles: {
                    padding: '15px'
                }
            }).inject(widget.body);
			var container4 = new UWA.Element('div', {
                styles: {
                    display: 'flex',
					flexDirection: 'column',
					padding: '10px',
					gap: '8px',
					border: '1px solid #ccc',
					width: '200px',
					marginBottom: '20px'
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
													

													const allFileIds = documentList.map(doc => ({
														id: doc.id,
														name: doc.dataelements?.name || 'N/A',
														type: doc.type || 'Document'
													}));
													console.log("Fetched Documents:", documentList);
													alert("Documents:\n" + JSON.stringify(documentList, null, 2));
													const promotePayload = {
														data: allFileIds.map(doc => ({
															id: doc.id,
															type: doc.type,
															transition: "Set to Frozen"
														}))
													};
													const promoteUrl = baseUrl + '/resources/lifecycle/maturity/promote';
													 WAFData.authenticatedRequest(promoteUrl, {
														method: 'POST',
														type: 'json',
														data: JSON.stringify(promotePayload),
														headers: {
															'Content-Type': 'application/json',
															'ENO_CSRF_TOKEN': csrfToken,
															'SecurityContext': 'VPLMProjectLeader.Company Name.APTIV INDIA'
														},
														onComplete: function (promotionResponse) {
															console.log("Promotion successful:", promotionResponse);
															alert("Promotion completed successfully.");
														},
														onFailure: function (err) {
															console.error("Promotion failed:", err);
															alert("Promotion failed. Check console.");
														}
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
			var connectBtn = new UWA.Element('button', {
				text: 'Connect Attached Document',
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

                                        const addAttachedDocURL = baseUrl + '/resources/v1/modeler/documents/?disableOwnershipInheritance=1&parentRelName=Reference Document&parentDirection=from';

										const payload = {
											csrf: {
												name: csrfHeaderName,
												value: csrfToken
											},
											data: [
												{
													id: '070DD5F7A8D022006809BB4D0002BE12', // The Document ID to connect
													relateddata: {
														parents: [
															{
																id: '4111F597B51B1000681B4FB50001A9A0', // The target parent object ID
																updateAction: 'CONNECT'
															}
														]
													},
													updateAction: 'NONE'
												}
											]
										};

											WAFData.authenticatedRequest(addAttachedDocURL, {
												method: 'POST',
												type: 'json',
												headers: {
													'Content-Type': 'application/json',
													[csrfHeaderName]: csrfToken,
													'Accept': 'application/json'
												},
												data: JSON.stringify(payload),
												onComplete: function (res) {
													console.log('Connected Reference Document:', res);
													alert('Document successfully connected as Reference Document!');
												},
												onFailure: function (err) {
													console.error("Failed to connect document:", err);
													alert('Failed to connect reference document.');
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
			}).inject(container3);
			var dropZone = new UWA.Element('div', {
				html: '<strong>Drop Objects Here</strong>',
				styles: {
					border: '2px dashed #0078d4',
					padding: '30px',
					textAlign: 'center',
					marginTop: '20px',
					background: '#f3f3f3',
					color: '#333'
				},
				events: {
					dragover: function (event) {
						event.preventDefault(); // Allow drop
						dropZone.setStyle('background', '#e0f0ff');
					},
					dragleave: function () {
						dropZone.setStyle('background', '#f3f3f3');
					},
					drop: function (event) {
						event.preventDefault();
						dropZone.setStyle('background', '#f3f3f3');

						var data = event.dataTransfer.getData('text');
						if (!data) {
							alert("No data dropped.");
							return;
						}

						console.log("Raw drop data:", data);

						try {
							var droppedPayload = JSON.parse(data);
							var droppedObjects = droppedPayload?.data?.items || [];
							if (!Array.isArray(droppedObjects)) droppedObjects = [droppedObjects];

							droppedObjects.forEach(async (obj) => {
								const objectId = obj.objectId;
								const objectType = obj.objectType;
								const displayName = obj.displayName;

							  
								const response = await fetch(`/3dspace/resources/v1/modeler/documents/${objectId}`, {
									method: 'GET',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'SecurityContext': obj.contextId // Important for cloud
									}
								});

								const fullData = await response.json();
								const info = fullData.data[0];

								const props = {
									Name: info.dataelements.title,
									ID: info.id,
									Type: info.type,
									Revision: info.dataelements.revision,
									Policy: info.policy,
									CollabSpace: info.collabspace
								};

								
								const { jsPDF } = window.jspdf;
								const doc = new jsPDF();
								doc.text("Document Properties", 10, 10);

								let y = 20;
								for (const key in props) {
									doc.text(`${key}: ${props[key] || 'N/A'}`, 10, y);
									y += 10;
								}

								const pdfBlob = doc.output("blob");

								
								const createResp = await fetch('/3dspace/resources/v1/modeler/documents', {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'SecurityContext': obj.contextId
									},
									body: JSON.stringify({
										data: [{
											type: "Document",
											attributes: {
												title: "Generated PDF - " + props.Name,
												policy: "Document",
												description: "Auto-created from drop",
											}
										}]
									})
								});

								const createData = await createResp.json();
								const newDocId = createData.data[0].id;

								
								const uploadUrlResp = await fetch(`/3dspace/resources/v1/modeler/documents/${newDocId}/files/Checkin`, {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'SecurityContext': obj.contextId
									},
									body: JSON.stringify({
										data: [{
											fileName: `Properties-${props.Name}.pdf`,
											fileSize: pdfBlob.size,
											title: "Properties PDF",
											version: "1.0"
										}]
									})
								});

								const uploadUrlData = await uploadUrlResp.json();
								const uploadURL = uploadUrlData.data[0].uploadURL;

								await fetch(uploadURL, {
									method: 'PUT',
									body: pdfBlob
								});

								alert(`New document created: ${props.Name}`);
							});

						} catch (err) {
							console.error("Failed to parse dropped data or process file:", err);
							alert("Error during document processing.");
						}
					}
				}
			}).inject(container4);
            // Inject the button into the widget container
            button.inject(container);
            button1.inject(container1);
        });
    } else {
        console.error('Widget object is not available');
    }
});
