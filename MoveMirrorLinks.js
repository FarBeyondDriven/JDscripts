// Move mirrors (even disabled ones) for running downloads (FBD)
// Trigger : Interval (900000 = 15 mins seems good)

disablePermissionChecks();

var myDownloadLinks = getAllDownloadLinks();
var linkids = [];
var runningPackageName = "Running";

myDownloadLinks.forEach(function(link) {
    if (link.getBytesLoaded() > 0) { // File is loading
        return;
    }
    
    // already moved?
    var myFilePackage = myDownloadLink.getPackage();
    if (myFilePackage.getName() == runningPackageName) {
        return;
    }
    
    // check it
    var dlfile = getPath(link.getDownloadPath() + ".part");
    var dlsize = dlfile.getSize();
    if (dlsize > 0) { // download has started from mirror link
        link.setEnabled(false);
        linkids.push(link.UUID);
    }
});

if (linkids.length > 0) { // links found
    // find target package
    var target_package_id;
    getAllFilePackages().forEach(function(package) {
        // find target package
        if (package.getName() == runningPackageName) {
            target_package_id = package.getUUID();
        }
    });

    // move to existing package or create new one if not exists
    if (target_package_id) { // existing package
        linkids.sort().forEach(function(linkId) {
            callAPI("downloadsV2", "moveLinks", [linkId], -1, target_package_id);
        });
    } else { // create package
         callAPI("downloadsV2", "movetoNewPackage", linkids, null, runningPackageName, "");
    }
}
