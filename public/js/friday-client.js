var API_URL = "http://10.10.10.53";

$(document).ready(function () {
    $(".biometrics-online").hide();
    $(".biometrics-offline").hide();
    $(".server-offline").hide();

    setInterval(function () {
        var url = "/api/serialConnected";
        $.getJSON(url, function (data) {
            if (data.status == "yes") {
                biometricsOnline()
            }
            if (data.status == "no") {
                biometricsOffline();
            }
        }).fail(function () {
                $(".server-offline").show();
            })

    }, 5000);

    $(".openSuit").click(function (e) {
        move("/api/suit/open");
    });

    $(".closeSuit").click(function (e) {
        move("/api/suit/close");
    });

    $(".leftArmUp").click(function (e) {
        move("/api/moveActuator/left/up");
    });

    $(".leftArmDown").click(function (e) {
        move("/api/moveActuator/left/down");
    });

    $(".rightArmUp").click(function (e) {
        move("/api/moveActuator/right/up");
    });

    $(".rightArmDown").click(function (e) {
        move("/api/moveActuator/right/down");
    });

});

function biometricsOnline() {
    $(".server-offline").hide();
    $(".biometrics-online").show();
    $(".biometrics-offline").hide();
}

function biometricsOffline() {
    $(".server-offline").hide();
    $(".biometrics-online").hide();
    $(".biometrics-offline").show();
}

function move(url) {
    $.getJSON(url, function (data) {
        console.log(data);
    });
}