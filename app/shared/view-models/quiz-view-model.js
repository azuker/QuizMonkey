var observableModule = require("data/observable");
var mockQuestionsData = require("../../mockData/mockQuestionsData.json");
var config = require("../../shared/config");

function quizViewModel(quiz) {
    var viewModel = new observableModule.fromObject(quiz)
    viewModel.currentScore = 0;

    loadBackEndDataQuestions = function () {
        return fetch(config.apiUrl + 'quizzes/' + quiz.id + '/questions')
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                viewModel.questions = data;
            })
    };

    loadMockDataQuestions = function () {
        var quizRelatedQuestions = mockQuestionsData.filter(q => q.quiz_id === quiz.id)
        viewModel.questions = quizRelatedQuestions;
    }

    viewModel.loadQuestions = function () {
        if (config.useLocalData) {
            return new Promise(resolve =>
                setTimeout(resolve, 0)
                // changeBack 3000 YS
            ).then(loadMockDataQuestions);
        }
        else {
            return new Promise(resolve =>
                setTimeout(resolve, 0)
                // changeBack 3000 YS
            ).then(loadBackEndDataQuestions);
        }
    }

viewModel.incrementScore = function () {
    var newScore = viewModel.currentScore + 1;
    viewModel.currentScore = newScore;
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
module.exports = quizViewModel;


    // viewModel.incrementScore = function () {
    //     var newScore = viewModel.currentScore + 1;
    //     viewModel.currentScore = newScore;
    // }

    // viewModel.postScore = function () {
    //     var correctAnswers = viewModel.currentScore;
    //     var quizLength = viewModel.questions.length;
    //     var finalScore = correctAnswers / quizLength;
    //     viewModel.set("finalScore", finalScore);

    //     return fetch(config.apiUrl + 'quizzes/' + quiz.id, {
    //         method: "PATCH",
    //         body: JSON.stringify({
    //             score: finalScore,
    //         }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     // .then(handleErrors);
    // };

