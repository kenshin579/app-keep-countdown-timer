define([
    "utils/CountDownTimer"
], function (CountDownTimer) {
    "use strict";

    describe("기본 기능 테스트", function () {
        var countTimer = new CountDownTimer({
            hours: 5,
            minutes: 10,
            seconds: 10
        });

        it("test1", function () {
            countTimer.print();
            // expect(a).toBe(true);
        });

        it("test1", function () {
            countTimer.start();
            // expect(a).toBe(true);
        });
    });
});