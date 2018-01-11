var QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');
var observableModule = require("data/observable");
var config = require("../../shared/config");
var QuizViewModel = require('../../shared/view-models/quiz-view-model');

var vm = new QuizListViewModel();
var quizListData = new observableModule.fromObject({
    quizList: vm
})

exports.onQuizListPageLoaded = function (args) {
    page = args.object;
    page.bindingContext = quizListData;
    quizListData.set("isLoading", true);
    vm.clearQuizzes();
    vm.loadQuizzes().then(function () {
        quizListData.set("isLoading", false);
    });
};

exports.onSelectQuiz = function (args) {
    var selectedQuizData = args.view.bindingContext;
    var quiz = new QuizViewModel(selectedQuizData);
    quizListData.set("isLoading", true);
    quiz.loadQuestions().then(function () {
        quizListData.set("isLoading", false);
        // var quizLength = quiz.questions.length;
        // if (quizLength > 0) {
        //     console.log("loaded " + quizLength + " questions to quiz. Soon navigation to questions will be possible.");
        // }
        // else {
        //     dialogs.alert("No questions were found for this quiz. Please try another one.").then(function () {
        //         console.log("error loading questions. notification dialog closed.");
        //     });
        // }
    });
}

// exports.onSelectQuiz = function (args) {
//     var selectedQuizData = args.view.bindingContext;
    // var quiz = new QuizViewModel(selectedQuizData);
    // quizListData.set("isLoading", true);
    // quiz.loadQuestions().then(function () {
    //     quizListData.set("isLoading", false);
    //     var quizLength = quiz.questions.length;
    //     if (quizLength > 0) {
    //         navigationModule.goToQuestionView(quiz, 0);
    //     }
    //     else {
    //         dialogs.alert("No questions were found for this quiz. Please try another one.").then(function () {
    //             console.log("error loading questions. notification dialog closed.");
    //         });
    //     }
    // });
// }