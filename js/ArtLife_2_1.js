import ArrayList  from 'arraylist'
import Init  from './Init'
import World  from './World'

class ArtLife_2_1 {
    totallyCreepers = new ArrayList();
    totallyBacteria = new ArrayList();


    bacteriaTest(w) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                console.log("%4d", w.board[i][j].getBactNum());
            }
            console.log("\n");
        }
    }

    creepersTest(w) {

        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++)
                console.log("%4d", w.board[i][j].getCreepersNum());
            console.log("\n");
        }
    }

    mainTest(w) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                console.log("%8d|%-8d", w.board[i][j].getBactNum(),
                    w.board[i][j].getCreepersNum());
            }
            console.log("\n");
        }
    }

    totalNum(w, what) {
        let sum = 0;
        for (let i = 0; i < Init.SIZE_WORLD; i++)
            for (let j = 0; j < Init.SIZE_WORLD; j++)
                switch (what) {
                    case "BACTERIA":
                        sum += w.board[i][j].getBactNum();
                        break;
                    case "CREEPERS":
                        sum += w.board[i][j].getCreepersNum();
                }
        return sum;
    }

    addNewBornOrganismsToMainWorldCellules(mainWorld, tempWorld) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                mainWorld.board[i][j].addBactNum(tempWorld.board[i][j].getBactNum());
                mainWorld.board[i][j].creepers.addAll(tempWorld.board[i][j].creepers);
            }
        }
    }


    main(args) {
        let mainWorld = new World();
        let tempWorld;

        mainWorld.sowBacteries(Init.START_NUM_BACT);
        mainWorld.sowCreepers(Init.START_NUM_CREEPERS);
        let numTact = 0, num, totalBactNum;

        console.log("Stan początkowy");
        this.mainTest(mainWorld);

        this.totallyCreepers.add(this.totalNum(mainWorld, "CREEPERS"));
        this.totallyBacteria.add(this.totalNum(mainWorld, "BACTERIA"));

        let prematureEndOfSimulation = false;
        while (numTact < Init.NUM_TACT && !prematureEndOfSimulation) {
            num = 0;
            while (num < Init.VEW_NUM_TACT && !prematureEndOfSimulation) {
                tempWorld = new World();
                mainWorld.creepersAndBacteriaAction(mainWorld, tempWorld);
                this.addNewBornOrganismsToMainWorldCellules(mainWorld, tempWorld);
                this.totallyCreepers.add(this.totalNum(mainWorld, "CREEPERS"));
                this.totalBactNum = totalNum(mainWorld, "BACTERIA");
                this.totallyBacteria.add(totalBactNum);

                if (totalBactNum > Init.BACT_NUM_LIMIT) prematureEndOfSimulation = true;

                num++;
                numTact++;
            }
            console.log("Przebieg " + numTact);
            mainTest(mainWorld);
        }

        console.log("\n");
        console.log("---------------------------------------");
        console.log("Bacteries");
        for (let i = 0; i < totallyCreepers.size(); i++) {
            console.log("%8d%n", totallyBacteria.get(i));
        }
        console.log("Creepers");
        for (let i = 0; i < totallyCreepers.size(); i++) {
            console.log("%8d%n", totallyCreepers.get(i));
        }
        if (prematureEndOfSimulation) {
            console.log("Sumaryczna liczba bakterii przekroczyła " + Init.BACT_NUM_LIMIT
                + " - komórki umierają/koniec symulacji.");
        }

        console.log("\n");
    }
}

export default ArtLife_2_1