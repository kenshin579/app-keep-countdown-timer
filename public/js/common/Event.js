define([], function () {
    var Event = function (sender) {
        this._sender = sender;
        this._listeners = [];
    };

    Event.prototype = {
        /**
         * 함수를 인자로 받음
         * @param listener
         */
        attach: function (listener) {
            this._listeners.push(listener);
        },

        /**
         * Event에 attach한 각 함수를 실행함
         * @param args
         */
        notify: function (args) {
            for (var i = 0; i < this._listeners.length; i += 1) {
                this._listeners[i](this._sender, args);
            }
        }
    };

    return Event;
});