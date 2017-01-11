// test a  single relay connection

var gpio = require('rpi-gpio');
var toggle = 0;
gpio.setup(3, gpio.DIR_OUT, write);

function write() {
    var val = (toggle % 2);
    gpio.write(3, val, function (err) {
        if (err) throw err;
        console.log('Written ' + val + ' to pin 3');
    });
}
setInterval(function () {
    write();
    toggle++;
}, 2000);
