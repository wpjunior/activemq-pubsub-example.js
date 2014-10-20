var stompit = require('stompit');
var reconnectOptions = {
    maxReconnectAttempts: 2
};

var connection = new stompit.ConnectFailover([{
    timeout: 5000,
    host: process.env['HOST'] || 'localhost',
    port: process.env['PORT'] || 61613,
    connectHeaders:{
        'host': process.env['HOST'] || 'localhost',
        'login': 'admin',
        'passcode': 'admin',
        'heart-beat': '10000,10000'
    }
}], reconnectOptions);
module.exports = new stompit.Channel(connection);
