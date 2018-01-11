var frameModule = require("ui/frame");

exports.startupView = function () {
    // return "views/welcome-view/welcome-view";
    return "views/quiz-list-view/quiz-list-view";
    // changeBack welcome YS
}

exports.goToQuizList = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/quiz-list-view/quiz-list-view");
}
