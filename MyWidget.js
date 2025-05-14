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
				html: '<strong>Drop Documents Here</strong>',
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

							if (droppedObjects.length === 2) {
								// Fetch the document data for both dropped objects
								Promise.all(droppedObjects.map(function (obj) {
									return fetchDocumentData(obj.objectId);
								})).then(function (docs) {
									// docs contains both documents' data
									const doc1 = docs[0];
									const doc2 = docs[1];

									// Merge the document data into a table format
									const mergedContent = mergeDocumentsIntoTable(doc1, doc2);

									// Generate PDF from the merged content
									generatePDF(mergedContent).then(function (pdfData) {
										// Create a new document and upload the merged PDF
										createDocumentWithPDF(pdfData).then(function (response) {
											alert("Document created and checked in successfully!");
										}).catch(function (err) {
											console.error("Failed to create or check in the document:", err);
										});
									}).catch(function (err) {
										console.error("Failed to generate PDF:", err);
									});
								}).catch(function (err) {
									console.error("Failed to fetch document data:", err);
								});
							} else {
								alert("Please drop exactly two documents.");
							}

						} catch (err) {
							console.error("Failed to parse dropped data or process file:", err);
							alert("Error: Failed to process dropped data.");
						}
					}
				}
			}).inject(container4);


			function fetchDocumentData(docId) {
				return new Promise(function (resolve, reject) {
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

									const docURL = baseUrl + '/resources/v1/modeler/documents/' + docId;
									WAFData.authenticatedRequest(docURL, {
										method: 'GET',
										type: 'json',
										headers: {
											'Content-Type': 'application/json',
											[csrfHeaderName]: csrfToken
										},
										onComplete: function (docData) {
										console.log("Fetched docData for ID", docId, docData);
											if (docData.data && docData.data.length > 0) {
												resolve(docData.data[0]);  // Return first document object
											} else {
												reject("No document data returned");
											}
										},
										onFailure: function (err) {
											reject(err);
										}
									});
								},
								onFailure: function (err) {
									reject(err);
								}
							});
						},
						onFailure: function () {
							reject("Failed to get 3DSpace URL");
						}
					});
				});
			}


			function mergeDocumentsIntoTable(doc1, doc2) {
				const headers = ["Name", "Policy", "State"];
				const rows = [
					[doc1.dataelements.name, doc1.dataelements.policy, doc1.dataelements.state],
					[doc2.dataelements.name, doc2.dataelements.policy, doc2.dataelements.state]
				];

				return { headers, rows };
			}


			async function ensureJsPDFLoaded() {
			  if (typeof window.jsPDF !== 'function') {
				await new Promise((resolve, reject) => {
				  const script = document.createElement('script');
				  script.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.min.js';
				  script.onload = resolve;
				  script.onerror = (e) => reject(new Error('Failed to load jsPDF: ' + e.message));
				  document.head.appendChild(script);
				});
			  }

			  // Load AutoTable plugin
			  if (!window.jsPDF.API.autoTable) {
				await new Promise((resolve, reject) => {
				  const script = document.createElement('script');
				  script.src = 'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.28/dist/jspdf.plugin.autotable.min.js';
				  script.onload = resolve;
				  script.onerror = (e) => reject(new Error('Failed to load AutoTable plugin: ' + e.message));
				  document.head.appendChild(script);
				});
			  }
			}

			async function generatePDF(content) {
			  try {
				if (!content.headers || !content.rows || !Array.isArray(content.headers) || !Array.isArray(content.rows)) {
				  throw new Error('Invalid content format. Expected object with "headers" and "rows" arrays.');
				}

				await ensureJsPDFLoaded();

				const { jsPDF } = window.jspdf;
				const doc = new jsPDF();

				doc.autoTable({
				  head: [content.headers],
				  body: content.rows
				});

				return doc.output('blob');
			  } catch (err) {
				console.error('Failed to generate PDF:', err);
				throw err;
			  }
			}


			function createDocumentWithPDF(pdfData) {
				return new Promise(function (resolve, reject) {
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
												name: "Merged_Document_" + Date.now(),
												type: "Document",
												policy: "Document Release"
											}
										}]
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
											const docId = response.data[0].id;

											// Assuming an API endpoint to upload a PDF file to the newly created document
											const uploadUrl = baseUrl + `/resources/v1/modeler/documents/${docId}/attachments`;
											const formData = new FormData();
											formData.append('file', pdfData);

											WAFData.authenticatedRequest(uploadUrl, {
												method: 'POST',
												headers: {
													[csrfHeaderName]: csrfToken
												},
												data: formData,
												onComplete: function () {
													// Check in the document if needed
													const checkInUrl = baseUrl + `/resources/v1/modeler/documents/${docId}/checkin`;
													WAFData.authenticatedRequest(checkInUrl, {
														method: 'POST',
														headers: {
															[csrfHeaderName]: csrfToken
														},
														onComplete: function () {
															resolve(response);
														},
														onFailure: function (err) {
															reject("Failed to check in the document: " + err);
														}
													});
												},
												onFailure: function (err) {
													reject("Failed to upload PDF: " + err);
												}
											});
										},
										onFailure: function (err) {
											reject("Failed to create document: " + err);
										}
									});
								},
								onFailure: function (err) {
									reject("Failed to fetch CSRF token: " + err);
								}
							});
						},
						onFailure: function () {
							reject("Failed to get 3DSpace URL");
						}
					});
				});
			}
            // Inject the button into the widget container
            button.inject(container);
            button1.inject(container1);
        });
    } else {
        console.error('Widget object is not available');
    }
});
