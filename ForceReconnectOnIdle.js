// Force reconnect if no downloads for 3 minutes (FBD)
// Activate trigger: Interval -> 300000 (should be > 3 minutes)

var trigger = 0;

for (var i = 0; i < 3; i++) {
    var avgSpeed = getAverageSpeed();
    if (avgSpeed > 0) break;
    trigger++;
    sleep(60000)
}

if (trigger == 3) {
    // 3 minutes without average download speed - trigger reconnect
    doReconnect();   
}
