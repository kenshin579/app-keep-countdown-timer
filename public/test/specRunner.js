require([
    "domReady!",
], function (document) {
    "use strict";
    jasmine.getEnv().addReporter(
        new jasmine.HtmlReporter()
    );

    jasmine.getEnv().execute();
});

// https://stackoverflow.com/questions/16423156/getting-requirejs-to-work-with-jasmine?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa