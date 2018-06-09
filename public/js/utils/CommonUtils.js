define([
    "jquery",
    "handlebars"
], function ($, Handlebars) {
    return {
        getTemplateAjax: function (url, data, callback) {
            var compiledTemplate;

            $.ajax({
                url: url,
                success: function (template) {
                    compiledTemplate = Handlebars.compile(template);
                    var htmlTemplate = compiledTemplate(data);
                    if (callback) {
                        callback(htmlTemplate);
                    }
                }
            });
        }
    }
});