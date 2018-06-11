define([
    "jquery",
    "underscore",
    "bootstrap",
    "moment",
    "handlebars",
    "common/Constants",
    "common/Event",
    "utils/CommonUtils"
], function ($, _, bootstrap, moment, Handlebars, Constants, Event, CommonUtils) {
    "use strict";

    var TimerView = function TimerView(model) {
        this.model = model;

        this.addTimerEventForController = new Event(this);
        this.deleteTimerEventForController = new Event(this);
        this.listTimersEventForController = new Event(this);
        this.updateTimerEventForController = new Event(this);
        this.init();
    };

    TimerView.prototype = {
        init: function () {
            console.log("view init");
            this._initializeDocumentObjects()
                ._setupHandlers()
                ._registerHandlers();
        },

        _initializeDocumentObjects: function () {
            // this.$timerList = $("#timer-list");
            this.$mainTimer = $("#main-timer");
            this.$mainTimerStartButton = $("#main-timer-start");
            this.$mainTimerStopButton = $("#main-timer-stop");

            this.$timeTable = $("#timeTable");
            this.$btnSubmitModel = $("#btnSubmitModal");

            this.$addModal = $("#newTimerModel");
            this.$deleteModal = $("#deleteTimerModel");
            this.$modifyTimerModel = $("#modifyTimerModel");
            return this;
        },

        _setupHandlers: function () {
            this.clickTableHandler = this.clickTable.bind(this);
            this.addTimerButtonHandler = this.addTimerButton.bind(this);
            this.startCountDownTimerHandler = this.startCountDownTimer.bind(this);
            this.stopCountDownTimerHandler = this.stopCountDownTimer.bind(this);

            //Handlers from Event Dispatcher
            this.addTimerHandler = this.addTimer.bind(this);
            this.deleteTimerHandler = this.deleteTimer.bind(this);
            this.listTimersHandler = this.listTimers.bind(this);
            return this;
        },

        _registerHandlers: function () {
            //UI component에 대한 함수 등록
            this.$timeTable.on("click", "tr", this.clickTableHandler);
            this.$btnSubmitModel.click(this.addTimerButtonHandler);
            this.$mainTimerStartButton.click(this.startCountDownTimerHandler);
            this.$mainTimerStopButton.click(this.stopCountDownTimerHandler);

            //Model의 Event에 함수 등록함
            this.model.addTimerEventForView.attach(this.addTimerHandler);
            this.model.deleteTimerEventForView.attach(this.deleteTimerHandler);
            this.model.listTimersEventForView.attach(this.listTimersHandler);

            this.$addModal.on("hidden.bs.modal", this._resetModal);
            this.$deleteModal.on("hidden.bs.modal", this._resetModal);
            this.$modifyTimerModel.on("hidden.bs.modal", this._resetModal);
            return this;
        },

        _resetModal: function () {
            var $modal = $(this);
            $modal.find(".modal-body input").val("");
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

        _identifySelectedTimerAndButton: function (event) {
            console.log("e", $(event.target));
            var $clickClasses = $(event.target).is("button") ? $(event.target).attr("class") : $(event.target).parent().attr("class");
            var firstClassName = $clickClasses.split(" ")[0];
            var trTagClassName = $(event.target).closest("tr");

            return {
                timer_description: trTagClassName.attr("class"),
                clickedButton: firstClassName
            }
        },

        _parseTimeHourAndMinsFromTimerDescription: function () {
            // var clickedTableCell = $(e.target).closest("td");
            // var REGREX_EXTRACT_TIMER = /.* ([0-9]+:[0-9]+).*/g;
            // var extractTimerValue = REGREX_EXTRACT_TIMER.exec(clickedTableCell.text());
            // if (extractTimerValue) {
            //     $("#main-timer").text(extractTimerValue[0]);
            // }
        },

        addTimerButton: function () {
            console.log("view addTimerButton");

            this.addTimerEventForController.notify({
                timer_description: $("#newTimerDescription").val(),
                timer_interval: {
                    hours: $("#newTimerHours").val(),
                    minutes: $("#newTimerMinutes").val()
                },
                timer_total: {
                    hours: $("#newTimerHours").val(),
                    minutes: $("#newTimerMinutes").val()
                },
                timer_status: "active",
                start_date: Date.now(moment().format('YYYY-MM-DD'))
            });
        },

        _enableTimerUI: function (event) {
            console.log("_enableTimerUI event", $(event.target));

            if ($(event.target).is("button")) {
                console.log("===> 1");
                $(event.target).addClass("active");

            } else {
                console.log("===> 2");
                $(event.target).parent().addClass("active");
            }

            $(event.target).closest("td").next().find("button").removeClass("active");
        },


        _disableTimerUI: function (event) {
            //enable pause
            if ($(event.target).is("button")) {
                console.log("===> 1");
                $(event.target).addClass("active");
            } else {
                console.log("===> 2");
                $(event.target).parent().addClass("active");
            }

            //disable play
            $(event.target).closest("td").prev().find("button").removeClass("active");
        },


        clickTable: function (event) {
            var selectedTimer = this._identifySelectedTimerAndButton(event);
            console.log("view clickTable selectedTimer", selectedTimer);

            if (selectedTimer.clickedButton === "pauseTimer") {
                this._disableTimerUI(event);

                this.updateTimerEventForController.notify({
                    timer_description: selectedTimer.timer_description,
                    timer_status: ""
                });
            }

            if (selectedTimer.clickedButton === "playTimer") {
                this._enableTimerUI(event);
                this.updateTimerEventForController.notify({
                    timer_description: selectedTimer.timer_description,
                    timer_status: "active"
                });
            }
        },

        startCountDownTimer: function () {
            console.log("startCountDownTimer");
        },

        stopCountDownTimer: function () {
            console.log("stopCountDownTimer");
        },

        updateTimersList: function (data) {
            console.log("view updateTimersList data", data);
            console.log("timers", this.model.timers);
            if (data) {
                CommonUtils.getTemplate("templates/addtimer-template.hbs", function (hbsTemplate) {
                    var compiledTemplate = Handlebars.compile(hbsTemplate);
                    var htmlTemplate = compiledTemplate(data);
                    $("#timer-list").last().append(htmlTemplate);
                });
            } else {
                //todo: nested ajax call 개선하기
                var self = this;
                CommonUtils.getTemplate("templates/addtimer-template.hbs", function (hbsAddTemplate) {
                    CommonUtils.getTemplate("templates/list-template.hbs", function (hbsListTemplate) {
                        var compiledTemplate = Handlebars.compile(hbsListTemplate);
                        Handlebars.registerPartial("addtimer", hbsAddTemplate);
                        var htmlTemplate = compiledTemplate(self.model.getTimers());
                        $("#timer-list").append(htmlTemplate);
                    });
                });
            }
        },

        // Handlers From Event Dispatcher
        addTimer: function (sender, args) {
            console.log("viewer args", args);
            this.updateTimersList(args);
        },

        deleteTimer: function () {
            this.updateTimersList();
        },

        listTimers: function () {
            this.updateTimersList();
        }
    };

    return TimerView;
});