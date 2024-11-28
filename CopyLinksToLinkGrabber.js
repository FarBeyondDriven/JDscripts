// Copy links back to LinkGrabber {by fbd}
// 
// Trigger : "DownloadList Contextmenu Button Pressed"
//
// Add a custom meny entry to the DownloadList Context menu, name it "Copy to LinkGrabber"
// (or to any other name, that you also need to customize below)

disablePermissionChecks();

if (name == "Copy to LinkGrabber") {
    var links = dlSelection.getDownloadLinks();

    for (i = 0; i < links.length; i++) {
        var link = links[i];

        var urls = []; // try to get all urls that the link has associated
        if (link.getContentURL()) { urls.push(link.getContentURL()); }
        if (link.getContainerURL()) { urls.push(link.getContainerURL()); }
        if (link.getOriginURL()) { urls.push(link.getOriginURL()); }
        if (link.getUrl()) { urls.push(link.getUrl()); }
        if (link.getPluginURL()) { urls.push(link.getPluginURL()); }
        
        var myFilePackage = link.getPackage();

        callAPI("linkgrabberv2", "addLinks", {
            "deepDecrypt": false,
            "packageName": myFilePackage.getName(),
            "destinationFolder": myFilePackage.getDownloadFolder(),
            "links": urls.join("\r\n")
        });
    }
}
