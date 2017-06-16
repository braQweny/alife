import CelluleLocation  from './CelluleLocation'
import Init  from './Init'
import World  from './World'

class Creeper {

    xPos;
    yPos;
    creeperEnergy;

    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.creeperEnergy = Init.CREEPER_INITIAL_ENERGY
    }

    setXPos(newXPos) {
        this.xPos = newXPos
    }

    setYPos(newYPos) {
        this.yPos = newYPos
    }

    addCreeperEnergy(bactNum) {

        this.creeperEnergy += bactNum
    }

    reduceCreeperEnergy(energy) {
        this.creeperEnergy -= energy;
        if (this.creeperEnergy < 0) {
            this.creeperEnergy = 0
        }
    }

    creeperHasEnergy() {
        return this.creeperEnergy > 0
    }

    creeperHasEnoughEnergyToMakeNewCreeper() {
        return this.creeperEnergy >= (Init.CREEPER_ENERGY_PRO_LIFE + Init.CREEPER_ENERGY_RESERVE)
    }

    checkNewCellules(w, tempWorld) {
        let locationModifiers = Init.initializedLocationModifiersList();
        // console.log(locationModifiers);
        var i, newXPos, newYPos, bestXPos, bestYPos, bactNum;
        // console.log(locationModifiers.size())
        bestXPos = -1;
        bestYPos = -1;
        bactNum = 0;

        while (locationModifiers.size() > 0) {

            i = parseInt((Math.random() * locationModifiers.size()));
            // console.log(locationModifiers.size())
            // console.log(this.xPos + locationModifiers.get(i).modifyX)
            newXPos = this.xPos + locationModifiers.get(i).modifyX;
            newYPos = this.yPos + locationModifiers.get(i).modifyY;
            // console.log(newXPos);

            if (!(World.isCelluleOut(newXPos, newYPos))) {
                if (w.board[newXPos][newYPos].getBactNum() > bactNum) {
                    bactNum = w.board[newXPos][newYPos].getBactNum();
                    bestXPos = newXPos
                    bestYPos = newYPos
                }
            }

            locationModifiers.remove(i)
        }

        return new CelluleLocation(bestXPos, bestYPos)
    }

    creeperAction(w, tempWorld) {
        let tempCreeper;
        let currentCellule = w.board[this.xPos][this.yPos];
        let currentCelluleBactNum;
        let bestXPos, bestYPos;
        let celluleWithHighestBactNum;

        let bornCreepersNum = 0;

        while (this.creeperHasEnoughEnergyToMakeNewCreeper() && bornCreepersNum < (Init.MAX_CREEPER_NUM_BORN_PER_TACK - 1)) {
            currentCellule.addCreeper(new Creeper(this.xPos, this.yPos));
            this.reduceCreeperEnergy(Init.CREEPER_ENERGY_PRO_LIFE);
            bornCreepersNum++
        }

        if (this.creeperHasEnoughEnergyToMakeNewCreeper()) {
            currentCellule.addCreeper(new Creeper(this.xPos, this.yPos));
            this.reduceCreeperEnergy(Init.CREEPER_ENERGY_PRO_LIFE)
        }

        else {
            currentCelluleBactNum = currentCellule.getBactNum();
            if (currentCelluleBactNum > 0) {
                if (currentCelluleBactNum >= Init.MAX_BACT_EATEN_BY_CREEPER) {
                    this.addCreeperEnergy(Init.MAX_BACT_EATEN_BY_CREEPER);
                    currentCellule.reduceBactNum(Init.MAX_BACT_EATEN_BY_CREEPER)
                } else {
                    this.addCreeperEnergy(currentCelluleBactNum);
                    currentCellule.reduceBactNum(currentCelluleBactNum)
                }
            }

            else {
                if (this.creeperHasEnergy()) {
                    celluleWithHighestBactNum = this.checkNewCellules(w, tempWorld);
                    bestXPos = celluleWithHighestBactNum.posX;
                    bestYPos = celluleWithHighestBactNum.posY;
                    if (bestXPos > -1 && bestYPos > -1) {
                        this.reduceCreeperEnergy(1);
                        tempCreeper = this;
                        w.board[this.xPos][this.yPos].removeCreeper(this);
                        tempWorld.board[bestXPos][bestYPos].moveCreeper(tempCreeper)
                    } else {
                        this.reduceCreeperEnergy(1)
                    }
                } else currentCellule.removeCreeper(this)
            }
        }
    }
}

export default Creeper