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

    static initializedLocationModifiersList() {
        let locationModifiers = new ArrayList();
        locationModifiers.add(new LocationModifier(-1, 0));
        locationModifiers.add(new LocationModifier(1, 0));
        locationModifiers.add(new LocationModifier(0, -1));
        locationModifiers.add(new LocationModifier(0, 1));

        // locationModifiers.add(new LocationModifier(-1, -1));
        // locationModifiers.add(new LocationModifier(1, 1));
        // locationModifiers.add(new LocationModifier(-1, 1));
        // locationModifiers.add(new LocationModifier(1, -1));

        return locationModifiers;
    }

    static get_SIZE_WORLD() {
        return this.SIZE_WORLD;
    }

    static get_NUM_TACT() {
        return this.NUM_TACT;
    }

    static get_VEW_NUM_TACT() {
        return this.VEW_NUM_TACT;
    }

    static get_START_NUM_CREEPERS() {
        return this.START_NUM_CREEPERS;
    }

    static get_START_NUM_BACT() {
        return this.START_NUM_BACT;
    }

    static get_CREEPER_ENERGY_PRO_LIFE() {
        return this.CREEPER_ENERGY_PRO_LIFE;
    }


    static get_CREEPER_INITIAL_ENERGY() {
        return this.CREEPER_INITIAL_ENERGY;
    }


    static get_CREEPER_ENERGY_RESERVE() {
        return this.CREEPER_ENERGY_RESERVE;
    }


    static get_MAX_CREEPER_NUM_BORN_PER_TACK() {
        return this.MAX_CREEPER_NUM_BORN_PER_TACK;
    }

    static get_MAX_BACT_EATEN_BY_CREEPER() {
        return this.MAX_BACT_EATEN_BY_CREEPER;
    }


    static get_BACT_MULTIPLICATION_RATE() {
        return this.BACT_MULTIPLICATION_RATE;
    }

    static get_BACT_SPREAD_RATE() {
        return this.BACT_SPREAD_RATE;
    }

    static get_CREEPER_ENERGY_RESERVE() {
        return this.CREEPER_ENERGY_RESERVE;
    }

    static get_BACT_NUM_LIMIT() {
        return this.BACT_NUM_LIMIT;
    }


}


export default Init