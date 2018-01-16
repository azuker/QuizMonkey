var QuestionViewModel = require('../../shared/view-models/question-view-model');
var observableModule = require("data/observable");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var navigationModule = require("../../shared/navigation");
var mapsModule = require("nativescript-google-maps-sdk");
var mapStyle = require("../../tools/assets/map-style.json");
var application = require('application');
var dialogs = require("ui/dialogs");

var vm;
var quiz
var questionIndex;
var quizLength;
var mapView = null;

var questionData = new observableModule.Observable();

setBackgroundColor = function (page) {
    var colors = ['#58406D', '#314D70', '#E54B04', '#007461', '#655672', '#6B0758', '#513EE1', '#E00481', '#4D989E', '#3F7F47'];
    var backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    questionData.backgroundColor = backgroundColor;
}

exports.onQuestionPageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = questionData;
    if (application.android) {
        application.android.addEventListener(application.AndroidApplication.activityBackPressedEvent, backOrLeavePressed);
    }
}

exports.onQuestionPageUnloaded = function () {
    if (application.android) {
        application.android.removeEventListener(application.AndroidApplication.activityBackPressedEvent, backOrLeavePressed);
    }
};

backOrLeavePressed = function (args) {
    if (args) {
        args.cancel = true;
    }
    dialogs.confirm({
        title: "Back/Leave Button Pressed",
        message: "Leaving now will take you the quiz-list page and erase this quiz's progress",
        okButtonText: "Leave Quiz",
        cancelButtonText: "Cancel",
    }).then(function (result) {
        if (result) {
            navigationModule.goToQuizList();
        }
    });
}

exports.onLeaveTapped = function () {
    backOrLeavePressed();
}

exports.questionPageNavigatedTo = function (args) {
    const page = args.object;
    const context = page.navigationContext;
    quiz = context.quiz;
    questionIndex = context.currentQuestionIndex;
    quizLength = quiz.questions.length;
    vm = new QuestionViewModel(quiz.questions[questionIndex]);
    vm.initQuestion();
    questionData.question = vm;
    questionData.progress = `${questionIndex + 1} / ${quizLength}`;
    setBackgroundColor(page);
}

disableList = function (args) {
    var parent = args.object.parent;
    if (parent) {
        var list = view.getViewById(parent, "answersListView");
        if (list) {
            list.removeEventListener(listViewModule.ListView.itemTapEvent);
        }
    }
}

navigateToNextPage = function () {
    if (quizLength > questionIndex + 1) {
        navigationModule.goToQuestionView(quiz, questionIndex + 1);
    }
    else {
        quiz.postScore();
        navigationModule.goToQuizSummaryView(quiz);
    };
}

exports.onSelectMultipleChoiceAnswer = function (args) {
    disableList(args);
    var chosenAnswer = args.view.bindingContext;
    var answeredCorrectly = vm.checkMultipleChoiceAnswer(chosenAnswer);
    if (answeredCorrectly) {
        quiz.incrementScore();
    }
    setTimeout(navigateToNextPage, 1000);
}

exports.onMapReady = function (args) {
    mapView = args.object;
    mapView.settings.compassEnabled = false;
    mapView.settings.indoorLevelPickerEnabled = false;
    mapView.settings.mapToolbarEnabled = false;
    mapView.settings.myLocationButtonEnabled = false;
    mapView.settings.rotateGesturesEnabled = false;
    mapView.settings.scrollGesturesEnabled = false;
    mapView.settings.tiltGesturesEnabled = false;
    mapView.settings.zoomControlsEnabled = false;
    mapView.settings.zoomGesturesEnabled = false;
    mapView.setStyle(mapStyle);
}

showCorrectMarker = function () {
    var correctMarker = new mapsModule.Marker();
    var correctLat = vm.locationAnswer.latitude;
    var correctLong = vm.locationAnswer.longitude;
    correctMarker.position = mapsModule.Position.positionFromLatLng(correctLat, correctLong);
    correctMarker.color = 'green';
    mapView.addMarker(correctMarker);
}

showUserMarker = function (args, answeredCorrectly) {
    var userMarker = new mapsModule.Marker();
    userMarker.position = mapsModule.Position.positionFromLatLng(args.position.latitude, args.position.longitude);
    userMarker.icon = answeredCorrectly ? 'vmarkmap' : 'xmarkmap';
    userMarker.anchor = [0.5, 0.5];
    mapView.addMarker(userMarker);
}

exports.onCoordinateTapped = function (args) {
    mapView.removeEventListener(mapsModule.MapView.coordinateTappedEvent);
    var answeredCorrectly = vm.checkMapLocationAnswer(args.position.latitude, args.position.longitude);
    showUserMarker(args, answeredCorrectly);
    setTimeout(showCorrectMarker, 500);
    if (answeredCorrectly) {
        quiz.incrementScore();
    }

    setTimeout(navigateToNextPage, 2000);
}