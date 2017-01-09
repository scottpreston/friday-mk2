var gpio = require('rpi-gpio');

var RelayController  = function() {};

var leftArm = [1,1]; // to match GPIO pins
var rightArm = [2,2];
var leftLeg = [3,3];
var rightLeg = [4,4];
var relayUp = [0,1];
var relayDown = [1,0];
var relayStop = [0,0];

function moveLeftUp() {
  relayWrite(leftArm,relayUp);
}

function moveLeftDown() {
  relayWrite(leftArm,relayDown);
}

function moveRightUp() {
  relayWrite(rightArm,relayUp);
}

function moveRightDown() {
  relayWrite(rightArm,relayDown);
}

function openSuit() {
  relayWrite(leftLeg,relayUp);
  relayWrite(rightLeg,relayUp);
}
function closeSuit() {
  relayWrite(leftLeg,relayUp);
  relayWrite(rightLeg,relayUp);
}

function relayWrite(pair, values) {
    gpio.write(pair[0], values[0], function(err) {
        if (err) throw err;
        log(values[0] + 'ritten to pin ' + pair[0]);
    });
    gpio.write(pair[1], values[1], function(err) {
        if (err) throw err;
        log(values[1] + 'ritten to pin ' + pair[1]);
    });
}

RelayController.init = function(callBack) {
  var count = 0;
  var setUp = function() {
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

RelayController.move = function(actuator,upOrDown) {

}
function log(s) {
  console.log(new Date() + " -- " + s);
}
module.exports = RelayController;
