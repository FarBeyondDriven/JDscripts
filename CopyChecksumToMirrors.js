// When adding a Package to the download list, check if checksums are available
// and set the checksum to mirrors based on the filename {{FBD}}
//
// Note: Just if the filename is the same, there is no 100% guarantee that the file is *actually* the same!
//
// TRIGGER: Remote API Event Fired
//

disablePermissionChecks();
setDisableOnException(false);
setNotifyOnException(false);

function hash_check(eventData) {
    if (!eventData || !eventData.uuid) return;

    var myFilePackage = getDownloadPackageByUUID(eventData.uuid);
    if (!myFilePackage) return;

    var knownHashes = {};
    myFilePackage.getDownloadLinks().forEach(function(link) {
        var hashInfo = link.getProperty("HASHINFO");
        if (hashInfo == null) return;
        knownHashes[link.getDownloadPath()] = hashInfo;
    });

    myFilePackage.getDownloadLinks().forEach(function(link) {
        var hashInfo = link.getProperty("HASHINFO");
        if (hashInfo != null) return;
        if (knownHashes.hasOwnProperty(link.getDownloadPath())) {
            link.setProperty("HASHINFO",knownHashes[link.getDownloadPath()]);
        }
    });
}

if (event.getPublisher() == "downloads" && event.getId() == "ADD_PACKAGE") hash_check(JSON.parse(event.getData()));
