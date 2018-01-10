var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../shared/config");
var mockQuizzesData = require("../../mockData/mockQuizzesData.json");

function QuizListViewModel(items) {

    var viewModel = new ObservableArray(items);
    // getAverageScore = function (quiz) {
    //     var averageScore = (quiz.gameCounter && quiz.gameCounter > 0) ?
    //         quiz.aggregatedScore / quiz.gameCounter : undefined;
    //     return averageScore;
    // }

    loadMockDataQuizzes = function () {
        var quizzesArray = mockQuizzesData;
        for (i = 0; i < quizzesArray.length; i++) {
            // var averageScore = getAverageScore(quizzesArray[i]);
            // var averageScoreExists = false;
            // if (typeof averageScore !== 'undefined') {
            //     averageScore = utilities.convertFractionToPercentageString(averageScore);
            //     averageScoreExists = true;
            // }
            viewModel.push({
                id: quizzesArray[i].id,
                name: quizzesArray[i].name,
                image: quizzesArray[i].image,
                // averageScore: averageScore,
                // averageScoreExists: averageScoreExists
            });
        };
    }

    viewModel.loadQuizzes = function () {
        if (config.useLocalData) {
            loadMockDataQuizzes();
        }
        else {
            // loadBackEndDataQuizzes();
        }
    }

    viewModel.clearQuizzes = function () {
        while (viewModel.length) {
            viewModel.pop();
        };
    }

    return viewModel;
}
module.exports = QuizListViewModel;
