class Predator extends LivingCreature {

    constructor(x, y, id) {
        super(x, y);
        this.id = id;
        this.energy = 10;
    }

    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
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

        if (newCell && this.energy >= 13) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newPredator = new Predator(newX, newY, this.id);
            predatorArr.push(newPredator);
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

            this.energy--;
        }

        this.die();
    }

    eat() {
        var food = this.chooseCell(2);
        var newCell = random(food);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy+=5;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
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
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
        }
    }

}