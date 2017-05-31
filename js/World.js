import Cellule  from './Cellule'
import Init  from './Init'
import Creeper  from './Creeper'
class World {
    board = [];


    constructor() {
        // board = new Cellule[Init.SIZE_WORLD][Init.SIZE_WORLD];


        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            this.board[i] = [];
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                this.board[i][j] = new Cellule();
                this.board[i][j].setXPos(i);
                this.board[i][j].setYPos(j);
            }
        }
    }

    static isCelluleOut(x, y) {

        if ((x < 0) || (y < 0) || (x == Init.SIZE_WORLD) || (y == Init.SIZE_WORLD)) {
            return true;
        } else {
            return false;

        }
    }

    setBacteriaNumAtPosition(bactNum, posX, posY) {
        board[posX][posY].setBactNum(bactNum);
    }

    setOneCreeperAtPosition(posX, posY) {
        board[posX][posY].creepers.add(new Creeper(posX, posY));
    }

    sowBacteries(bactNumToSow) {

        let allNumBact = 0;
        let randomNumBact;
        let iPos;
        let jPos;
        while (allNumBact < bactNumToSow) {
            iPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            jPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            randomNumBact = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            this.board[iPos][jPos].addBactNum(randomNumBact);
            allNumBact += randomNumBact;
        }
    }

    sowCreepers(creepersNumToSow) {

        let actualNumCreep = 0;
        let iPos;
        let jPos;

        while (actualNumCreep < creepersNumToSow) {
            iPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            jPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            this.board[iPos][jPos].creepers.add(new Creeper(iPos, jPos));
            actualNumCreep++;
        }
    }

    creepersAndBacteriaAction(w, tempWorld) {

        let allCellules = Init.SIZE_WORLD * Init.SIZE_WORLD;
        let numCellules = 0;
        let iPos;
        let jPos;
        // poniżej przygotowanie komórek do losowych odwiedzin
        for (let i = 0; i < Init.SIZE_WORLD; i++)
            for (let j = 0; j < Init.SIZE_WORLD; j++)
                w.board[i][j].setOld(false);


        while (numCellules < allCellules) {
            iPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            jPos = parseInt((Math.random() * 100) / Init.SIZE_WORLD);
            let cell = w.board[iPos][jPos];

            if (!cell.getOld()) {
                if (Math.random() > 0.5) {
                    cell.oneCelluleCreepersAction(w, tempWorld);
                    cell.oneCelluleBacteriaMultiplication(tempWorld);
                } else {
                    cell.oneCelluleBacteriaMultiplication(tempWorld);
                    cell.oneCelluleCreepersAction(w, tempWorld);
                }

                cell.setOld(true);
                numCellules++;
            }
        }
    }
}

export default World