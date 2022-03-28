var socket = io();

var side = 30;

function setup() {
    
    createCanvas(side * 50, side *50);
    background("#acacac");

}

function nkarel(matrix) {
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

socket.on('send matrix', nkarel);
