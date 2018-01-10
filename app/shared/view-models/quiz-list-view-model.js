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

    addQuizToViewModel = function (quiz) {
        var averageScore = getAverageScore(quiz);
        viewModel.push({
            id: quiz.id,
            name: quiz.name,
            image: quiz.image,
            averageScore: averageScore,
            averageScoreExists: typeof averageScore !== 'undefined'
        });
    }
    loadMockDataQuizzes = function () {
        var quizzesArray = mockQuizzesData;
        for (i = 0; i < quizzesArray.length; i++) {
            addQuizToViewModel(quizzesArray[i]);
        };
    }

    // viewModel.loadBackEndDataQuizzes = function () {
    //     return fetch(config.apiUrl + 'quizzes')
    //         .then(handleErrors)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             for (i = 0; i < data.length; i++) {
    //                 addQuizToViewModel(data[i]);
    //             }
    //         });
    // };

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

// function handleErrors(response) {
//     if (!response.ok) {
//         console.log(JSON.stringify(response));
//         throw Error(response.statusText);
//     }
//     return response;
// }
module.exports = QuizListViewModel;
