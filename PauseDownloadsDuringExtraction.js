/* 
    Stop downloads during extraction (fbd)
    Trigger Required: Any Extraction Event
*/

if (isDownloadControllerRunning() && event == "EXTRACTING") {
    // Extraction starting and download runnning
    stopDownloads();

} else if (!isDownloadControllerRunning() && event == "CLEANUP") {
    // Restart downloads
    startDownloads();
}
