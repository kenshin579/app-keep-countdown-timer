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
                url: "http://localhost:3000/api/add",
                contentType: "application/json;charset=UTF-8",
                type: "POST",
                data: JSON.stringify(args),
                cache: false,
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
        },

        deleteTimerToDb: function (args, successCallback, context) {
            $.ajax({
                url: "http://localhost:3000/api/delete/" + args.timerId,
                contentType: "application/json;charset=UTF-8",
                type: "DELETE",
                cache: false,
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
        },

        updateTimerToDb: function (args, successCallback, context) {
            console.log("updateTimerToDb args", args);

            $.ajax({
                url: "http://localhost:3000/api/update",
                contentType: "application/json;charset=UTF-8",
                type: "POST",
                data: JSON.stringify(args),
                cache: false,
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