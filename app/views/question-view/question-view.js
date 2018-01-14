var QuestionViewModel = require('../../shared/view-models/question-view-model');
var observableModule = require("data/observable");

var vm;
var quiz
var questionIndex;
var quizLength;

var questionData = new observableModule.Observable();

exports.onQuestionPageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = questionData;
}

exports.questionPageNavigatedTo = function (args) {
    const page = args.object;
    const context = page.navigationContext;
    quiz = context.quiz;
    questionIndex = context.currentQuestionIndex;
    quizLength = quiz.questions.length;
    vm = new QuestionViewModel(quiz.questions[questionIndex]);
    questionData.question = vm;
    // questionData.progress = `${questionIndex + 1} / ${quizLength}`;
}
