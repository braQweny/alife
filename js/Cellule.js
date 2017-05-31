import ArrayList  from 'arraylist'
import Init  from './Init'

class Cellule {
    xPos;
    yPos;
    bacteriaNum;
    old;
    creepers;

    constructor() {
        this.creepers = new ArrayList()
    }

    setXPos(i) {
        this.xPos = i
    }

    setYPos(j) {
        this.yPos = j
    }

    getOld() {
        return this.old
    }

    setOld(old) {
        this.old = old
    }

    getBactNum() {
        return this.bacteriaNum
    }

    setBactNum(bactNum) {
        this.bacteriaNum = bactNum
    }

    addBactNum(bactNum) {
        this.bacteriaNum += bactNum
    }

    reduceBactNum(bactNum) {
        this.bacteriaNum -= bactNum;
        if (this.bacteriaNum < 0) {
            this.bacteriaNum = 0;
            console.log('UWAGA - miała miejsce próba usunięcia z komórki większej liczby bakterii ' +
                'niż w niej się znajdowało')

        }
    }

    getCreepersNum() {
        return this.creepers.size()
    }

    addCreeper(newCreeper) {
        this.creepers.add(newCreeper)
    }

    moveCreeper(existingCreeper) {
        existingCreeper.setXPos(this.xPos);
        existingCreeper.setYPos(this.yPos);
        this.creepers.add(existingCreeper)
    }

    removeCreeper(creeper) {
        if (!creepers.isEmpty()) {
            creepers.remove(creeper)
        } else {
            console.log('UWAGA - miała miejsce próba usunięcia pełzacza z komórki, w której nie ma pełzaczy')

        }
    }

    oneCelluleCreepersAction(w, tempWorld) {
        for (let i = this.creepers.size() - 1; i >= 0; i--) {
            this.creepers.get(i).creeperAction(w, tempWorld);
        }
    }

    oneCelluleBacteriaMultiplication(tempWorld) {
        let newBacteriaNumber, newBacteriaStayingInCell, remainingNewBacteriaMovingToNewCells


        if (this.bacteriaNum > 0) {
            newBacteriaNumber = parseInt(Math.round(bacteriaNum * Init.BACT_MULTIPLICATION_RATE))

            newBacteriaStayingInCell = (newBacteriaNumber * Init.BACT_SPREAD_RATE)
            tempWorld.board[xPos][yPos].addBactNum(newBacteriaStayingInCell)

            remainingNewBacteriaMovingToNewCells = newBacteriaNumber - newBacteriaStayingInCell

            goToNewCellules(tempWorld, remainingNewBacteriaMovingToNewCells)
        }
    }

    goToNewCellules(tempWorld, remainingNewBacteriaMovingToNewCells) {
        let newXPos, newYPos, newBacteriaPartMovingToNewCell;
        locationModifiers = Init.initializedLocationModifiersList();

        existingCellulesLocationModifiers = new ArrayList()

        for (let i = 0; i < locationModifiers.size(); i++) {
            newXPos = xPos + locationModifiers.get(i).modifyX;
            newYPos = yPos + locationModifiers.get(i).modifyY;

            if (!World.isCelluleOut(newXPos, newYPos))
                existingCellulesLocationModifiers.add(locationModifiers.get(i))
        }

        let i;
        while (existingCellulesLocationModifiers.size() > 0 && remainingNewBacteriaMovingToNewCells > 0) {
            i = parseInt((Math.random() * existingCellulesLocationModifiers.size()))
            newXPos = xPos + existingCellulesLocationModifiers.get(i).modifyX
            newYPos = yPos + existingCellulesLocationModifiers.get(i).modifyY

            if (existingCellulesLocationModifiers.size() == 1) {
                tempWorld.board[newXPos][newYPos].addBactNum(remainingNewBacteriaMovingToNewCells)
                remainingNewBacteriaMovingToNewCells = 0
            } else {
                newBacteriaPartMovingToNewCell = parseInt((Math.random() * remainingNewBacteriaMovingToNewCells))
                tempWorld.board[newXPos][newYPos].addBactNum(newBacteriaPartMovingToNewCell)

                remainingNewBacteriaMovingToNewCells -= newBacteriaPartMovingToNewCell
            }
            existingCellulesLocationModifiers.remove(i)
        }
    }

}

export default Cellule