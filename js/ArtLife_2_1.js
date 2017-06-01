import ArrayList  from 'arraylist'
import Init  from './Init'
import World  from './World'

class ArtLife_2_1 {
    static totallyCreepers = new ArrayList();
    static totallyBacteria = new ArrayList();

    static bacteriaTest(w) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                console.log("%d", w.board[i][j].getBactNum());
            }
            console.log("\n");
        }
    }

    static creepersTest(w) {

        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++)
                console.log("%d", w.board[i][j].getCreepersNum());
            console.log("\n");
        }
    }

    static mainTest(w) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                console.log(w.board[i][j].getBactNum() + "|" +
                    w.board[i][j].getCreepersNum());
            }
            console.log("\n");
        }
    }

    static totalNum(w, what) {
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

    static addNewBornOrganismsToMainWorldCellules(mainWorld, tempWorld) {
        for (let i = 0; i < Init.SIZE_WORLD; i++) {
            for (let j = 0; j < Init.SIZE_WORLD; j++) {
                mainWorld.board[i][j].addBactNum(tempWorld.board[i][j].getBactNum());
                mainWorld.board[i][j].creepers.add(tempWorld.board[i][j].creepers);
            }
        }
    }

    static main() {
        let mainWorld;
        let tempWorld;
        mainWorld = new World();
        let arr = [];

        mainWorld.sowBacteries(Init.START_NUM_BACT);
        mainWorld.sowCreepers(Init.START_NUM_CREEPERS);
        let numTact = 0, num, totalBactNum;
        arr.push({
            tactNum: numTact,
            bactNum: this.totalNum(mainWorld, "BACTERIA"),
            creeperNum: this.totalNum(mainWorld, "CREEPERS")
        });
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
                totalBactNum = this.totalNum(mainWorld, "BACTERIA");
                this.totallyBacteria.add(totalBactNum);

                if (totalBactNum > Init.BACT_NUM_LIMIT) {
                    prematureEndOfSimulation = true;
                }

                num++;
                numTact++;
                arr.push({
                    tactNum: numTact,
                    bactNum: this.totalNum(mainWorld, "BACTERIA"),
                    creeperNum: this.totalNum(mainWorld, "CREEPERS")
                });


            }
            console.log("Przebieg " + numTact);
            this.mainTest(mainWorld);

        }

        console.log("\n");
        console.log("---------------------------------------");
        console.log("Bacteries");
        for (let i = 0; i < this.totallyCreepers.size(); i++) {
            console.log("%d", this.totallyBacteria.get(i));
            console.log("\n");
        }
        console.log("Creepers");
        for (let i = 0; i < this.totallyCreepers.size(); i++) {
            console.log("%d", this.totallyCreepers.get(i));
            console.log("\n");
        }
        if (prematureEndOfSimulation) {
            console.log("Sumaryczna liczba bakterii przekroczyła " + Init.BACT_NUM_LIMIT
                + " - komórki umierają/koniec symulacji.");
        }

        console.log("\n");

        return arr;
    }
}

export default ArtLife_2_1