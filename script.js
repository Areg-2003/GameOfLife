var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var humanArr = [];
var waterArr = [];

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
}

function createObjects(){
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
}

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