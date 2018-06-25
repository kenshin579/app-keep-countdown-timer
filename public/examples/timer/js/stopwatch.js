/******************
 * STOPWATCH CLASS
 *****************/

function Stopwatch(config) {
    // If no config is passed, create an empty set
    config = config || {};
    // Set the options (passed or default)
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
    if (!this.paused) {
        this.start();
    }
}


Stopwatch.prototype.start = function () {
    // Unlock the timer
    this.paused = false;
    // Update the current time
    this.previousTime = new Date().getTime();
    // Launch the counter
    this.keepCounting();
};

Stopwatch.prototype.keepCounting = function () {
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

Stopwatch.prototype.stop = function () {
    // Change the status
    this.paused = true;
};
