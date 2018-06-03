define([], function() {
    var TimerModel = function TimerModel() {
        this.timers = []; //
    };

    TimerModel.prototype = {
        addTimer: function (timer) {
            console.log("addTimer timer", timer);
            this.timers.push({
                "test": "test"
            });
        },

        getTimers: function () {
            return this.timers;
        },

        deleteTimer: function () {
           console.log("deleteTimer");
        }
    };

    return TimerModel;
});