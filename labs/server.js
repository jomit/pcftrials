var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.listen(3000, function () {
  console.log('See Dashboard on port 3000!')
});