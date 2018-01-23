var navigationModule = require("../../shared/navigation");
var socialShare = require("nativescript-social-share");

var vm;

exports.backToQuizListTapped = function (args) {
    navigationModule.goToQuizList();
}

exports.shareTapped = function (args) {
    var userScore = vm.get("presentableScore");
    var quizName = vm.get("name");
    socialShare.shareText("Hi, I just scored " + userScore + " on the " + quizName + " quiz in QuizMonkey - the best quiz app ever!");
}

exports.quizNameLoaded = function (args) {
    if (args.object.android) {
        args.object.android.setGravity(17);
    }
}

exports.summaryViewLoaded = function (args) {
    var page = args.object;
    vm = page.bindingContext;
}