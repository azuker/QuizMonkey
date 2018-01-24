var platformModule = require("platform");

var localHostAccessPath;

if (platformModule.device.os === platformModule.platformNames.ios) {
    localHostAccessPath = "localhost";
}
else if (platformModule.device.os === platformModule.platformNames.android) {
    localHostAccessPath = "10.0.2.2";
}

module.exports = {
    useLocalData: false,
    apiUrl: "http://" + localHostAccessPath + ":3001/"
};