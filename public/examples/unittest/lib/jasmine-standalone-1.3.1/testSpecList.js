require([
    "domReady!",
    "spec/PlayerSpec"
], function (document) {
    "use strict";
    jasmine.getEnv().addReporter(
        new jasmine.HtmlReporter()
    );

    jasmine.getEnv().execute();
});