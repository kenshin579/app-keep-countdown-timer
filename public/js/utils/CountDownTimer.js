define([], function () {
    "use strict";
    var CountDownTimer = function CountDownTimer(args) {
        this.hours = args.hours;
        this.minutes = args.minutes;
        this.seconds = args.seconds;

        this.paused = true;
        this.timerInterval = null;
    };

    CountDownTimer.prototype.print = function () {
        console.log(this);
    };

    CountDownTimer.prototype.start = function () {
        // console.log("print", this);
        // this.timerInterval =
        this.paused = false;
        console.log("new Date().getTime()", new Date().getTime());

    };

    CountDownTimer.prototype.stop = function () {
        this.paused = true;
    };

    CountDownTimer.prototype.keepCounting = function () {
        // console.log("print", this);
        // this.timerInterval =

    };

    return CountDownTimer;
});

//
// function CountDownTimer(duration, granularity) {
//     this.duration = duration;
//     this.granularity = granularity || 1000;
//     this.tickFtns = [];
//     this.running = false;
// }
//
// CountDownTimer.prototype.start = function() {
//     if (this.running) {
//         return;
//     }
//     this.running = true;
//     var start = Date.now(),
//         that = this,
//         diff, obj;
//
//     (function timer() {
//         diff = that.duration - (((Date.now() - start) / 1000) | 0);
//
//         if (diff > 0) {
//             setTimeout(timer, that.granularity);
//         } else {
//             diff = 0;
//             that.running = false;
//         }
//
//         obj = CountDownTimer.parse(diff);
//         that.tickFtns.forEach(function(ftn) {
//             ftn.call(this, obj.minutes, obj.seconds);
//         }, that);
//     }());
// };
//
// CountDownTimer.prototype.onTick = function(ftn) {
//     if (typeof ftn === 'function') {
//         this.tickFtns.push(ftn);
//     }
//     return this;
// };
//
// CountDownTimer.prototype.expired = function() {
//     return !this.running;
// };
//
// CountDownTimer.parse = function(seconds) {
//     return {
//         'minutes': (seconds / 60) | 0,
//         'seconds': (seconds % 60) | 0
//     };
// };

// window.onload = function () {
//     var display = document.querySelector('#time'),
//         timer = new CountDownTimer(5),
//         timeObj = CountDownTimer.parse(5);
//
//     format(timeObj.minutes, timeObj.seconds);
//
//     timer.onTick(format);
//
//     document.querySelector('button').addEventListener('click', function () {
//         timer.start();
//     });
//
//     function format(minutes, seconds) {
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//         display.textContent = minutes + ':' + seconds;
//     }
// };