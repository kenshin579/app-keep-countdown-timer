define([], function () {
    var TimerController = function TimerController(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    };

    TimerController.prototype = {
        init: function () {
            console.log("init");
        }
    };

    return TimerController;
});