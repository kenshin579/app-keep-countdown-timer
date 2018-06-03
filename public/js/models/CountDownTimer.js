define([], function () {
    "use strict";
    var CountDownTimer = function (args) {
        this.name = args.name;
        this.hour = args.hour;
        this.min = args.min;
        this.sec = args.sec;
    };

    CountDownTimer.prototype.print = function () {
        console.log("print", this);
    };

    return CountDownTimer;
});
