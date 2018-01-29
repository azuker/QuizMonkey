var platformModule = require("platform");

var useLocalMockData = false;
var serverIsRemote = true;

var accessPath;

if (serverIsRemote) {
    accessPath = "192.168.10.85"; /* paste remote server address here */
}
else if (platformModule.device.os === platformModule.platformNames.ios) {
    accessPath = "localhost";
}
else if (platformModule.device.os === platformModule.platformNames.android) {
    accessPath = "10.0.2.2";
}

module.exports = {
    useMockData: useLocalMockData,
    apiUrl: "http://" + accessPath + ":3001/"
};