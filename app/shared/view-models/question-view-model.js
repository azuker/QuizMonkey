var observableModule = require("data/observable");

function questionViewModel(question) {
    var viewModel = new observableModule.fromObject(question);

    return viewModel;
}
module.exports = questionViewModel;



    // viewModel.initQuestion = function (question) {
    //     viewModel.set("questionText", question.questionText);
    //     viewModel.set("answers", question.answers);
    //     viewModel.set("correctAnswerIndex", question.correctAnswerIndex);
    // };
// function quizViewModel(quiz) {
//     var viewModel = new observableModule.fromObject(quiz)
//     viewModel.currentScore = 0;

//     return viewModel;
// }
// module.exports = quizViewModel;
