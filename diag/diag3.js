// toggle all the linear actuators

var gpio = require('rpi-gpio');
var toggle = 0;

var pair = [[3, 5], [7, 16], [18, 22], [24, 26]];

//left arm
gpio.setup(3, gpio.DIR_OUT, start);
gpio.setup(5, gpio.DIR_OUT, start);

// right arm
gpio.setup(7, gpio.DIR_OUT, start);
gpio.setup(16, gpio.DIR_OUT, start);

//left leg
gpio.setup(18, gpio.DIR_OUT, start);
gpio.setup(22, gpio.DIR_OUT, start);

//right leg
gpio.setup(24, gpio.DIR_OUT, start);
gpio.setup(26, gpio.DIR_OUT, start);

function rset(pair, la1, la2) {
    gpio.write(pair[0], la1, function (err) {
        if (err) throw err;
        console.log('Written ' + la1 + ' to pin ' + pair[0]);
    });
    gpio.write(pair[1], la2, function (err) {
        if (err) throw err;
        console.log('Written ' + la2 + ' to pin ' + pair[1]);
    });
}

function down(pair) {
    rset(pair, 1, 0);
}
function up(pair) {
    rset(pair, 0, 1);
}
function stop() {
    rset(0, 0);
}

var count = 0;
var pairCount = 0;
function start() {
    count++;
    if (count == 8) {
        setInterval(function () {
            go()
        }, 5000);
    }
}


var steps = 0;
function go() {
    if (steps == 0) {
        down(pair[0]);
    }
    if (steps == 1) {
        up(pair[0]);
    }
    if (steps == 2) {
        down(pair[1]);
    }
    if (steps == 3) {
        up(pair[1]);
    }
    if (steps == 4) {
        down(pair[2]);
    }
    if (steps == 5) {
        up(pair[2]);
    }
    if (steps == 6) {
        down(pair[3]);
    }
    if (steps == 7) {
        up(pair[3]);
    }

    if (steps > 8) {
        process.exit();
    }
    steps++;
}

