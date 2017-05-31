import ArrayList  from 'arraylist'
import LocationModifier from './LocationModifier.js'
import Cellule from './Cellule.js'

function defineConst(obj, constName, value) {
    Object.defineProperty(obj, constName, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: true
    })
}

const Init = {
    SIZE_WORLD: 10,
    NUM_TACT: 100,
    VEW_NUM_TACT: 10,
    START_NUM_CREEPERS: 500,
    START_NUM_BACT: 500,
    CREEPER_ENERGY_PRO_LIFE: 1,
    CREEPER_INITIAL_ENERGY: 1,
    CREEPER_ENERGY_RESERVE: 4,
    MAX_CREEPER_NUM_BORN_PER_TACK: 5,
    MAX_BACT_EATEN_BY_CREEPER: 15,
    BACT_MULTIPLICATION_RATE: 0.8,
    BACT_SPREAD_RATE: 0.5,
    BACT_NUM_LIMIT: 1000000,

    initializedLocationModifiersList: function () {
        let locationModifiers = new ArrayList();
        locationModifiers.add([new LocationModifier(-1, 0), new LocationModifier(1, 0), new LocationModifier(0, -1), new LocationModifier(0, 1)]);
        // locationModifiers.add([new LocationModifier(1, 0)]);
        // locationModifiers.add([new LocationModifier(0, -1)]);
        // locationModifiers.add([new LocationModifier(0, 1)]);
        return locationModifiers;
    }
};


export default Init