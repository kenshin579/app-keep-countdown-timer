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
            this.updateTimerHandler = this.updateTimer.bind(this);
            return this;
        },

        _registerHandlers: function () {
            //View의 Event 함수를 등록함
            this.view.addTimerEventForController.attach(this.addTimerHandler);
            this.view.deleteTimerEventForController.attach(this.deleteTimerHandler);
            this.view.listTimersEventForController.attach(this.listTimersHandler);
            this.view.updateTimerEventForController.attach(this.updateTimerHandler);
            return this;
        },

        /**
         * 첫화면에서 timers 목록을 가져옴
         *
         * @returns {TimerController}
         * @private
         */
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
        },

        updateTimer: function (sender, data) {
            console.log("controller update data:", data);

            Requester.updateTimerToDb(data, function (resultFromDb) {
                if (resultFromDb.result) {
                    this.model.updateTimer(data);
                } else {
                    console.error("error from db");
                }
            }, this);
        }
    };

    return TimerController;
});