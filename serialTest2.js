var SerialPort = require('serialport');

var port = null;

function createPort() {
  port = new SerialPort('/dev/cu.usbmodem1D1121', {
    parser: SerialPort.parsers.readline('\n')
  }, function(error) {
    if (error) {
       console.log(new Date() + ' -- unable to open port...');

      setTimeout(function() {
        createPort();
      },5000);
    } else {
      console.log(new Date() + ' -- opened...');
      handleData();
      console.log(port);
    }
  });
}

createPort();

function handleData() {
  port.on('data', function (data) {
    var vals = data.split("~");
    if (vals[0]>2) console.log(new Date() + " -- right");
    if (vals[1]>2) console.log(new Date() + " -- left");
    //console.log('Data: ' + data);
  });

  port.on('disconnect', function(error) {
    console.log(new Date() + ' -- disconnected...');
    createPort();
  })
}
