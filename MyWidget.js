window.onload = function() {
    console.log("Widget loaded from JS!");

    // Ensure widget object is available (which should be injected by 3DEXPERIENCE)
    if (typeof widget !== 'undefined') {
        var container = widget.body;
        if (!container) {
            console.error("Container not found!");
            return;
        }

        container.innerHTML = '';
        container.innerHTML = '<div style="padding:10px;">Hello from 3DEXPERIENCE widget!</div>';
    } else {
        console.error("Widget object is not available.");
    }
};
