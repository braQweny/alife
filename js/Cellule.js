import ArrayList  from 'arraylist'
import Init  from './Init'

class Cellule {
  xPos
  yPos
  bacteriaNum
  old
  creepers

  constructor () {
    this.creepers = new ArrayList()
  }

  setXPos (i) { this.xPos = i }

  setYPos (j) { this.yPos = j }

  getOld () { return old }

  setOld (old) { this.old = old }

  getBactNum () { return bacteriaNum }

  setBactNum (bactNum) { bacteriaNum = bactNum }

  addBactNum (bactNum) { bacteriaNum += bactNum }

  reduceBactNum (bactNum) {
    bacteriaNum -= bactNum
    if (bacteriaNum < 0) {
      bacteriaNum = 0
      console.log('UWAGA - miała miejsce próba usunięcia z komórki większej liczby bakterii ' +
        'niż w niej się znajdowało')
      //ten komunikat może ułatwić znalezienie błędów powstałych podczas poprawiania algorytmu
      //nie może pojawić się nigdy, gdy symulacja przebiega prawidłowo
    }
  }

  getCreepersNum () { return creepers.size() }

  addCreeper (newCreeper) { creepers.add(newCreeper) }

  moveCreeper (existingCreeper) {
    existingCreeper.setXPos(this.xPos)
    existingCreeper.setYPos(this.yPos)
    creepers.add(existingCreeper)
  }

  removeCreeper (creeper) {
    if (!creepers.isEmpty()) {
      creepers.remove(creeper)
    } else {
      console.log('UWAGA - miała miejsce próba usunięcia pełzacza z komórki, w której nie ma pełzaczy')
      //ten komunikat może ułatwić znalezienie błędów powstałych podczas poprawiania algorytmu
      //nie może pojawić się nigdy, gdy symulacja przebiega prawidłowo
    }
  }

  oneCelluleCreepersAction (w, tempWorld) {
    for (let i = creepers.size() - 1; i >= 0; i--) //iterowanie od ostatniego do pierwszego pełzacza
      creepers.get(i).creeperAction(w, tempWorld);
  }

  oneCelluleBacteriaMultiplication (tempWorld) {
    let newBacteriaNumber, newBacteriaStayingInCell, remainingNewBacteriaMovingToNewCells
    //nowo urodzone bakterie nie będą mogły być zjedzone w tym takcie, w którym się urodziły
    //ponieważ trafiają do tempWorld. Dzięki temu symualcja jest stabilniejsza.

    if (bacteriaNum > 0) {
      newBacteriaNumber = Math.round(bacteriaNum * Init.BACT_MULTIPLICATION_RATE)
      //liczba nowo urodzonych bakterii

      newBacteriaStayingInCell = (newBacteriaNumber * Init.BACT_SPREAD_RATE)
      tempWorld.board[xPos][yPos].addBactNum(newBacteriaStayingInCell)
      //część nowo urodzonych bakterii określona przez BACT_SPREAD_RATE, która pozostaje
      //w komórce macierzystej (jej odpowiedniku w tempWorld)

      remainingNewBacteriaMovingToNewCells = newBacteriaNumber - newBacteriaStayingInCell
      //pozostałe nowourodzone bakterie, które maja się przenieść do sąsiednich komórek

      goToNewCellules(tempWorld, remainingNewBacteriaMovingToNewCells)
    }
  }

  goToNewCellules (tempWorld, remainingNewBacteriaMovingToNewCells) {
    var newXPos, newYPos, newBacteriaPartMovingToNewCell
    locationModifiers = Init.initializedLocationModifiersList()

    existingCellulesLocationModifiers = new ArrayList()
    //powyżej lista modyfikatorów położenia dających tylko komórki należące do świata

    for (let i = 0; i < locationModifiers.size(); i++) {
      newXPos = xPos + locationModifiers.get(i).modifyX
      newYPos = yPos + locationModifiers.get(i).modifyY

      if (!World.isCelluleOut(newXPos, newYPos))
        existingCellulesLocationModifiers.add(locationModifiers.get(i))
    }

//losowanie bez powtórzeń
    var i
    while (existingCellulesLocationModifiers.size() > 0 && remainingNewBacteriaMovingToNewCells > 0) {
      i = (Math.random() * existingCellulesLocationModifiers.size())
      newXPos = xPos + existingCellulesLocationModifiers.get(i).modifyX
      newYPos = yPos + existingCellulesLocationModifiers.get(i).modifyY

      if (existingCellulesLocationModifiers.size() == 1) {
        tempWorld.board[newXPos][newYPos].addBactNum(remainingNewBacteriaMovingToNewCells)
        // jeżeli jest to ostatnia komórka, do której moga się przenieść bakterie,
        // które mają się przenieść poza komórkę macierzystą, to przenoszą się do niej wszystkie
        // bakterie, które nie przeniosły się jeszcze do żadnej z sąsiadujących komórek
        remainingNewBacteriaMovingToNewCells = 0
      } else {
        newBacteriaPartMovingToNewCell = (Math.random() * remainingNewBacteriaMovingToNewCells)
        // losowo określona część nowo urodzonych bakterii, która przeniesie się do nowej komórki
        tempWorld.board[newXPos][newYPos].addBactNum(newBacteriaPartMovingToNewCell)

        remainingNewBacteriaMovingToNewCells -= newBacteriaPartMovingToNewCell
        // od pozostałych nowo urodzonych bakterii, które mają się przenieść do nowych komórek
        // odejmujemy te, które właśnie przeniosły się do nowej komórki
      }
      existingCellulesLocationModifiers.remove(i)
    }
  }

}

export default Cellule