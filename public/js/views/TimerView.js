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
        this.modifyTimerEventForController = new Event(this);
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
            this.$btnAddSubmitModel = $("#btnAddSubmitModal");
            this.$btnDeleteSubmitModel = $("#btnDeleteSubmitModal");
            this.$btnModifySubmitModel = $("#btnModifySubmitModal");

            this.$addModal = $("#addTimerModel");
            this.$deleteModal = $("#deleteTimerModel");
            this.$modifyModel = $("#modifyTimerModel");
            return this;
        },

        _setupHandlers: function () {
            this.clickTableHandler = this.clickTable.bind(this);
            this.addTimerButtonHandler = this.addTimerButton.bind(this);
            this.deleteTimerButtonHandler = this.deleteTimerButton.bind(this);
            this.modifyTimerButtonHandler = this.modifyTimerButton.bind(this);
            this.startCountDownTimerHandler = this.startCountDownTimer.bind(this);
            this.stopCountDownTimerHandler = this.stopCountDownTimer.bind(this);

            //Handlers from Event Dispatcher
            this.addTimerHandler = this.addTimer.bind(this);
            this.deleteTimerHandler = this.deleteTimer.bind(this);
            this.modifyTimerHandler = this.modifyTimer.bind(this);
            this.listTimersHandler = this.listTimers.bind(this);
            return this;
        },

        _registerHandlers: function () {
            //UI component에 대한 함수 등록
            this.$timeTable.on("click", "tr", this.clickTableHandler);
            this.$btnAddSubmitModel.on("click", this.addTimerButtonHandler);
            this.$btnDeleteSubmitModel.on("click", this.deleteTimerButtonHandler);
            this.$btnModifySubmitModel.on("click", this.modifyTimerButtonHandler);
            this.$mainTimerStartButton.on("click", this.startCountDownTimerHandler);
            this.$mainTimerStopButton.on("click", this.stopCountDownTimerHandler);

            //Model의 Event에 함수 등록함
            this.model.addTimerEventForView.attach(this.addTimerHandler);
            this.model.deleteTimerEventForView.attach(this.deleteTimerHandler);
            this.model.modifyTimerEventForView.attach(this.modifyTimerHandler);
            this.model.listTimersEventForView.attach(this.listTimersHandler);

            this.$addModal.on("hidden.bs.modal", this._resetModalDialog);
            this.$deleteModal.on("hidden.bs.modal", this._resetModalDialog);
            this.$modifyModel.on("hidden.bs.modal", this._resetModalDialog);

            this.$deleteModal.on("show.bs.modal", this._displayTimerDescriptionOnDeleteModalDialog);
            this.$modifyModel.on("show.bs.modal", this._displayTimerDescriptionOnModifyModalDialog);
            return this;
        },

        _resetModalDialog: function () {
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

        /**
         * Table안에 있는 버튼 클릭시 어느 timer인지 파악해줌
         *
         * @param event
         * @returns {{timer_description: *, clickedButton: string}}
         * @private
         */
        _identifySelectedTimerAndButton: function (event) {
            var $clickClasses = $(event.target).is("button") ? $(event.target).attr("class") : $(event.target).parent().attr("class");
            var buttonName = $clickClasses.split(" ")[0];
            var timerId = $(event.target).closest("tr").data().timerId;

            return {
                _id: timerId,
                clickedButton: buttonName
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

        _displayTimerDescriptionOnDeleteModalDialog: function (event) {
            console.log("view _displayTimerDescriptionOnDeleteModalDialog");
            // var $clickClasses = $(event.relatedTarget).is("button") ? $(event.relatedTarget).attr("class") : $(event.relatedTarget).parent().attr("class");
            var extractedTimerId = $(event.relatedTarget).parent().closest("tr").data().timerId;
            var extractedTimerDescription = $(event.relatedTarget).parent().siblings(".descriptionTimer").text().split("-")[0];
            $(event.target).find(".deleteTimerDescription").html(extractedTimerDescription);
            $(event.target).find("#btnDeleteSubmitModal").attr("data-timer-id", extractedTimerId);
        },

        _displayTimerDescriptionOnModifyModalDialog: function (event) {
            console.log("view _displayTimerDescriptionOnModifyModalDialog");
            var extractedTimerId = $(event.relatedTarget).parent().closest("tr").data().timerId;
            var extractedTimerAndDescription = $(event.relatedTarget).parent().siblings(".descriptionTimer").text().split("-");
            var extractedTimerDescription = extractedTimerAndDescription[0].replace(/ +$/, "");
            var extractedTimerInfo = extractedTimerAndDescription[1].match(/\s+([0-9]+\:[0-9]+)\s+\(([0-9]+:[0-9]+)\)/);
            var extractedTotalHours = extractedTimerInfo[1].split(":")[0];
            var extractedTotalMinutes = extractedTimerInfo[1].split(":")[1];
            var extractedIntervalHours = extractedTimerInfo[2].split(":")[0];
            var extractedIntervalMinutes = extractedTimerInfo[2].split(":")[1];
            $(event.target).find("#modifyTimerDescription").val(extractedTimerDescription);
            $(event.target).find("#modifyTimerHours").val(extractedIntervalHours);
            $(event.target).find("#modifyTimerMinutes").val(extractedIntervalMinutes);

            $(event.target).find("#modifyTimerTotalHours").val(extractedTotalHours);
            $(event.target).find("#modifyTimerTotalMinutes").val(extractedTotalMinutes);

            $(event.target).find("#btnModifySubmitModal").attr("data-timer-id", extractedTimerId);
        },

        _enableTimerUI: function (event) {
            if ($(event.target).is("button")) {
                $(event.target).addClass("active");
            } else {
                $(event.target).parent().addClass("active");
            }
            $(event.target).closest("td").next().find("button").removeClass("active");
        },

        _disableTimerUI: function (event) {
            //enable pause
            if ($(event.target).is("button")) {
                $(event.target).addClass("active");
            } else {
                $(event.target).parent().addClass("active");
            }
            //disable play
            $(event.target).closest("td").prev().find("button").removeClass("active");
        },

        /**
         * timer 목록을 그려줌
         *
         * @param data
         * @private
         */
        _addAndListTimersOnView: function (data) {
            // console.log("view _addAndListTimersOnView data", data);
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

        _deleteTimersOnView: function (data) {
            console.log("view _deleteTimersOnView data", data);
            console.log("timers", this.model.timers);
            $("#timer-list").find("[data-timer-id=" + data._id + "]").remove();
        },

        _modifyTimersOnView: function (data) {
            console.log("view _modifyTimersOnView data", data);
            console.log("timers", this.model.timers);
            var description = data.timer_description + " - " + data.timer_total.hours + ":" + data.timer_total.minutes + "(" + data.timer_interval.hours + ":" + data.timer_interval.minutes + ")";
            $("#timer-list").find("[data-timer-id=" + data._id + "]").find(".descriptionTimer").html(description);
        },

        addTimerButton: function () {
            console.log("view addTimerButton");

            this.addTimerEventForController.notify({
                timer_description: $("#addTimerDescription").val(),
                timer_interval: {
                    hours: $("#addTimerHours").val(),
                    minutes: $("#addTimerMinutes").val()
                },
                timer_total: {
                    hours: $("#addTimerHours").val(),
                    minutes: $("#addTimerMinutes").val()
                },
                timer_status: true,
                start_date: Date.now(moment().format("YYYY-MM-DD"))
            });
        },

        /**
         * 선태한 timer를 삭제함
         */
        deleteTimerButton: function (event) {
            var timerId = $(event.target).data().timerId;
            this.deleteTimerEventForController.notify({
                _id: timerId
            });
        },

        modifyTimerButton: function () {
            var timerId = $(event.target).data().timerId;
            console.log("view modifyTimerButton timerId: ", timerId);

            this.modifyTimerEventForController.notify({
                _id: timerId,
                timer_description: $("#modifyTimerDescription").val(),
                timer_interval: {
                    hours: $("#modifyTimerHours").val(),
                    minutes: $("#modifyTimerMinutes").val()
                },
                timer_total: {
                    hours: $("#modifyTimerTotalHours").val(),
                    minutes: $("#modifyTimerTotalMinutes").val()
                }
            });
        },

        clickTable: function (event) {
            var selectedTimer = this._identifySelectedTimerAndButton(event);

            console.log("view clickTable selectedTimer", selectedTimer);

            if (selectedTimer.clickedButton === "pauseTimer") {
                this._disableTimerUI(event);

                this.updateTimerEventForController.notify({
                    _id: selectedTimer._id,
                    timer_status: false
                });
            }

            if (selectedTimer.clickedButton === "playTimer") {
                this._enableTimerUI(event);
                this.updateTimerEventForController.notify({
                    _id: selectedTimer._id,
                    timer_status: true
                });
            }

        },

        startCountDownTimer: function () {
            console.log("startCountDownTimer");
        },

        stopCountDownTimer: function () {
            console.log("stopCountDownTimer");
        },

        // Handlers From Event Dispatcher
        addTimer: function (sender, args) {
            console.log("viewer addTimer args", args);
            this._addAndListTimersOnView(args);
        },

        deleteTimer: function (sender, args) {
            console.log("viewer deleteTimer args", args);
            this._deleteTimersOnView(args);
        },

        modifyTimer: function (sender, args) {
            console.log("viewer modifyTimer args", args);
            this._modifyTimersOnView(args);
        },

        listTimers: function () {
            this._addAndListTimersOnView();
        }
    };

    return TimerView;
});