import ArrayList  from 'arraylist'
import LocationModifier from './LocationModifier.js'

class Init {
    static SIZE_WORLD = 10;
    static NUM_TACT = 100;
    static VEW_NUM_TACT = 10;
    static START_NUM_CREEPERS = 500;
    static START_NUM_BACT = 500;
    static CREEPER_ENERGY_PRO_LIFE = 1;
    static CREEPER_INITIAL_ENERGY = 1;
    static CREEPER_ENERGY_RESERVE = 4;
    static MAX_CREEPER_NUM_BORN_PER_TACK = 5;
    static MAX_BACT_EATEN_BY_CREEPER = 15;
    static BACT_MULTIPLICATION_RATE = 0.8;
    static BACT_SPREAD_RATE = 0.2;
    static BACT_NUM_LIMIT = 1000000;


    static wartosc_creep = 0;
    static tact_start_creep = 0;
    static wartosc_creep_tacts = 1;

    static wartosc_bact = 0;
    static tact_start_bact= 0;
    static wartosc_bact_tacts = 1;

    static initializedLocationModifiersList() {
        let locationModifiers = new ArrayList();
        locationModifiers.add(new LocationModifier(-1, 0));
        locationModifiers.add(new LocationModifier(1, 0));
        locationModifiers.add(new LocationModifier(0, -1));
        locationModifiers.add(new LocationModifier(0, 1));

        locationModifiers.add(new LocationModifier(-1, -1));
        locationModifiers.add(new LocationModifier(1, 1));
        locationModifiers.add(new LocationModifier(-1, 1));
        locationModifiers.add(new LocationModifier(1, -1));

        return locationModifiers;
    }
}

export default Init