// Package sorter (FBD)
// Sorts links descending in the linkgrabber
// Special handling for TV Shows (parts descending, episodes ascending)
// Trigger : A new links has been added

disablePermissionChecks(); // uncomment if you know what you're doing

var levelRegex = /[^a-zA-Z0-9](S[0-9]{2}E[0-9]{2})/i;
var myCrawledPackages = [];
// myCrawledPackages = getAllCrawledPackages();
myCrawledPackages.push(crawledLink.getPackage());

myCrawledPackages.forEach(function(thisPackage) {
    var myCrawledLinks = thisPackage.getDownloadLinks();
    var fileHash = [];
    
    myCrawledLinks.forEach(function(thisLink) {
        var level = "";
        const matches = thisLink.getDownloadPath().match(levelRegex);
        if (matches) level = matches[1];
        if (!fileHash[level]) fileHash[level] = {};
        fileHash[level][thisLink.getDownloadPath()] = thisLink.getUUID();
    });
    
    // want episodes sorted descending too? remove the ".reverse()" here
    var sortedLevels = Object.keys(fileHash).sort().reverse();
    sortedLevels.forEach(function(thisLevel) {
        var sortedLinks = Object.keys(fileHash[thisLevel]).sort();
        sortedLinks.forEach(function(thisPath) {
            callAPI("linkgrabberv2", "moveLinks", [fileHash[thisLevel][thisPath]], -1, thisPackage.getUUID());
        });
    });
});
