require.config({
    paths: {
        domReady: "../js/lib/requirejs/domReady"
    }
});

require([
    "domReady!",
    "spec/utils/CountDownTimerTest"
], function (document) {
    "use strict";
    jasmine.getEnv().addReporter(
        new jasmine.HtmlReporter()
    );

    jasmine.getEnv().execute();
});

/*
https://stackoverflow.com/questions/16423156/getting-requirejs-to-work-with-jasmine?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://automationpanda.com/2018/01/26/javascript-testing-with-jasmine/
https://medium.com/@BoweiHan/setup-for-testing-amd-modules-with-karma-requirejs-and-mocha-2be3931c6a72
https://open.blogs.nytimes.com/2015/01/15/how-to-unit-test-a-requirejs-application/
https://www.bennadel.com/blog/2393-writing-my-first-unit-tests-with-jasmine-and-requirejs.htm
https://stackoverflow.com/questions/29648543/how-can-i-load-a-module-with-requirejs-for-testing-in-a-testing-framework-like-j
http://kilon.org/blog/2012/08/testing-backbone-requirejs-applications-with-jasmine/
 */
