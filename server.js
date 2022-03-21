var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function generateMatrix(size) {

    var matrix = [];

    for (var y = 0; y < size; y++) {
        matrix[y] = [];
        for (var x = 0; x < size; x++) {
            var randomElement = random([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 5])
            matrix[y][x] = randomElement;
        }
    }

    return matrix;
}

io.sockets.emit('send matrix', matrix);