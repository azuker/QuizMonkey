var observableModule = require("data/observable");

function questionViewModel(question) {
    var viewModel = new observableModule.fromObject(question);

    viewModel.initQuestion = function () {
        var newAnswersArray = [];
        if (question.answers) {
            for (i = 0; i < question.answers.length; i++) {
                var answer = new observableModule.fromObject({
                    answerText: question.answers[i],
                    isSelected: false,
                    showCorrect: false,
                    isCorrect: i === question.correctAnswerIndex
                });
                newAnswersArray.push(answer);
            }
            viewModel.answers = newAnswersArray;
        }
    }

    viewModel.checkMultipleChoiceAnswer = function (chosenAnswer) {
        chosenAnswer.isSelected = true;
        var answers = viewModel.get("answers");
        var correctAnswer = answers[question.correctAnswerIndex];
        correctAnswer.showCorrect = true;
        return chosenAnswer.isCorrect;
    };

    return viewModel;
}
module.exports = questionViewModel;
