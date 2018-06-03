// import * as JTimer from 'JTimer';

$(document).ready(function () {
    console.log("ready!");
    $("#timeTable tr:has(td)").click(function (e) {
        const clickedCell = $(e.target).closest("td");
        const REGREX_EXTRACT_TIMER = /.* ([0-9]+:[0-9]+).*/g;
        const matchTimer = REGREX_EXTRACT_TIMER.exec(clickedCell.text());
        $("#main-timer").text(matchTimer[0]);
    });

    $("#main-timer-start").click(function (e) {
        var myModuleInstance = new JTimer();
        myModuleInstance.hello(); // 'hello!'
        myModuleInstance.goodbye(); // 'goodbye!'
    });

    $("#btnSubmitModal").click(function (event) {
        $.ajax({
            url: 'http://localhost:3000/new',
            dataType: 'json',
            type: 'POST',
            data: {
                'newTimerDescription': $("#newTimerDescription").val(),
                'newTimerHours': $("#newTimerHours").val(),
                'newTimerMinutes': $("#newTimerMinutes").val()
            },
            success: function (result) {
                console.log("result:", result);
            },
            error: function (request, status, error) {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });

        $('#newTimerModel').modal('hide');
    });
});