define([
    "common/Event"
], function (Event) {
    var TimerModel = function TimerModel() {
        this.timers = [];

        this.addTimerEventForView = new Event(this);
        this.deleteTimerEventForView = new Event(this);
        this.listTimersEventForView = new Event(this);
    };

    TimerModel.prototype = {
        addTimer: function (timer) {
            console.log("model addTimer", timer);
            this.timers.push(timer);

            //views에 update하기
            this.addTimerEventForView.notify(timer);
        },

        deleteTimer: function (timer) {
            console.log("model deleteTimer", timer);
            var self = this;

            this.timers.forEach(function (timerObj, index) {
                if (timerObj._id === timer.timerId) {
                    self.timers.splice(index, 1);
                }
            });
            this.deleteTimerEventForView.notify(timer);
        },

        getTimers: function () {
            return this.timers;
        },

        setTimers: function (resultJson) {
            console.log("model setTimers", resultJson);
            this.timers = resultJson;
            this.listTimersEventForView.notify();
        },

        updateTimer: function (timer) {
            console.log("model updateTimer", timer);

            this.timers.forEach(function (timerObj, index) {
                if (timerObj.timer_description === timer.timer_description) {
                    timerObj.timer_status = timer.timer_status;
                }
            });
            //todo: UI 갱신을 나중에 해야 할까? (현재 ui를 먼제 갱신하고 서버에 반영하고 나서 client model에 반영함)
        }
    };

    return TimerModel;
});