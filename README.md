# JDscripts
JDownloader Event Scripter Scripts

For more scripts and examples check out the JDownloader forum thread for Event Scripts:

  -> https://board.jdownloader.org/showthread.php?t=70525

and the new dedicated sub-forum for user created scripts:
  
  -> https://board.jdownloader.org/forumdisplay.php?f=52

### CopyLinksToLinkGrabber.js

Copies selected links in the download list back to the linkgrabber.

### ExportDownloadList.js

Exports a short list of all packages in the download list and saves it in your default download folder (appends if the file already exists).

### UnskipDownloads.js

Unskips downloads that got automatically skipped for different reasons, examples provided for possible reasons.

### ConvertToMP3.js

Simple script to automatically convert specific filetypes to mp3 after downlaoding.

### ForceReconnectOnIdle.js

Force trigger the reconnect function in jDownloader if downloads are stalled for 3 minutes.

### CheckFilesExists.js

Script for a toolbar button to check if files in download list already exist and disable/remove them before starting downloads.

### ResetLinksOnPluginDefect.js

Script to reset links on plugin defect messages. Set Interval Trigger.

### PauseDownloadsDuringExtraction.js

Pauses running downloads during archive extraction. Only use if you have resumable downloads or you don't care for downloads restarting.

### MoveMirrorLinks.js

Moves mirror links to a separate package if download started, even when those links are in a different package and/or disabled.

### PackageSorter.js

Sorts files in packages descending with special handling for TV shows (part files descending, episodes ascending)

### enableHostsAtNight.js

Enables predefined hosters at night and disables them again in the morning for automated, unattended downloads

## Tools

### jdownloader_api_connect.pl (perl)

Example script to initiate encrypted communication with the MyJdownloader API.
