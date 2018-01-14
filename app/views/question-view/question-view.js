var QuestionViewModel = require('../../shared/view-models/question-view-model');
var observableModule = require("data/observable");

var vm;
var quiz
var questionIndex;
var quizLength;

var questionData = new observableModule.Observable();

setBackgroundColor = function (page) {
    var colors = ['#58406D', '#314D70', '#E54B04', '#007461', '#655672', '#6B0758', '#513EE1', '#E00481', '#4D989E', '#3F7F47'];
    var backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    questionData.backgroundColor = backgroundColor;
}

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
    vm.initQuestion();
    questionData.question = vm;
    questionData.progress = `${questionIndex + 1} / ${quizLength}`;
    setBackgroundColor(page);
}

// disableList = function (args) {
//     var parent = args.object.parent;
//     if (parent) {
//         var list = view.getViewById(parent, "answersListView");
//         if (list) {
//             list.isUserInteractionEnabled = false;
//         }
//     }
// }
exports.onSelectMultipleChoiceAnswer = function (args) {
    // disableList(args);
    var chosenAnswer = args.view.bindingContext;

    var answeredCorrectly = vm.checkMultipleChoiceAnswer(chosenAnswer);
    console.log('answeredCorrectly: ' + answeredCorrectly);
    // if (answeredCorrectly) {
    //     quiz.incrementScore();
    // }
    // setTimeout(navigateToNextPage, 1000);
}
