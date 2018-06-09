define([], function () {
    "use strict";

    var returnObject = {
        MESSAGE_SUCCESS: "SUCCESS",
        MESSAGE_FAIL: "FAIL",

        MODIFY_TIMER : "modifyTimer",
        DELETE_TIMER : "deleteTimer",
        PLAY_TIMER : "playTimer",
        PAUSE_TIMER : "pauseTimer"
    };

    Object.freeze(returnObject);
    return returnObject;
});