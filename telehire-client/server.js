var express = require('express');
var path = require('path');

var server = express(); // better instead
server.use(express.static(path.join(__dirname, 'dist'))); //  "public" off of current is root


server.listen(3000);
