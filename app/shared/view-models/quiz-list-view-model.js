var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../shared/config");
var mockQuizzesData = require("../../mockData/mockQuizzesData.json");
var utilities = require("../../shared/utilities");

function QuizListViewModel(items) {

    var viewModel = new ObservableArray(items);

    getAverageScore = function (quiz) {
        var averageScore = (quiz.gameCounter && quiz.gameCounter > 0) ?
            quiz.aggregatedScore / quiz.gameCounter : undefined;
        averageScore = utilities.convertFractionToPercentageString(averageScore);
        return averageScore;
    }

    addQuizzesToViewModel = function (quizzes) {
        for (i = 0; i < quizzes.length; i++) {
            var averageScore = getAverageScore(quizzes[i]);
            viewModel.push({
                id: quizzes[i]._id,
                name: quizzes[i].name,
                image: quizzes[i].image,
                averageScore: averageScore,
                averageScoreExists: typeof averageScore !== 'undefined'
            });
        };
    }

    loadMockDataQuizzes = function () {
        addQuizzesToViewModel(mockQuizzesData);
    }

    loadBackEndDataQuizzes = function () {
        return fetch(config.apiUrl + 'quizzes')
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                addQuizzesToViewModel(data);
            });
    };

    viewModel.loadQuizzes = function () {
        if (config.useMockData) {
            return new Promise(resolve =>
                setTimeout(resolve, 3000)
            ).then(loadMockDataQuizzes);
        }
        else {
            return new Promise(resolve =>
                setTimeout(resolve, 3000)
            ).then(loadBackEndDataQuizzes);
        }
    }

    viewModel.clearQuizzes = function () {
        while (viewModel.length) {
            viewModel.pop();
        };
    }

    return viewModel;
}
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
module.exports = QuizListViewModel;
