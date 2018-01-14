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

// if (answerIsCorrect) {
//     console.log('correct answer with index ' + chosenAnswerIndex);
// }
// else {
//     console.log('wrong answer with index ' + chosenAnswerIndex + ' while correctAnswerIndex was ' + correctAnswerIndex);
// }

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
