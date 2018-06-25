var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timerSchema = new Schema({
    timer_description: {
        type: String, unique: true
    },
    timer_interval: {
        hours: {type: Number},
        minutes: {type: Number}
    },
    timer_total: {
        hours: {type: Number},
        minutes: {type: Number},
        seconds: {type: Number}
    },
    timer_status: {
        type: Boolean
    },
    start_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('timer', timerSchema);
