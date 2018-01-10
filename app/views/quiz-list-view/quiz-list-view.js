var QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');
var observableModule = require("data/observable");

var vm = new QuizListViewModel();
var quizListData = new observableModule.fromObject({
    quizList: vm
})

exports.onQuizListPageLoaded = function (args) {
    page = args.object;
    page.bindingContext = quizListData;
    vm.clearQuizzes();
    vm.loadQuizzes();
};

// quizListData.set("isLoading", true);

    // vm.loadQuizzesFromBackend().then(function () {
    //     quizListData.set("isLoading", false);
    // });
