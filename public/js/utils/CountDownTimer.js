define([], function () {
    "use strict";
    var CountDownTimer = function CountDownTimer(args) {
        this.name = args.name;
        this.hours = args.hours;
        this.minutes = args.minutes;
        this.sec = args.sec;
    };

    CountDownTimer.prototype.print = function () {
        console.log("print", this);
    };

    return CountDownTimer;
});
