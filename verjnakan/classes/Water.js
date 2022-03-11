class Water {

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.cloud = 0;
        this.energy = 50;
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