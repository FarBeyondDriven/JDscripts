// Enable / disable links from predefined hosters in the download list at certain hours of the day (FBD)
// Customize the "nighDLhosts" list with the hosters to enable/disable
// Customize the nightHour and dayHour variables
// Trigger: Interval (default should be 3600000 which would be once every hour)

disablePermissionChecks();
setDisableOnException(false);

// customize here
// nightDLhosts: list of hosts to enable in the downloads tab
// nightHour: what hour of the day should the links be ENABLED
// dayHour: what hour of the day should the links be DISABLED

var nightDLhosts = ["1fichier.com","rapidgator.com","ddownload.com"];
var nightHour = 1;
var dayHour = 7;

function set_links(enable) {
    var myDownloadLinks = getAllDownloadLinks();
    myDownloadLinks.forEach(function(thisLink) {
        if (nightDLhosts.indexOf(thisLink.getHost()) === -1) return;
        if (thisLink.isFinished()) return;
        if (enable === thisLink.isEnabled()) return;
        if (thisLink.isRunning()) return;
        if (enable && thisLink.isSkipped()) thisLink.setSkipped(false);
        thisLink.setEnabled(enable);
    });
}

var accountsEnabled = callAPI("config", "get", "org.jdownloader.settings.GeneralSettings", null, "useavailableaccounts");
if (accountsEnabled) {
    var current = new Date();
    var hour = current.getHours();
    if (hour === nightHour) {
        set_links(true);
    } else if (hour === dayHour) {
        set_links(false);
    }
}
