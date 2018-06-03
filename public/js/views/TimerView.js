define([
    "jquery",
    "bootstrap",
    "common/Constants",
    "common/Event"
], function ($, bootstrap, Constants, Event) {
    "use strict";

    var TimerView = function TimerView(model) {
        this.model = model;

        this.addTimerEvent = new Event(this);
        this.delteTimerEvent = new Event(this);
        this.init();
    };

    TimerView.prototype = {
        init: function () {
            console.log("init");

            this._initializeDocumentObjects()
                ._setupHandlers()
                ._registerHandlers();
        },

        _initializeDocumentObjects: function () {
            this.$timerList = $("#timer-list");
            this.$mainTimer = $("#main-timer");
            this.$mainTimerStartButton = $("#main-timer-start");
            this.$mainTimerStopButton = $("#main-timer-stop");

            this.$timeTable = $("#timeTable tr:has(td)");
            this.$btnSubmitModel = $("#btnSubmitModal");
            return this;
        },

        _setupHandlers: function () {
            this.clickTableHandler = this.clickTable.bind(this);
            this.addTimerButtonHandler = this.addTimerButton.bind(this);
            this.startCountDownTimerHandler = this.startCountDownTimer.bind(this);
            this.stopCountDownTimerHandler = this.stopCountDownTimer.bind(this);
            return this;
        },

        _registerHandlers: function () {
            //콜백 함수등록
            this.$timeTable.click(this.clickTableHandler);
            this.$btnSubmitModel.click(this.addTimerButtonHandler);

            this.$mainTimerStartButton.click(this.startCountDownTimerHandler);
            this.$mainTimerStopButton.click(this.stopCountDownTimerHandler);

            //Event에 함수 등록함
            return this;
        },

        _showMessage: function (/*String*/ code, /*String*/ message) {
            var $alertMessage;

            if (code === Constants.MESSAGE_SUCCESS) {
                $alertMessage = $("#alert-success");
            } else {
                $alertMessage = $("#alert-fail");
            }
            $alertMessage.find(".message").text(message);
            $alertMessage.show();
            setTimeout(function () {
                $alertMessage.hide();
            }, 2000);

        },

        addTimerButton: function (e) {
            var self = this;

            $.ajax({
                url: 'http://localhost:3000/new',
                dataType: 'json',
                type: 'POST',
                data: {
                    'newTimerDescription': $("#newTimerDescription").val(),
                    'newTimerHours': $("#newTimerHours").val(),
                    'newTimerMinutes': $("#newTimerMinutes").val()
                },
                success: function (data) {
                    console.log("result:", data);
                    if (data.result) {
                        self._showMessage(Constants.MESSAGE_SUCCESS, "저장 성공");
                    } else {
                        self._showMessage(Constants.MESSAGE_FAIL, "저장 실패");
                    }
                },
                error: function (request, status, error) {
                    console.error("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });

            $("#newTimerModel").modal("hide");
        },

        clickTable: function (e) {
            var clickedCell = $(e.target).closest("td");
            var REGREX_EXTRACT_TIMER = /.* ([0-9]+:[0-9]+).*/g;
            var matchTimer = REGREX_EXTRACT_TIMER.exec(clickedCell.text());
            $("#main-timer").text(matchTimer[0]);
        },

        startCountDownTimer: function () {
            console.log("startCountDownTimer");
        },

        stopCountDownTimer: function () {
            console.log("stopCountDownTimer");
        }
    };

    return TimerView;
});