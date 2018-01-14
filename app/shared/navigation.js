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

exports.goToQuestionView = function (quiz, index) {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: 'views/question-view/question-view',
        context: { quiz: quiz, currentQuestionIndex: index },
        backstackVisible: false,
        transition: {
            name: "slide",
            duration: 350,
            curve: "easeIn"
        }
    });
}