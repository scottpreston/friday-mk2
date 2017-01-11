var gpio = require('rpi-gpio');

function relayWrite(pair, values) {
    gpio.write(pair[0], values[0], function (err) {
        if (err) throw err;
        log(values[0] + 'written to pin ' + pair[0]);
    });
    gpio.write(pair[1], values[1], function (err) {
        if (err) throw err;
        log(values[1] + 'written to pin ' + pair[1]);
    });
}

function log(s) {
    console.log(new Date() + " -- " + s);
}

var RelayController = function () {
};

var leftArm = [3, 5]; // to match GPIO pins
var rightArm = [7, 16];
var leftLeg = [18, 22];
var rightLeg = [24, 26];
var relayUp = [0, 1];
var relayDown = [1, 0];
var relayStop = [0, 0];

RelayController.prototype.move = function (actuator, upOrDown) {
    if (actuator == "left" && upOrDown == "up") {
        relayWrite(leftArm, relayUp);
    }
    if (actuator == "left" && upOrDown == "down") {
        relayWrite(leftArm, relayDown);
    }
    if (actuator == "left" && upOrDown == "stop") {
        relayWrite(leftArm, relayStop);
    }
    if (actuator == "right" && upOrDown == "up") {
        relayWrite(rightArm, relayUp);
    }
    if (actuator == "right" && upOrDown == "down") {
        relayWrite(rightArm, relayDown);
    }
    if (actuator == "right" && upOrDown == "stop") {
        relayWrite(rightArm, relayStop);
    }
}

RelayController.prototype.openSuit = function () {
    relayWrite(leftLeg, relayUp);
    relayWrite(rightLeg, relayUp);
}
RelayController.prototype.closeSuit = function () {
    relayWrite(leftLeg, relayUp);
    relayWrite(rightLeg, relayUp);
}

RelayController.init = function (callBack) {
    var count = 0;
    var setUp = function () {
        count++;
        if (count == 8) callBack();
    }

    gpio.setup(1, gpio.DIR_OUT, setUp);
    gpio.setup(2, gpio.DIR_OUT, setUp);

    gpio.setup(3, gpio.DIR_OUT, setUp);
    gpio.setup(4, gpio.DIR_OUT, setUp);

    gpio.setup(5, gpio.DIR_OUT, setUp);
    gpio.setup(6, gpio.DIR_OUT, setUp);

    gpio.setup(7, gpio.DIR_OUT, setUp);
    gpio.setup(8, gpio.DIR_OUT, setUp);

};

module.exports = RelayController;
