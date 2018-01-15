// var navigationModule = require("../../shared/navigation");
var observable = require("data/observable");
// var socialShare = require("nativescript-social-share");
// var view = require("ui/core/view");

var quizSummaryData = new observable.Observable()

// exports.backToQuizListTapped = function (args) {
//     navigationModule.goToQuizList();
// }

// exports.shareTapped = function (args) {
//     var userAverage = quizSummaryData.get("userPersentableScore");
//     var quizName = quizSummaryData.get("quiz").get("name");

//     socialShare.shareText("Hi, I just scored " + userAverage + " on the " + quizName + " quiz in the best quiz app ever!");
// }

exports.quizNameLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setGravity(17);
    }
}

exports.summaryPageNavigatedTo = function (args) {
    const page = args.object;
    const context = page.navigationContext;
    quizSummaryData.set("quiz", context.quiz);
    page.bindingContext = quizSummaryData;
}