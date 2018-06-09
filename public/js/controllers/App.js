define([
    "controllers/TimerController",
    "models/TimerModel",
    "views/TimerView"
], function (TimerController, TimerModel, TimerView) {
    var App = function App() {
    };

    App.prototype = {
        initialize: function () {
            console.log("app initialized");
            //todo: ui binding
            //todo: get list 목록 가져와서 model에 기록하기
            return this;
        },

        run: function () {
            console.log("app started");
            var model = new TimerModel();
            var view = new TimerView(model);
            var controller = new TimerController(model, view);
        }
    };
    return App;
});