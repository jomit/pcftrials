'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = '';
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
}

function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var connectCallback = function (err) {
   if (err) {
     console.log('Could not connect: ' + err);
   } else {
     console.log('Client connected');

     // Create a message and send it to the IoT Hub every second
     setInterval(function(){
         var temperature =   getRandomValue(0,150);
         var data = JSON.stringify({ deviceId: 'simulatedsensor1', temperature: temperature });
         var message = new Message(data);
         console.log("Sending message: " + message.getData());
         client.sendEvent(message, printResultFor('send'));
     }, 1000);
   }
};

client.open(connectCallback);
