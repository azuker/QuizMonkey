var frameModule = require("ui/frame");

exports.startupView = function () {
    return "views/welcome-view/welcome-view";
}

exports.goToQuizList = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/quiz-list-view/quiz-list-view");
}
