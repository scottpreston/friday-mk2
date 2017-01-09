"use strict";

var SerialServo = require("serialservo");
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
    this.serialPort = options.serialPort;
    this.relayController = new RelayController();
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
      var actuatorNumber = req.params.actuator;
      var upOrDown = req.params.upOrDown;
      if (actuatorNumber >= 0 && actuatorNumber <= 3) {
          this.relayController.move(actuatorNumber,upOrDown);
          res.status(200).send({success: 'moved the actuator', message: 'moved actuator:' + actuatorNumber + ', upOrDow:' + upOrDown});
      } else {
          res.send(500);
      }
    });
    // optional
    if (this.staticDir != "") {
        this.app.use('/', express.static(this.staticDir));
    }

};

FridayServer.prototype.run = function () {
    this.app.listen(this.httpPort);
    console.log('Friday server app started on  ' + this.httpPort);
};

module.exports = FridayServer;
