// Unskip skipped downloads
// Trigger: Interval

// Create a new empty script, name it appropriately and paste this code
// Save the file and set a trigger interval for the check to be executed

disablePermissionChecks();

var downloads = getAllDownloadLinks();
for (a = 0; a < downloads.length; a++) {
    if (downloads[a].isEnabled()) {
            if ((downloads[a].getStatus() == "403 GEO-blocked"
                 // other conditions, enable as needed
                 // || downloads[a].getStatus() == "Retry in 15 minutes"
                 // || downloads[a].getStatus() == "Blocked by Firewall, ISP"

                 // but usually it's better to not rely on the status text as it will be different when jdownloader is not set to english
                 // use the FinalLinkStatus instead, possible status types: "FINISHED,"FAILED","FAILED_CRC32","FAILED_MD5","FAILED_SHA1","FAILED_EXISTS","FAILED_FATAL,"OFFLINE,"PLUGIN_DEFECT""
                 // || downloads[a].getFinalLinkStatus() == "FAILED"
                 )
                 // enable if you only want this action for specific hosts
                 // && ( downloads[a].getHost() == "zippyshare.com"
                 // || downloads[a].getHost() == "rapidgator.com"
                 // )
                ) {

                downloads[a].setSkipped(true);
                sleep(1000);
                downloads[a].setSkipped(false);
            }
    }
}
