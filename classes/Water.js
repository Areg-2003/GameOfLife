let LivingCreature = require('./LivingCreature');

module.exports = class Water extends LivingCreature {

    constructor(x, y, id) {
        super(x, y);
        this.id = id;
        this.cloud = 0;
        this.energy = 50;
    }

    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }

    rain() {

        // var emptyCells = this.chooseCell(0);
        // var newCell = emptyCells[Math.floor(Math.random()* emptyCells.length)];

        // if (newCell && this.energy >= 3) {
        //     var newX = newCell[0];
        //     var newY = newCell[1];
        //     matrix[newY][newX] = this.id;

        //     var newWater = new Water(newX, newY, this.id);
        //     waterArr.push(newWater);
        //     this.energy = 0;
        // }

        this.cloud++;
        this.energy--;

        if (this.cloud >= 8){

            while(this.cloud > 0){

                var newX =  Math.random() * matrix[0].length;
                var newY = Math.random() * matrix.length;

                var newWater = new Water(newX, newY, this.id);
                waterArr.push(newWater);

                matrix[newY][newX] = this.id;

                var oldId = matrix[newY][newX];

                if (oldId == 1) {
                    this.kill(newX, newY, grassArr);
                } 
                else if (oldId == 2) {
                    this.kill(newX, newY, grassEaterArr);
                }
                else if (oldId == 3) {
                    this.kill(newX, newY, predatorArr);
                }
                else if (oldId == 4) {
                    this.kill(newX, newY, humanArr);
                }

                this.cloud--;
            }
        }

        this.die();
    }

    kill(x, y, arr) {
        for (var i in arr) {
            if (x == arr[i].x && y == arr[i].y) {
                arr.splice(i, 5);
                break;
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            for (var i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
        }
    }
}
