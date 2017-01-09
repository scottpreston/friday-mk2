var gpio = require('rpi-gpio');

var RelayController  = function() {};

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

module.exports = RelayController;
