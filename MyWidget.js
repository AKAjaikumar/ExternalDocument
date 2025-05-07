require([
    'UWA/Core',
    'UWA/Drivers/Alone',
    'DS/WAFData/WAFData',
    'DS/i3DXCompassServices/i3DXCompassServices'
], function (UWA, Alone, WAFData, i3DXCompassServices) {
    if (typeof widget !== 'undefined') {
        widget.addEvent('onLoad', function () {
            console.log("Widget Loaded");

            // Set default context
            widget.setValue('ctx', {
                securityContext: 'ctx::VPLMProjectLeader.Company Collaborative Space.Role'
            });

            // Create and insert button
            const button = UWA.createElement('button', {
                text: 'Create Document',
                styles: {
                    padding: '10px',
                    background: '#0078d4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '10px'
                },
                events: {
                    click: function () {
                        const platformId = widget.getValue("x3dPlatformId");

                        i3DXCompassServices.getServiceUrl({
                            platformId: platformId,
                            serviceName: '3DSpace',
                            onComplete: function (URL3DSpace) {
                                let baseUrl = typeof URL3DSpace === "string" ? URL3DSpace : URL3DSpace[0].url;
                                if (baseUrl.endsWith('/3dspace')) {
                                    baseUrl = baseUrl.replace('/3dspace', '');
                                }

                                // Get CSRF token
                                const csrfURL = baseUrl + '/resources/v1/application/CSRF';
                                console.log("Getting CSRF from:", csrfURL);

                                WAFData.authenticatedRequest(csrfURL, {
                                    method: 'GET',
                                    type: 'json',
                                    onComplete: function (csrfData) {
                                        const csrfToken = csrfData.csrf.value;
                                        const csrfHeaderName = csrfData.csrf.name;
                                        console.log("CSRF Token:", csrfToken);

                                        // Create document
                                        const createDocURL = baseUrl + '/resources/v1/modeler/documents';
                                        const payload = {
                                            data: [{
                                                attributes: {
                                                    name: "Test_Document_" + Date.now(),
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

            document.body.appendChild(button);
        });
    } else {
        console.error('Widget object is not available');
    }
});
