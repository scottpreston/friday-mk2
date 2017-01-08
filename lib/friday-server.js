"use strict";

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var RelayController = require('./relay-controller');

var FridayServer = function (options) {
    var options = options || {};
    // express app
    this.app = options.app || express();
    this.httpPort = options.httpPort || 8080;
    this.staticDir = options.staticDir || "";
    this.apiDir = options.apiDir || "/api";
    this.relayController = new RelayController();
    this.relayController.init(function() {
	console.log('starting relay control...');	
    });
    this.serialConnected = false;
    this.init();
};

FridayServer.prototype.init = function () {
    var self = this;
    // boilerplate for cors/json/etc
    this.app.use(cors()); // cors
    this.app.use(bodyParser.json()); // for parsing application/json
    this.app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    // routes
    this.app.get('/api/moveActuator/:actuator/:upOrDown', function (req, res) {
        var actuator = req.params.actuator;

        var upOrDown = req.params.upOrDown;
        if ((actuator == "left" || actuator == "right") && (upOrDown == "up") || upOrDown == "down" || upOrDown == "stop") {
            self.relayController.move(actuator, upOrDown);
            res.status(200).send({
                success: 'moved actuator:' + actuator + ', upOrDow:' + upOrDown
            });
        } else {
            res.send(500);
        }
    });

    this.app.get('/api/suit/:openOrClose', function (req, res) {
        var openOrClose = req.params.openOrClose;
        if (openOrClose == "open") {
            self.relayController.openSuit();
            res.status(200).send({success: 'opened suit'});
        } else if (openOrClose == "close") {
            self.relayController.closeSuit();
            res.status(200).send({success: 'closed suit'});
        } else {
            res.send(500);
        }
    });

    // for serial connection (biometric sensors)
    this.app.get('/api/setSerial/:connected', function (req, res) {
        var connected = req.params.connected;
        if (connected == "yes" || connected == "no") {
            self.serialConnected = connected
            res.status(200).send({success: 'updated connected'});
        } else {
            res.send(500);
        }
    });

    this.app.get('/api/serialConnected', function (req, res) {
        res.status(200).send({status: self.serialConnected});
    });

    this.app.use('/', express.static('./public'));
};

FridayServer.prototype.run = function () {
    this.app.listen(this.httpPort);
    console.log('Friday server app started on  ' + this.httpPort);
};

var configOptions = {
    httpPort: 8080,
    serialPortOptions: {
        baudRate: 9600
    },
    staticDir: 'public'};
var fridayServer = new FridayServer(configOptions);
fridayServer.run();
