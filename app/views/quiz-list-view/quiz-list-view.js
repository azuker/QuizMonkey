var QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');
var observableModule = require("data/observable");
var config = require("../../shared/config");

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