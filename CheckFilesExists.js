// Check if files in download list already exist and disable or remove link without starting downloads (FBD)
// Trigger : "Toolbar Button Pressed"
// Toolbar Button Name: "FileCheck"

// Uncomment if you know what you're doing
// disablePermissionChecks();

if (name == "FileCheck") {
    var myFilePackage = getAllFilePackages();
    var folders = [];
    var report = [];

    // Uncomment to ADDITIONALLY check if file exists in these folders
    // folders.push("/media/download","D:/Downloads","C:/Downloads2");

    var myDownloadLinks = getAllDownloadLinks();
    for (a = 0; a < myDownloadLinks.length; a++) {

        var link = myDownloadLinks[a];
        var myFilePackage = link.getPackage();
        var linkName = link.getName();
        
        var allfolders = folders;
        allfolders.push(myFilePackage.getDownloadFolder()); // regular download folder

        allfolders.forEach(function(folder) {
            // uncomment to ignore disabled links
            //if (!link.isEnabled()) return;

            var file = getPath(folder + "/" + linkName);
            if (!file.exists()) return;
        
            report.push("Package \"" + myFilePackage.getName()
                        + "\" Folder: \"" + folder + "\""
                        + "\" File: \"" + linkName + "\""
                        );

            // Deactivate Link
            link.setEnabled(false);
        
            // Uncomment to also remove link from download list
            // link.remove();
        });
    }
    
    // comment this if you don't want to see a report
    if (report.length > 0) {
        setAdvancedAlert(true);
        alert("The following links have been disabled because the files already exist:\n\n" + report.join("\n"));
    } else {
        alert("Check completed. No existing files found.");
    }
}
