// single pair, up and down

var gpio = require('rpi-gpio');
var toggle = 0;

gpio.setup(3, gpio.DIR_OUT, start);
gpio.setup(5, gpio.DIR_OUT, start);

function rset(la1, la2) {
    gpio.write(3, la1, function (err) {
        if (err) throw err;
        console.log('Written ' + la1 + ' to pin ' + 3);
    });
    gpio.write(5, la2, function (err) {
        if (err) throw err;
        console.log('Written ' + la2 + ' to pin ' + 5);
    });
}

function down() {
    rset(1, 0);
}
function up() {
    rset(0, 1);
}
function stop() {
    rset(0, 0);
}

var count = 0;
function start() {
    count++;
    if (count == 1) {
        setInterval(function () {
            var val = (toggle % 2)
            if (toggle % 2) {
                up();
            } else {
                down();
            }
            toggle++;
        }, 5000);
    }
}
