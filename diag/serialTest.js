var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
    parser: SerialPort.parsers.readline('\n')
  }, function(error) {
    if (error) {
       console.log(new Date() + 'unable to open port...');
       process.exit(1);
     }
  });

port.on('data', function (data) {
  var vals = data.split("~");
 // if (vals[0]>2) console.log(new Date() + " -- right");
 // if (vals[1]>2) console.log(new Date() + " -- left");
  console.log('Data: ' + data);
});
