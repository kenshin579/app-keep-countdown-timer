require.config({
    paths: {
        domReady: "lib/requirejs/domReady",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
        underscore: "//underscorejs.org/underscore-min"
    }
});

require([
    "jquery",
    "controllers/TimerController",
    "models/TimerModel",
    "views/TimerView",
    "domReady!"
], function ($, TimerController, TimerModel, TimerView) {
    "use strict";
    var model = new TimerModel();
    var view = new TimerView();
    var controller = new TimerController(model, view);

    //
    // var max = 4;
    // var timers = [];
    //
    // timers.push(new CountDownTimer({
    //     name: "english",
    //     hour: 1,
    //     min: 10,
    //     sec: 0
    // }));
    //
    // timers.push(new CountDownTimer({
    //     name: "korean",
    //     hour: 1,
    //     min: 5,
    //     sec: 10
    // }));
    //
    // timers[0].print();
    // timers[1].print();

    // for (var i = 0; i < max; i++) {
    //     timers.push(new CountDownTimer());
    // }

    // console.log("main.js started");
    // console.log(calculator.sum(1, 2)); // => 3

    // var myModuleInstance = new JTimer();
    // myModuleInstance.hello(); // 'hello!'
    // myModuleInstance.goodbye(); // 'goodbye!'

    //
    // $('#customer-rows').html(views.tablerow(datasource.list()));
    //
    // $('#customer-table').on('click', 'a.edit-customer', function (e) {
    //     e.preventDefault();
    //     var idx = $(this).data('id');
    //     $('#modal-body').html(views.dialog(datasource.get(idx)));
    //     $('#customer-modal').modal('show');
    // });
    //
    // $('#customer-modal').on('click', 'a.save-customer', function (e) {
    //     e.preventDefault();
    //     datasource.update($('#customer-form').serialize());
    //     $('#customer-modal').modal('hide');
    // });
});
