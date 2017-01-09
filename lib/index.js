var FridayServer = require("./friday-server");
var configOptions = {
  httpPort: 8080,
  portName: '/dev/ttyACM0',
  serialPortOptions: {
    baudRate: 9600
  },
  staticDir: 'public'};
var fridayServer = new FridayServer(configOptions);
fridayServer.run();
