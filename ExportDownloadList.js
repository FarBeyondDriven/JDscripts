// Export the list of download packages (FBD)
// Trigger : "Toolbar Button Pressed"

// Preparation:
// SAVE this script,
// SELECT the trigger "Toolbar Button Pressed" in the script list,
// EDIT script again, CLICK the "Main Toolbar" button above the script,
// CLICK the "+" button to create a new "Event Scripter Trigger",
// MOVE the button in the list to where you prefer,
// NAME the button to exactly "Export URLs" (without the quotes)
// hit SAVE

disablePermissionChecks();

if (name == "Export URLs") {
    setAdvancedAlert(true);

    var myFilePackage = getAllFilePackages();
    var urls = [];

    for (i = 0; i < myFilePackage.length; i++) {
        var package = myFilePackage[i];
        var lines = [];

        lines.push("\"" + package.getName() + "\"");

        var d = new Date(package.getAddedDate());
        lines.push("Added: " + d.toLocaleString());

        lines.push("Finished: " + package.isFinished());

        urls.push(lines.join(" - "));
    }

    // Uncomment to get a message box where you can copy the data
    // alert(urls.join("\r\n"));

    // Save data to a file in your default download folder
    var folder = callAPI("config", "get", "org.jdownloader.settings.GeneralSettings", null, "DefaultDownloadFolder");
    var date = new Date();
    var file = folder + "/" + date.toDateString().substr(4) + ".txt";
    writeFile(file, "Export " + date.toLocaleString() + "\r\n" + urls.join("\r\n") + "\r\n\r\n", true);
    alert("Package list stored in file " + file);
}
