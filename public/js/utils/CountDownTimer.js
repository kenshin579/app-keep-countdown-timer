define([], function () {
    "use strict";
    var CountDownTimer = function CountDownTimer() {
    };

    CountDownTimer.prototype.setConfig = function (config) {
        console.log("setCountDownTimer");
        config = config || {};
        this.element = config.element || {};
        this.previousTime = config.previousTime || new Date().getTime();
        this.paused = config.paused && true;
        this.elapsed = config.elapsed || 0;
        this.countingUp = config.countingUp && true;
        this.timeLimit = config.timeLimit || (this.countingUp ? 60 * 10 : 0);
        this.updateRate = config.updateRate || 100;
        this.onTimeUp = config.onTimeUp || function () {
            this.stop();
        };
        this.onTimeUpdate = config.onTimeUpdate || function () {
            console.log(this.elapsed)
        };
    };

    CountDownTimer.prototype.start = function () {
        // console.log("start");
        // Unlock the timer
        this.paused = false;
        // Update the current time
        this.previousTime = new Date().getTime();
        // Launch the counter
        this.keepCounting();
    };

    CountDownTimer.prototype.stop = function () {
        // console.log("stop");
        this.paused = true;
    };

    CountDownTimer.prototype.keepCounting = function () {
        // Lock the timer if paused
        if (this.paused) {
            return true;
        }
        // Get the current time
        var now = new Date().getTime();
        // Calculate the time difference from last check and add/substract it to 'elapsed'
        var diff = (now - this.previousTime);
        if (!this.countingUp) {
            diff = -diff;
        }
        this.elapsed = this.elapsed + diff;
        // Update the time
        this.previousTime = now;
        // Execute the callback for the update
        this.onTimeUpdate();
        // If we hit the time limit, stop and execute the callback for time up
        if ((this.elapsed >= this.timeLimit && this.countingUp) || (this.elapsed <= this.timeLimit && !this.countingUp)) {
            this.stop();
            this.onTimeUp();
            return true;
        }
        // Execute that again in 'updateRate' milliseconds
        var that = this;
        setTimeout(function () {
            that.keepCounting();
        }, this.updateRate);
    };

    CountDownTimer.prototype.parse = function () {
        var timerStr = this.element.text();
        return {
            hours: timerStr.split(":")[0],
            minutes: timerStr.split(":")[1],
            seconds: timerStr.split(":")[2]
        }
    };

    return CountDownTimer;
});