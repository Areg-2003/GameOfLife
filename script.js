var socket = io();

var side = 30;

function setup() {
    matrix = generateMatrix(20);
    frameRate(5);
    createCanvas(side * matrix[0].length, side * matrix.length);
    background("#acacac");
    createObjects();
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            else{
                fill("#acacac");
            }

            rect(side * x, side * y, side, side);
        }
    }
}

socket.on('send matrix', draw);
