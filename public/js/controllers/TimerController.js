define([
    "utils/Requester"
], function (Requester) {
    var TimerController = function TimerController(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    };

    TimerController.prototype = {
        init: function () {
            console.log("controller init");
            this._setupHandlers()
                ._registerHandlers()
                ._loadTimersFromDb();
        },

        _setupHandlers: function () {
            this.addTimerHandler = this.addTimer.bind(this);
            this.deleteTimerHandler = this.deleteTimer.bind(this);
            this.listTimersHandler = this.listTimers.bind(this);
            return this;
        },

        _registerHandlers: function () {
            //View의 Event 함수를 등록함
            this.view.addTimerEvent.attach(this.addTimerHandler);
            this.view.deleteTimerEvent.attach(this.deleteTimerHandler);
            this.view.listTimersEvent.attach(this.listTimersHandler);
            return this;
        },

        _loadTimersFromDb: function () {
            Requester.getTimersFromDb(function (resultJson) {
                this.model.setTimers(resultJson);
            }, this);
            return this;
        },

        addTimer: function (sender, data) {
            console.log("controller add sender:", sender);
            console.log("controller add data:", data);

            Requester.addTimerToDb(data, function (resultFromDB) {
                if (resultFromDB.result) {
                    this.model.addTimer(data);
                } else {
                    console.error("error from db");
                }
            }, this);
        },

        deleteTimer: function () {
            console.log("controller delete");
            this.model.deleteTimer();
            // this.model.deleteTasks();
        },

        listTimers: function () {
            console.log("controller list");
            this.model.setTimers();
        }
    };

    return TimerController;
});