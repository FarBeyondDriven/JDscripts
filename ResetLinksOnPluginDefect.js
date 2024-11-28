// Handle download errors (FBD)
// Trigger Required: Interval

var links = getAllDownloadLinks();

for (i = 0; i < links.length; i++) {
    
    var link = links[i];
    
    if (link.getStatus()) {
        if (link.isEnabled() 
            && (link.getFinalLinkStatus() == "ERROR_FATAL"
            || link.getFinalLinkStatus() == "HOSTER_UNAVAILABLE"
            || link.getFinalLinkStatus() == "CONNECTION_ISSUES"
            || link.getFinalLinkStatus() == "FAILED"
            || link.getFinalLinkStatus() == "FAILED_FATAL")) {

            // Force the download
            // callAPI("downloadsV2", "forceDownload", [link.getUUID()], []);

            // Reset the download (WARNING: Will discard already downloaded data)
            link.reset();

            // Disable the download
            // link.setEnabled(false);
            
            // Start downloads in case all downloads finished
            // startDownloads();
        }
    }
}
