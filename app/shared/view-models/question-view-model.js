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
    
    getLongitudeDistance = function (longitude1, longitude2) {
        var rawDistance = Math.abs(longitude1 - longitude2);
        return Math.min(rawDistance, 360 - rawDistance)
    }

    viewModel.checkMapLocationAnswer = function (chosenLatitude, chosenLongitude) {
        var locationAnswer = viewModel.get("locationAnswer");
        var distanceSquared = Math.pow((chosenLatitude - locationAnswer.latitude), 2) +
            Math.pow(getLongitudeDistance(chosenLongitude, locationAnswer.longitude), 2);
        var distance = Math.sqrt(distanceSquared);
        var answerIsCorrect = distance < viewModel.get("errorMarginRadius");
        return answerIsCorrect;
    };
    return viewModel;
}
module.exports = questionViewModel;
