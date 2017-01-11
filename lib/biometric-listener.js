var SerialPort = require('serialport');
var request = require('request');

var lastRequestTime = new Date().getTime();

var SERIAL_PORT_IDENTIFIER = '/dev/ttyACM0'; // pi
//var SERIAL_PORT_IDENTIFIER = '/dev/cu.usbmodem1D1121'; // osx

var SERVER_ADDRESS = 'http://10.10.10.53:8080';
var SERIAL_ON_URL = SERVER_ADDRESS + "/api/setSerial/yes";
var SERIAL_OFF_URL = SERVER_ADDRESS + "/api/setSerial/no";
var LEFT_ARM_UP = SERVER_ADDRESS + "/api/moveActuator/left/up";
var LEFT_ARM_DOWN = SERVER_ADDRESS + "/api/moveActuator/left/down";
var LEFT_ARM_STOP = SERVER_ADDRESS + "/api/moveActuator/left/stop";
var RIGHT_ARM_UP = SERVER_ADDRESS + "/api/moveActuator/right/up";
var RIGHT_ARM_DOWN = SERVER_ADDRESS + "/api/moveActuator/right/down";
var RIGHT_ARM_STOP = SERVER_ADDRESS + "/api/moveActuator/right/stop";
var OPEN_SUIT_URL = SERVER_ADDRESS + "/api/suit/open";
var CLOSE_SUIT_URL = SERVER_ADDRESS + "/api/suit/close";

function createPort() {
    port = new SerialPort(SERIAL_PORT_IDENTIFIER, {
        parser: SerialPort.parsers.readline('\n')
    }, function (error) {
        if (error) {
            log('unable to open port...');
            setTimeout(function () {
                createPort();
            }, 5000);
        } else {
            log("opened port");
            sendRequest(SERIAL_ON_URL);
            sendRequest(CLOSE_SUIT_URL);
            handleData();
        }
    });
}

function handleData() {
    port.on('data', function (data) {
        var vals = data.split("~");
        // logic for actuators here.
        var rightArm = vals[0];
        var leftArm = vals[1];
        if (rightArm > 3) sendRequest(RIGHT_ARM_UP);
        if (rightArm < 1) sendRequest(RIGHT_ARM_DOWN);
        if (rightArm >= 1 && rightArm <= 3) sendRequest(RIGHT_ARM_STOP);
        if (leftArm > 3) sendRequest(LEFT_ARM_UP);
        if (leftArm < 1) sendRequest(LEFT_ARM_DOWN);
        if (leftArm >= 1 && rigthArm <= 3) sendRequest(LEFT_ARM_STOP);
    });

    port.on('disconnect', function (error) {
        log("disconnected");
        sendRequest(OPEN_SUIT_URL);
        sendRequest(SERIAL_OFF_URL);
        createPort();
    })
}

function sendRequest(url) {
    var requestTime = new Date().getTime();
    if (requestTime > lastRequestTime + 100) {
        log(url);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                log(body);
            }
        });
    }
}

function log(s) {
    console.log(new Date() + " -- " + s);
}

// initialize
createPort();
