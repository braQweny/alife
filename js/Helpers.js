import  Init  from './Init'

class Helpers extends Init {

    static get SIZE_WORLD() {
        return super.SIZE_WORLD
    }

    static get NUM_TACT() {
        return super.NUM_TACT
    }

    static get VEW_NUM_TACT() {
        return super.VEW_NUM_TACT
    }

    static get START_NUM_CREEPERS() {
        return super.START_NUM_CREEPERS
    }

    static get START_NUM_BACT() {
        return super.START_NUM_BACT
    }

    static get CREEPER_ENERGY_PRO_LIFE() {
        return super.CREEPER_ENERGY_PRO_LIFE
    }

    static get CREEPER_INITIAL_ENERGY() {
        return super.CREEPER_INITIAL_ENERGY
    }

    static get CREEPER_ENERGY_RESERVE() {
        return super.CREEPER_ENERGY_RESERVE
    }

    static get MAX_CREEPER_NUM_BORN_PER_TACK() {
        return super.MAX_CREEPER_NUM_BORN_PER_TACK
    }

    static get MAX_BACT_EATEN_BY_CREEPER() {
        return super.MAX_BACT_EATEN_BY_CREEPER
    }

    static get BACT_MULTIPLICATION_RATE() {
        return super.BACT_MULTIPLICATION_RATE
    }

    static get BACT_SPREAD_RATE() {
        return super.BACT_SPREAD_RATE
    }

    static get BACT_NUM_LIMIT() {
        return super.BACT_NUM_LIMIT
    }

    static set SIZE_WORLD(value) {
        super.SIZE_WORLD = Number(value)
    }

    static set NUM_TACT(value) {
        super.NUM_TACT = Number(value)
    }

    static set VEW_NUM_TACT(value) {
        super.VEW_NUM_TACT = Number(value)
    }

    static set START_NUM_CREEPERS(value) {
        super.START_NUM_CREEPERS = Number(value)
    }

    static set START_NUM_BACT(value) {
        super.START_NUM_BACT = Number(value)
    }

    static set CREEPER_ENERGY_PRO_LIFE(value) {
        super.CREEPER_ENERGY_PRO_LIFE = Number(value)
    }

    static set CREEPER_INITIAL_ENERGY(value) {
        super.CREEPER_INITIAL_ENERGY = Number(value)
    }

    static set CREEPER_ENERGY_RESERVE(value) {
        super.CREEPER_ENERGY_RESERVE = Number(value)
    }

    static set MAX_CREEPER_NUM_BORN_PER_TACK(value) {
        super.MAX_CREEPER_NUM_BORN_PER_TACK = Number(value)
    }

    static set MAX_BACT_EATEN_BY_CREEPER(value) {
        super.MAX_BACT_EATEN_BY_CREEPER = Number(value)
    }

    static set BACT_MULTIPLICATION_RATE(value) {
        super.BACT_MULTIPLICATION_RATE = Number(value)
    }

    static set BACT_SPREAD_RATE(value) {
        super.BACT_SPREAD_RATE = Number(value)
    }

    static set BACT_NUM_LIMIT(value) {
        super.BACT_NUM_LIMIT = Number(value)
    }


    static get wartosc_creep() {
        return super.wartosc_creep
    }

    static set wartosc_creep(value) {
        super.wartosc_creep = Number(value)
    }

    static get wartosc_bact() {
        return super.wartosc_bact
    }

    static set wartosc_bact(value) {
        super.wartosc_bact = Number(value)
    }


    static get tact_start_creep() {
        return super.tact_start_creep
    }

    static set tact_start_creep(value) {
        super.tact_start_creep = Number(value)
    }

    static get tact_start_bact() {
        return super.tact_start_bact
    }

    static set tact_start_bact(value) {
        super.tact_start_bact = Number(value)
    }

    static get wartosc_creep_tacts() {
        return super.wartosc_creep_tacts
    }

    static set wartosc_creep_tacts(value) {
        super.wartosc_creep_tacts = Number(value)
    }

    static get wartosc_bact_tacts() {
        return super.wartosc_bact_tacts
    }

    static set wartosc_bact_tacts(value) {
        super.wartosc_bact_tacts = Number(value)
    }


    static updateValue() {
        let panel = document.getElementById('panel');

        let SIZE_WORLD = panel.querySelector('input[name=SIZE_WORLD]');
        let NUM_TACT = panel.querySelector('input[name=NUM_TACT]');
        let VEW_NUM_TACT = panel.querySelector('input[name=VEW_NUM_TACT]');
        let START_NUM_CREEPERS = panel.querySelector('input[name=START_NUM_CREEPERS]');
        let START_NUM_BACT = panel.querySelector('input[name=START_NUM_BACT]');

        let CREEPER_ENERGY_PRO_LIFE = panel.querySelector('input[name=CREEPER_ENERGY_PRO_LIFE]');
        let CREEPER_INITIAL_ENERGY = panel.querySelector('input[name=CREEPER_INITIAL_ENERGY]');
        let CREEPER_ENERGY_RESERVE = panel.querySelector('input[name=CREEPER_ENERGY_RESERVE]');

        let MAX_CREEPER_NUM_BORN_PER_TACK = panel.querySelector('input[name=MAX_CREEPER_NUM_BORN_PER_TACK]');
        let MAX_BACT_EATEN_BY_CREEPER = panel.querySelector('input[name=MAX_BACT_EATEN_BY_CREEPER]');

        let BACT_MULTIPLICATION_RATE = panel.querySelector('input[name=BACT_MULTIPLICATION_RATE]');
        let BACT_SPREAD_RATE = panel.querySelector('input[name=BACT_SPREAD_RATE]');
        let BACT_NUM_LIMIT = panel.querySelector('input[name=BACT_NUM_LIMIT]');


        let wartosc_bact = panel.querySelector('input[name=wartosc_bact]');
        let tact_start_bact = panel.querySelector('input[name=tact_start_bact]');
        let wartosc_bact_tacts = panel.querySelector('input[name=wartosc_bact_tacts]');


        let wartosc_creep = panel.querySelector('input[name=wartosc_creep]');
        let tact_start_creep = panel.querySelector('input[name=tact_start_creep]');
        let wartosc_creep_tacts = panel.querySelector('input[name=wartosc_creep_tacts]');

        Helpers.SIZE_WORLD = SIZE_WORLD.value;
        Helpers.NUM_TACT = NUM_TACT.value;
        Helpers.VEW_NUM_TACT = VEW_NUM_TACT.value;
        Helpers.START_NUM_CREEPERS = START_NUM_CREEPERS.value;

        Helpers.START_NUM_BACT = START_NUM_BACT.value;

        Helpers.CREEPER_ENERGY_PRO_LIFE = CREEPER_ENERGY_PRO_LIFE.value;
        Helpers.CREEPER_INITIAL_ENERGY = CREEPER_INITIAL_ENERGY.value;
        Helpers.CREEPER_ENERGY_RESERVE = CREEPER_ENERGY_RESERVE.value;

        Helpers.MAX_CREEPER_NUM_BORN_PER_TACK = MAX_CREEPER_NUM_BORN_PER_TACK.value;
        Helpers.MAX_BACT_EATEN_BY_CREEPER = MAX_BACT_EATEN_BY_CREEPER.value;

        Helpers.BACT_MULTIPLICATION_RATE = BACT_MULTIPLICATION_RATE.value;
        Helpers.BACT_SPREAD_RATE = BACT_SPREAD_RATE.value;
        Helpers.BACT_NUM_LIMIT = BACT_NUM_LIMIT.value;

        Helpers.wartosc_creep = Number(wartosc_creep.value);
        Helpers.tact_start_creep = tact_start_creep.value;
        Helpers.wartosc_creep_tacts = wartosc_creep_tacts.value;

        Helpers.wartosc_bact = wartosc_bact.value;
        Helpers.tact_start_bact = tact_start_bact.value;
        Helpers.wartosc_bact_tacts = wartosc_bact_tacts.value;

    }

    static setValue() {
        let panel = document.getElementById('panel');

        let SIZE_WORLD = panel.querySelector('input[name=SIZE_WORLD]');
        let NUM_TACT = panel.querySelector('input[name=NUM_TACT]');
        let VEW_NUM_TACT = panel.querySelector('input[name=VEW_NUM_TACT]');
        let START_NUM_CREEPERS = panel.querySelector('input[name=START_NUM_CREEPERS]');
        let START_NUM_BACT = panel.querySelector('input[name=START_NUM_BACT]');

        let CREEPER_ENERGY_PRO_LIFE = panel.querySelector('input[name=CREEPER_ENERGY_PRO_LIFE]');
        let CREEPER_INITIAL_ENERGY = panel.querySelector('input[name=CREEPER_INITIAL_ENERGY]');
        let CREEPER_ENERGY_RESERVE = panel.querySelector('input[name=CREEPER_ENERGY_RESERVE]');

        let MAX_CREEPER_NUM_BORN_PER_TACK = panel.querySelector('input[name=MAX_CREEPER_NUM_BORN_PER_TACK]');
        let MAX_BACT_EATEN_BY_CREEPER = panel.querySelector('input[name=MAX_BACT_EATEN_BY_CREEPER]');

        let BACT_MULTIPLICATION_RATE = panel.querySelector('input[name=BACT_MULTIPLICATION_RATE]');
        let BACT_SPREAD_RATE = panel.querySelector('input[name=BACT_SPREAD_RATE]');
        let BACT_NUM_LIMIT = panel.querySelector('input[name=BACT_NUM_LIMIT]');

        let wartosc_bact = panel.querySelector('input[name=wartosc_bact]');
        let tact_start_bact = panel.querySelector('input[name=tact_start_bact]');
        let wartosc_bact_tacts = panel.querySelector('input[name=wartosc_bact_tacts]');


        let wartosc_creep = panel.querySelector('input[name=wartosc_creep]');
        let tact_start_creep = panel.querySelector('input[name=tact_start_creep]');
        let wartosc_creep_tacts = panel.querySelector('input[name=wartosc_creep_tacts]');

        SIZE_WORLD.value = Helpers.SIZE_WORLD;
        NUM_TACT.value = Helpers.NUM_TACT;
        VEW_NUM_TACT.value = Helpers.VEW_NUM_TACT;
        START_NUM_CREEPERS.value = Helpers.START_NUM_CREEPERS;

        START_NUM_BACT.value = Helpers.START_NUM_BACT;

        CREEPER_ENERGY_PRO_LIFE.value = Helpers.CREEPER_ENERGY_PRO_LIFE;
        CREEPER_INITIAL_ENERGY.value = Helpers.CREEPER_INITIAL_ENERGY;
        CREEPER_ENERGY_RESERVE.value = Helpers.CREEPER_ENERGY_RESERVE;

        MAX_CREEPER_NUM_BORN_PER_TACK.value = Helpers.MAX_CREEPER_NUM_BORN_PER_TACK;
        MAX_BACT_EATEN_BY_CREEPER.value = Helpers.MAX_BACT_EATEN_BY_CREEPER;

        BACT_MULTIPLICATION_RATE.value = Helpers.BACT_MULTIPLICATION_RATE;
        BACT_SPREAD_RATE.value = Helpers.BACT_SPREAD_RATE;
        BACT_NUM_LIMIT.value = Helpers.BACT_NUM_LIMIT;

        wartosc_creep.value = Helpers.wartosc_creep;
        tact_start_creep.value = Helpers.tact_start_creep;
        wartosc_creep_tacts.value = Helpers.wartosc_creep_tacts;

        wartosc_bact.value = Helpers.wartosc_bact;
        tact_start_bact.value = Helpers.tact_start_bact;
        wartosc_bact_tacts.value = Helpers.wartosc_bact_tacts

    }

}

export default Helpers