define([], function () {
    return {
        getTimersFromDb: function (successCallback, context) {
            $.ajax({
                url: "/api/timers",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                success: function (resultJson) {
                    successCallback.call(context, resultJson);
                },
                error: function (xhr) {
                    if ((xhr.statusText !== "abort" && xhr.status !== 503) && xhr.status !== 0) {
                        console.error("xhr error!!");
                    }
                }
            });
        },

        addTimerToDb: function (args, successCallback, context) {
            $.ajax({
                url: 'http://localhost:3000/api/add',
                dataType: 'json',
                type: 'POST',
                data: args,
                success: function (resultJson) {
                    console.log("resultJson:", resultJson);
                    successCallback.call(context, resultJson);
                    //
                    // if (data.result) {
                    //     self._showMessage(Constants.MESSAGE_SUCCESS, "저장 성공");
                    // } else {
                    //     self._showMessage(Constants.MESSAGE_FAIL, "저장 실패");
                    // }
                },
                error: function (request, status, error) {
                    console.error("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }


    }
});