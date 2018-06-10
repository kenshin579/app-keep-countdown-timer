define([
    "common/Event"
], function (Event) {
    var TimerModel = function TimerModel() {
        this.timers = [];

        this.addTimerEvent = new Event(this);
        this.deleteTimerEvent = new Event(this);
        this.listTimersEvent = new Event(this);
    };

    TimerModel.prototype = {
        addTimer: function (timer) {
            console.log("model addTimer", timer);
            this.timers.push(timer);

            //views에 update하기
            this.addTimerEvent.notify(timer);
        },

        deleteTimer: function () {
            console.log("model deleteTimer");
        },

        getTimers: function () {
            return this.timers;
        },

        setTimers: function (resultJson) {
            console.log("model setTimers", resultJson);
            this.timers = resultJson;
            this.listTimersEvent.notify();
        }
    };

    return TimerModel;
});