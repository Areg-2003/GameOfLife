class Human {

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 60) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newHuman = new Human(newX, newY, this.id);
            humanArr.push(newHuman);
            this.energy = 10;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy -= 2;
        }

        this.die();
    }

    eat() {
        var foodGrass = this.chooseCell(1);
        var foodGrassEater = this.chooseCell(2);
        var foodPredator = this.chooseCell(3);
        var foodWater = this.chooseCell(5);
        var food = foodGrass.concat(foodGrassEater).concat(foodPredator).concat(foodWater);
        var newCell = random(food);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            // this.energy += 5;
            if (newCell == foodGrass) {
                this.energy++;
            }
            else if (newCell == foodWater) {
                this.energy += 2;
            }
            else if (newCell == foodGrassEater) {
                this.energy += 3;
            }
            else{
                this.energy += 5;
            }

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for (var i in waterArr) {
                if (newX == waterArr[i].x && newY == waterArr[i].y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }

            this.mul();
        }
        else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            for (var i in humanArr) {
                if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
        }
    }

}