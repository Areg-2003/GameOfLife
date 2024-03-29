let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

    constructor(x, y, id) {
        super(x, y);
        this.id = id;
    }


    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random()* emptyCells.length)]

        if (newCell && this.multiply >= 2 ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newGrass = new Grass(newX, newY, this.id);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }


}