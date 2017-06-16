import ArrayList  from 'arraylist'
import Init  from './Init'
import World  from './World'

class ArtLife_2_1 {
  static totallyCreepers = new ArrayList()
  static totallyBacteria = new ArrayList()
  static simulation = []

  static bacteriaTest (w) {
    for (let i = 0; i < Init.SIZE_WORLD; i++) {
      for (let j = 0; j < Init.SIZE_WORLD; j++) {
        console.log('%d', w.board[i][j].getBactNum())
      }
      console.log('\n')
    }
  }

  static creepersTest (w) {

    for (let i = 0; i < Init.SIZE_WORLD; i++) {
      for (let j = 0; j < Init.SIZE_WORLD; j++)
        console.log('%d', w.board[i][j].getCreepersNum());

    }
    console.log('\n')
  }

  static mainTest (w) {
    for (let i = 0; i < Init.SIZE_WORLD; i++) {
      for (let j = 0; j < Init.SIZE_WORLD; j++) {
        console.log(w.board[i][j].getBactNum() + '|' +
          w.board[i][j].getCreepersNum())
      }

    }
    console.log('\n')
  }

  static mainTest2 (w, numTact) {
    let tempw = []
    for (let i = 0; i < Init.SIZE_WORLD; i++) {
      for (let j = 0; j < Init.SIZE_WORLD; j++) {
        tempw.push([w.board[i][j].getBactNum(), w.board[i][j].getCreepersNum(), w.board[i][j].xPos, w.board[i][j].yPos])
      }

    }

    this.simulation.push({
      tactNum: numTact,
      world: tempw
    })

  }

  static totalNum (w, what) {
    let sum = 0
    for (let i = 0; i < Init.SIZE_WORLD; i++)
      for (let j = 0; j < Init.SIZE_WORLD; j++)
        switch (what) {
          case 'BACTERIA':
            sum += w.board[i][j].getBactNum()
            break
          case 'CREEPERS':
            sum += w.board[i][j].getCreepersNum()
        }
    return sum
  }

  static addNewBornOrganismsToMainWorldCellules (mainWorld, tempWorld) {
    for (let i = 0; i < Init.SIZE_WORLD; i++) {
      for (let j = 0; j < Init.SIZE_WORLD; j++) {
        mainWorld.board[i][j].addBactNum(tempWorld.board[i][j].getBactNum())
        mainWorld.board[i][j].creepers.add(tempWorld.board[i][j].creepers)
      }
    }
  }

  static addExtraBacteries (word, bactNumToAdd, tactStart, tacts, tact) {
    let bactNum = parseInt(bactNumToAdd / tacts)
    let inRange = ((tactStart + tacts ) < Init.NUM_TACT) && (tactStart <= tact) && ( tact < (tactStart + tacts))
    if (inRange) {
      console.log('TACT ==============>', tact)
      word.sowBacteries(bactNum)
    }
  }

  static addExtraCreepers (word, creepersNumToAdd, tactStart, tacts, tact) {
    let creepersNum = parseInt(creepersNumToAdd / tacts)
    let inRange = ((tactStart + tacts ) < Init.NUM_TACT) && (tactStart <= tact) && ( tact < (tactStart + tacts))
    if (inRange) {
      console.log('TACT ==============>', tact)
      word.sowCreepers(creepersNum)
    }
  }

  static main () {
    let mainWorld
    let tempWorld
    mainWorld = new World()
    let arr = []

    mainWorld.sowBacteries(Init.START_NUM_BACT)
    mainWorld.sowCreepers(Init.START_NUM_CREEPERS)
    let numTact = 0, num, totalBactNum

    console.log('Stan początkowy')
    this.mainTest(mainWorld)

    this.totallyCreepers.add(this.totalNum(mainWorld, 'CREEPERS'))
    this.totallyBacteria.add(this.totalNum(mainWorld, 'BACTERIA'))

    let prematureEndOfSimulation = false
    while (numTact < Init.NUM_TACT && !prematureEndOfSimulation) {
      num = 0
      while (num < Init.VEW_NUM_TACT && !prematureEndOfSimulation) {
        arr.push({
          tactNum: numTact,
          bactNum: this.totalNum(mainWorld, 'BACTERIA'),
          creeperNum: this.totalNum(mainWorld, 'CREEPERS')
        })

        tempWorld = new World()
        mainWorld.creepersAndBacteriaAction(mainWorld, tempWorld)
        this.addNewBornOrganismsToMainWorldCellules(mainWorld, tempWorld)
        this.totallyCreepers.add(this.totalNum(mainWorld, 'CREEPERS'))
        totalBactNum = this.totalNum(mainWorld, 'BACTERIA')
        this.totallyBacteria.add(totalBactNum)

        if (totalBactNum > Init.BACT_NUM_LIMIT) {
          prematureEndOfSimulation = true
        }
        this.addExtraBacteries(mainWorld, Init.wartosc_bact, Init.tact_start_bact, Init.wartosc_creep_tacts, numTact)
        this.addExtraCreepers(mainWorld, Init.wartosc_creep, Init.tact_start_creep, Init.wartosc_creep_tacts, numTact)
        num++
        numTact++
      }

      console.log('Przebieg ' + numTact)
      this.mainTest(mainWorld)
      this.mainTest2(mainWorld, numTact)

    }

    // console.log("\n");
    // console.log("---------------------------------------");
    // console.log("Bacteries");
    //
    // for (let i = 0; i < this.totallyCreepers.size(); i++) {
    //     console.log("%d", this.totallyBacteria.get(i));
    // }
    // console.log("Creepers");
    // for (let i = 0; i < this.totallyCreepers.size(); i++) {
    //     console.log("%d", this.totallyCreepers.get(i));
    // }
    // if (prematureEndOfSimulation) {
    //     console.log("Sumaryczna liczba bakterii przekroczyła " + Init.BACT_NUM_LIMIT
    //         + " - komórki umierają/koniec symulacji.");
    // }

    console.log('\n')
    let totallyB = this.totallyBacteria.toArray()
    let totallyC = this.totallyCreepers.toArray()
    let simulation = this.simulation

    this.simulation = []
    this.totallyBacteria.clear()
    this.totallyCreepers.clear()

    return {arr: arr, total: [totallyC, totallyB], simulation: simulation}
  }
}
export default ArtLife_2_1
