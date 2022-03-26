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
        this.cloud++;
        this.energy--;

        if (this.cloud >= 8) {

            var newX = floor(random(0, matrix[0].length));
            var newY = floor(random(0, matrix.length));

            var newWater = new Water(newX, newY, this.id);
            waterArr.push(newWater);

            matrix[newY][newX] = this.id;

            var oldId = matrix[newY][newX];

            if (oldId == 1) {
                this.kill(newX, newY, grassArr);
            } else if (oldId == 2) {
                // jnjel grassEaterArr
            }

            this.cloud = 0;
        }

        this.die();
    }

    kill(x, y, arr) {
        for (var i in arr) {
            if (x == arr[i].x && y == arr[i].y) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    die() {
        //ifum stugel naev motakayqum jur ka te voch
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
