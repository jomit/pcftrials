
var EventHubClient = require('azure-event-hubs').Client;
var connectionString = '';


// var express = require('express');
// var app = express();

// app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// app.listen(3000, function () {
//   console.log('See Dashboard on port 3000!')
// });

var printError = function (err) {
   console.log(err.message);
};

var printMessage = function (message) {
   console.log('Message received: ');
   console.log(JSON.stringify(message.body));
   console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);

