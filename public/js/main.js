require.config({
    paths: {
        domReady: "lib/requirejs/domReady",
        handlebars: "lib/handlebars/handlebars-v4.0.11",
        moment: "lib/moment/moment",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
        underscore: "//underscorejs.org/underscore-min",

    }
});

require([
    "controllers/App",
    "domReady!"
], function (App) {
    "use strict";
    new App().initialize().run();
});
