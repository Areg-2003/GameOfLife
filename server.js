var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
const GrassEater = require('../third 1/GrassEater');

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

grassArr = [];
grassEaterArr = [];
predatorArr = [];
humanArr = [];
waterArr = [];

Grass = require('./Grass');
Grasseater = require('./GrassEater');
Human = require('./Human');
Predator = require('./Predator');
Water = require('/Water');

function createObjects(matrix){

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var g = new Grass(x, y, 1);
                grassArr.push(g);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var h = new Human(x, y, 4);
                humanArr.push(h);
            }
            else if (matrix[y][x] == 5) {
                var w = new Water(x, y, 5);
                waterArr.push(w);
            }
        }
    }

    io.sockets.emit('send matrix', matrix)

}

function action(){

    for(var i = 0; i < grassArr.length; i++){
        grassArr[i].mul();
    }

    for(var i = 0; i < grassEaterArr.length; i++){
        grassEaterArr[i].eat();
    }

    for(var i = 0; i < predatorArr.length; i++){
        predatorArr[i].eat();
    }

    for(var i = 0; i < humanArr.length; i++){
        humanArr[i].eat();
    }

    for(var i = 0; i < waterArr.length; i++){
        waterArr[i].rain();
    }

    io.sockets.emit("send matrix", matrix);
}

setInterval(action, 1000)

io.on('connection', function(socket) {
    createObjects(matrix);
})