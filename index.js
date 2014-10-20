var readline = require('readline');
var channel = require('./channel');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var TOPIC_NAME = 'TestTopic';

channel.subscribe('/topic/'+ TOPIC_NAME, function(error, message) {
    if (error) {
        console.log('sub error: ' + error.message);
        process.exit();
        return;
    }
    message.readString('utf8', function(error, body) {

        if (error) {
            console.log('read message error ' + error.message);
            return;
        }

        console.log('received message: ' + body);
        message.ack();
    });
});

console.log('Plase type a message');

rl.on('line', function (message) {
    if (message == 'exit') {
        rl.close();
        return;
    }

    channel.send('/topic/'+ TOPIC_NAME, message, function(error) {
        if (error) {
            console.log('pub error: ' + error.message);
            process.exit();
            return;
        }
    });
});

rl.on('close', function() {
  console.log('Exit pub/sub example');
  process.exit(0);
});
