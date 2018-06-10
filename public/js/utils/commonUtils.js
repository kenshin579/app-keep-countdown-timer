define([
    "jquery"
], function ($) {
    var _cacheTemplate = [];

    return {
        getLastPathName: function (url) {
            return url.substring(url.lastIndexOf('/') + 1);
        },

        getTemplate: function (url, callback) {
            var filename = this.getLastPathName(url);
            if (_cacheTemplate[filename]) {
                if (callback) {
                    callback(_cacheTemplate[filename]);
                }
            } else {
                $.ajax({
                    url: url,
                    success: function (hbsTemplate) {
                        if (callback) {
                            _cacheTemplate[filename] = hbsTemplate;
                            callback(hbsTemplate);

                        }
                    }
                });
            }
        }
    }
});