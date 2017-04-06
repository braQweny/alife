var row, col;  // globar for-loop indices

var canvas;   // canvas where the world is drawn
var graphics; // graphics context for drawing on the canvas

var cellSize = 10;  // canvas size MUST be (cellSize*rows)-by-(cellSize*cols)
var rows = 48;
var cols = 60;

var yearLength = 250;

var wall = -3, empty = -2, plant = -1, eaterFacingLeft = 0,
    eaterFacingUp = 1, eaterFacingRight = 2, eaterFacingDown = 3;  // world contents

var world;  // 2D array holding contents of the world


// --------------------------

var trunLeft = 0, turnRight = 1, forward = 2;
back = 3;  // possible eater actions
var seeWall = 0, seeEater = 1, seeSpace = 2, seePlant = 3;  // possible eater inputs
var sourceCount = 20;  // number of points from which plants grow (except when they are born at random spots)

var settings = {
    populationSize: 50,
    plantCount: 250,
    mutationProbability: 0.001,
    crossoverProbability: 0.8,
    plantBirth: 1, // in rows, in clumps, at random, along the bottom, along the edges
    plantRebirth: 0, // grows back somewhere, grows back nearby, it's gone
    eaterBirth: 2 // at center, in a corner, random spot, parent's location
};

var world = new Array(rows);
for (row = 0; row < rows; row++) {
    world[row] = new Array(cols);
}

var population;
var plantSources;
var actualPlantCount;

function newWorld() {
    var row, col;
    for (col = 0; col < cols; col++) {
        world[0][col] = world[rows - 1][col] = wall;
    }
    for (row = 1; row < rows - 1; row++) {
        world[row][0] = world[row][cols - 1] = wall;
        for (col = 1; col < cols - 1; col++) {
            world[row][col] = empty;
        }
    }
}

function Eater(r, c) {
    this.row = r;
    this.col = c;
    this.score = 1;
    this.currentState = 0;
    this.facing = Math.floor(4 * Math.random());
    this.gene = new Array(16);
    for (var i = 0; i < 16; i++) {
        this.gene[i] = new Array(4);
        for (var j = 0; j < 4; j++) {
            this.gene[i][j] = {
                "newState": Math.floor(16 * Math.random()),
                "whatToDo": Math.floor(4 * Math.random())
            };
        }
    }
}
Eater.prototype.mutate = function () {  // mutate each item in this Eater's gene with given probability
    var prob = settings.mutationProbability
    var gene = this.gene;
    for (var i = 0; i < 16; i++)
        for (var j = 0; j < 4; j++) {
            if (Math.random() < prob)
                gene[i][j].newState = Math.floor(16 * Math.random());
            if (Math.random() < prob)
                gene[i][j].whatToDo = Math.floor(4 * Math.random());
        }
};
Eater.prototype.crossWith = function (that) {  // do a crossover of this Eater with that (also an eater)
    var crossPoint = Math.floor(Math.random() * 128);
    var temp;
    var ct = 0;
    var thisgene = this.gene;
    var thatgene = that.gene;
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 4; j++) {
            if (ct > crossPoint) {
                temp = thisgene[i][j].newState;
                thisgene[i][j].newState = thatgene[i][j].newState;
                thatgene[i][j].newState = temp;
            }
            ct++;
            if (ct > crossPoint) {
                temp = thisgene[i][j].whatToDo;
                thisgene[i][j].whatToDo = thatgene[i][j].whatToDo;
                thatgene[i][j].whatToDo = temp;
            }
            ct++;
        }
    }
};
Eater.prototype.clone = function () {  // create a copy of this Eater
    var eater = new Eater(this.row, this.col);
    eater.facing = Math.floor(Math.random() * 4);
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 4; j++) {
            eater.gene[i][j].newState = this.gene[i][j].newState;
            eater.gene[i][j].whatToDo = this.gene[i][j].whatToDo;
        }
    }
    return eater;
};

function applyFitnessScoreBias(population) {
    var biasType = parseInt(fitnessBiasSelect.value);
    if (biasType == 0) {
        for (var i = 0; i < population.length; i++) {
            population[i].biasedScore = Math.sqrt(population[i].score);
        }
    }
    else if (biasType == 1) {
        for (var i = 0; i < population.length; i++) {
            population[i].biasedScore = population[i].score;
        }
    }
    else if (biasType == 2) {
        for (var i = 0; i < population.length; i++) {
            population[i].biasedScore = Math.pow(population[i].score, 2);
        }
    }
    else if (biasType == 3) {
        for (var i = 0; i < population.length; i++) {
            population[i].biasedScore = Math.pow(population[i].score, 3);
        }
    }
}

function breed() {
    var i, j, l, r, t, a, b;
    var s;
    var d;
    var neweater;
    var newCt;
    var fitness;
    var f;
    var choose = new Array()
    var usedCt;
    var highscore = 0;
    var totalScore = 0.0;
    var unbiasedHigh = 0;
    var unbiasedTotal = 0.0;
    applyFitnessScoreBias(population);
    for (i = 0; i < population.length; i++) {
        if (population[i].biasedScore > highscore)
            highscore = population[i].biasedScore;
        totalScore += population[i].biasedScore;
        if (population[i].score > unbiasedHigh)
            unbiasedHigh = population[i].score;
        unbiasedTotal += population[i].score;
    }
    var avgScore = totalScore / population.length;
    var unbiasedAvg = unbiasedTotal / population.length;
    var desiredPopulation = settings.populationSize;
    var minimumPopulation = desiredPopulation * 0.7;
    f = (1.0 / avgScore) * (desiredPopulation / population.length);
    do {
        neweater = new Array();
        for (i = 0; i < population.length; i++) {
            fitness = population[i].biasedScore * f;
            while ((fitness >= 1) && (neweater.length < 150)) {
                fitness = fitness - 1;
                neweater.push(population[i].clone());
            }
            if (Math.random() < fitness && neweater.length < 150) {
                neweater.push(population[i].clone());
            }
        }
    } while (neweater.length < minimumPopulation);
    population = neweater;
    if (settings.mutationProbability > 0) {
        for (i = 0; i < population.length; i++)
            population[i].mutate();
    }
    if (settings.crossoverProbability > 0) {
        choose = new Array(population.length);
        for (i = 0; i < population.length; i++)
            choose[i] = i;
        var usedCt = population.length;
        var stop = population.length - Math.floor(population.length * settings.crossoverProbability);
        if (stop < 1)
            stop = 1;
        while (usedCt > stop) {
            r = Math.floor(Math.random() * usedCt);
            a = choose[r];
            choose[r] = choose[usedCt - 1];
            usedCt = usedCt - 1;
            r = Math.floor(Math.random() * usedCt);
            b = choose[r];
            choose[r] = choose[usedCt - 1];
            usedCt = usedCt - 1;
            population[a].crossWith(population[b])
        }
    }
    return [unbiasedHigh, unbiasedAvg]
}


function startYear(worldIsStarting) {  // worldIsStarting is boolean; true only when world is just starting
    var i, loc;
    newWorld();
    if (worldIsStarting) {
        population = new Array(settings.populationSize);
    }
    plantSources = new Array(sourceCount);
    for (i = 0; i < plantSources.length; i++) {
        plantSources[i] = findSource();
    }
    actualPlantCount = settings.plantCount;
    for (i = 0; i < actualPlantCount; i++) {
        putNewPlant();
    }
    for (i = 0; i < population.length; i++) {
        putNewEater(i, worldIsStarting);
    }
}

function doDay() {
    for (var eaterNum = 0; eaterNum < population.length; eaterNum++) {
        var row = population[eaterNum].row;
        var col = population[eaterNum].col;
        var facing = population[eaterNum].facing;
        switch (population[eaterNum].facing) {
            case 0:
                col = col + 1;
                break;
            case 1:
                row = row - 1;
                break;
            case 2:
                col = col - 1;
                break;
            case 3:
                row = row + 1;
                break;
        }
        // [row,col] is cell in front of eater
        var b = world[row][col];
        var v;
        if (b == empty)
            v = seeSpace;
        else if (b == plant)
            v = seePlant;
        else if (b == wall)
            v = seeWall;
        else
            v = seeEater;
        var s = population[eaterNum].currentState;
        var newState = population[eaterNum].gene[s][v].newState;
        var whatToDo = population[eaterNum].gene[s][v].whatToDo;
        population[eaterNum].currentState = newState;
        var newRow = population[eaterNum].row;
        var newCol = population[eaterNum].col;
        switch (whatToDo) {
            case 0:
                facing--;
                if (facing < 0)
                    facing = 3;
                population[eaterNum].facing = facing;
                break;
            case 1:
                facing++;
                if (facing > 3)
                    facing = 0;
                population[eaterNum].facing = facing;
                break;
            case 2:
                newRow = row;  // already have the right value for moving forward, from above
                newCol = col;
                if (world[newRow][newCol] != plant && world[newRow][newCol] != empty)
                    continue;
                break;
            case 3:
                col = population[eaterNum].col;
                row = population[eaterNum].row;
                switch (population[eaterNum].facing) {
                    case 0:
                        col = col - 1;
                        break;
                    case 1:
                        row = row + 1;
                        break;
                    case 2:
                        col = col + 1;
                        break;
                    case 3:
                        row = row - 1;
                        break;
                }
                newRow = row;
                newCol = col;
                if (world[newRow][newCol] != plant && world[newRow][newCol] != empty)
                    continue;
                break;
        }
        var plantEaten = world[newRow][newCol] == plant;
        world[population[eaterNum].row][population[eaterNum].col] = empty;
        world[newRow][newCol] = population[eaterNum].facing;
        population[eaterNum].row = newRow;
        population[eaterNum].col = newCol;
        if (plantEaten) {
            population[eaterNum].score++;
            var birthplace_item = settings.plantRebirth;
            if (birthplace_item == 0)
                putNewPlant();  // grows back somewhere
            else if (birthplace_item == 1) {
                var loc = findSpaceNear(newRow, newCol);
                world[loc[0]][loc[1]] = plant;  // grows back nearby
            }
        }
    }
}


function findSpace() {
    var row, col;
    do {
        row = Math.floor(Math.random() * (rows - 2)) + 1;
        col = Math.floor(Math.random() * (cols - 2)) + 1;
    } while (world[row][col] != empty);
    return [row, col];
}

function findSource() {
    var n, row, col;
    var plants_item = settings.plantBirth;
    if (plants_item < 4) {
        do {
            row = Math.floor(Math.random() * (rows - 2)) + 1;
            col = Math.floor(Math.random() * (cols - 2)) + 1;
        } while (world[row][col] != empty);
    }
    else {
        do {
            if (Math.random() > cols / (cols + rows)) { // source along left or right edge
                row = Math.floor(Math.random() * (rows - 2)) + 1;
                col = (Math.random() > 0.5) ? 1 : cols - 2;
            }
            else { // source along top or bottom
                col = Math.floor(Math.random() * (cols - 2)) + 1;
                row = (Math.random() > 0.5) ? 1 : rows - 2;
            }
        } while (world[row][col] != empty);
    }
    return [row, col];
}

function findSpaceNear(row, col) {
    var r, c, dx, dy, ct;
    ct = 0;
    while (ct < 30) {  // move away from [row,col] in a random walk to find an empty space
        if (world[row][col] == empty)
            return [row, col];
        else {
            ct = ct + 1;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    if (row > 2)
                        row = row - 1;
                    break;
                case 1:
                    if (row < rows - 2)
                        row = row + 1;
                    break;
                case 2:
                    if (col > 2)
                        col = col - 1;
                    break;
                default:
                    if (col < cols - 2)
                        col = col + 1;
            }
        }
    }
    // random walk failed
    r = row;
    c = col;
    while (world[r][c] != empty) {  // move in straight line from [row,col] in a random direction to find a space
        do {
            dx = Math.floor(Math.random() * 3) - 1;
            dy = Math.floor(Math.random() * 3) - 1;
        } while ((dx == 0) && (dy == 0));
        while ((world[r][c] != empty) && (world[r][c] != wall)) {
            r = r + dx;
            c = c + dy;
        }
        if (world[r][c] == wall) {  // if hit a wall before a space, try another direction
            r = row;
            c = col;
        }
    }
    return [r, c];
}

function putNewPlant() {
    var row, col, n, d;
    var location;
    switch (settings.plantBirth) {
        case 0: {
            do {
                n = Math.floor(Math.random() * plantSources.length);
                if (Math.random() < 0.5)
                    d = 1;
                else
                    d = -1;
                row = plantSources[n][0];
                col = plantSources[n][1];
                while (world[row][col] != empty && world[row][col] != wall)
                    col = col + d;
                if (world[row][col] != empty) {
                    d = -d;
                    col = plantSources[n][1];
                    while (world[row][col] != empty && world[row][col] != wall)
                        col = col + d;
                }
            } while (world[row][col] != empty);
            location = [row, col];
            if (Math.random() > 0.95)
                plantSources[n] = findSource();
            break;
        }
        case 1:
        case 4: {
            n = Math.floor(Math.random() * plantSources.length);
            row = plantSources[n][0];
            col = plantSources[n][1];
            location = findSpaceNear(row, col);
            if (Math.random() > 0.95)
                plantSources[n] = findSource();
            break;
        }
        case 2: {
            location = findSpace();
            break;
        }
        default: {
            col = Math.floor(Math.random() * (cols - 2)) + 1;
            row = rows - 2;
            location = findSpaceNear(row, col);
        }
    }
    world[location[0]][location[1]] = plant;
}


function putNewEater(index, brandNew) { // index = location in eater array
    var row, col;
    var location;
    switch (settings.eaterBirth) {
        case 0: {
            row = rows / 2 + (Math.floor(Math.random() * 12) - 7);
            col = cols / 2 + (Math.floor(Math.random() * 12) - 7);
            location = findSpaceNear(row, col);
            break;
        }
        case 1: {
            row = Math.floor(Math.random() * 12) + 1;
            col = Math.floor(Math.random() * 12) + 1;
            location = findSpaceNear(row, col);
            break;
        }
        case 2: {
            location = findSpace();
            break;
        }
        default: {
            if (brandNew)
                location = findSpace();
            else {
                row = population[index].row;
                col = population[index].col;
                location = findSpaceNear(row, col);
            }
        }
    }
    if (brandNew)
        population[index] = new Eater(location[0], location[1]);
    else {
        population[index].row = location[0];
        population[index].col = location[1];
        population[index].facing = Math.floor(Math.random() * 4);
    }
    world[location[0]][location[1]] = population[index].facing;
}


// --------------------------

function drawWorld() {
    graphics.fillStyle = "#FFFFFF";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var content = world[row][col];
            if (content == wall) {
                graphics.fillStyle = "#666666";
                graphics.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
            else if (content == plant) {
                graphics.fillStyle = "#00CC00";
                graphics.fillRect(col * cellSize + 2, row * cellSize + 2, cellSize - 4, cellSize - 4);
            }
            else if (content >= 0) {
                // Note: strokeStyle is always red.
                var left, right, top, bottom;
                var h, v;
                left = col * cellSize + 1;
                top = row * cellSize + 1;
                right = left + cellSize - 2;
                bottom = top + cellSize - 2;
                h = (left + right) / 2;
                v = (top + bottom) / 2;
                graphics.beginPath();
                switch (content) {
                    case 0:
                        graphics.moveTo(left, top);
                        graphics.lineTo(left, bottom - 1);
                        graphics.moveTo(left, v);
                        graphics.lineTo(right - 1, v);
                        break;
                    case 1:
                        graphics.moveTo(left, bottom - 1);
                        graphics.lineTo(right - 1, bottom - 1);
                        graphics.moveTo(h, top);
                        graphics.lineTo(h, bottom - 1);
                        break;
                    case 2:
                        graphics.moveTo(right - 1, top);
                        graphics.lineTo(right - 1, bottom - 1);
                        graphics.moveTo(left, v);
                        graphics.lineTo(right - 1, v);
                        break;
                    case 3:
                        graphics.moveTo(left, top);
                        graphics.lineTo(right - 1, top);
                        graphics.moveTo(h, top);
                        graphics.lineTo(h, bottom - 1);
                        break;
                }
                graphics.stroke();
            }
        }
    }
}

var stepButton, runButton, runToSeasonButton, pauseButton, restartButton;
var speedSelect;
var eaterBirthSelect, populationSelect, plantCountSelect, plantBirthSelect, plantReplacementSelect,
    mutationProbabilitySelect, crossoverProbabilitySelect, fitnessBiasSelect;
var delayTime;

var worldNum = 0, yearNum, dayNum;
var bestAverage;
var statslog;
var hundredYearData = new Array(100);

var running = false;
var pauseAtEndOfYear = true;
var timeout = null;

function pad(str, width) {
    while (str.length < width)
        str = " " + str;
    return str;
}

function report(year, highscore, average) {
    average = Math.round(1000 * average) / 1000.0;
    if (year <= 100)
        hundredYearData[year - 1] = average;
    else {
        hundredYearData.shift();
        hundredYearData.push(average);
    }
    document.getElementById("stats").innerHTML = "Stats for year " + year + ".&nbsp; High Score: "
        + highscore + ", Average Score: " + average;
    if (year == 1)
        document.getElementById("statsheader").innerHTML = "  YEAR    HIGH SCORE  AVERAGE SCORE     100-YEAR AVERAGE";
    var newbest = false;
    if (average > bestAverage) {
        newbest = true;
        bestAverage = average;
    }
    else if (year > 1000) {
        if (year % 100 != 0)
            return;
    }
    else if (year > 10) {
        if (year % 10 != 0)
            return;
    }
    var item = "";
    item += pad(year.toString(), 6);
    item += pad(highscore.toString(), 13);
    item += pad(average.toString(), 15);
    item += (newbest ? "*" : " ");
    if (year >= 100) {
        var total = 0;
        for (var i = 0; i < hundredYearData.length; i++)
            total += hundredYearData[i];
        var hya = total / hundredYearData.length;
        hya = Math.round(1000 * hya) / 1000.0;
        item += pad(hya.toString(), 20);
        if (hundredYearData.length != 100)
            alert(hundredYearData.length);
    }
    item += "<\/p>";
    var p = document.createElement("p");
    p.innerHTML = item;
    statslog.insertBefore(p, statslog.firstChild);
}

function year() {
    do {
        step();
    } while (dayNum > 0);
    if (!pauseAtEndOfYear) {
        document.getElementById("message").innerHTML = "Year " + yearNum;
        timeout = setTimeout(year, 20);
    }
}

function run() {
    running = true;
    pauseAtEndOfYear = false;
    runButton.disabled = true;
    runToSeasonButton.disabled = true;
    stepButton.disabled = true;
    pauseButton.disabled = false;
    if (delayTime > 0)
        timeout = setTimeout(step, delayTime);
    else {
        graphics.fillStyle = "#FFFFFF";
        graphics.fillRect(cellSize, cellSize, canvas.width - 2 * cellSize, canvas.height - 2 * cellSize);
        year();
    }
}

function pause() {
    if (timeout)
        clearTimeout(timeout);
    running = false;
    runButton.disabled = false;
    runToSeasonButton.disabled = false;
    stepButton.disabled = false;
    pauseButton.disabled = true;
    drawWorld();
}

function runToEndOfYear() {
    running = true;
    pauseAtEndOfYear = true;
    runButton.disabled = true;
    runToSeasonButton.disabled = true;
    stepButton.disabled = true;
    pauseButton.disabled = false;
    if (delayTime > 0)
        timeout = setTimeout(step, delayTime);
    else
        year();
}

function step() {
    if (dayNum == yearLength) {
        var stats = breed();
        report(yearNum, stats[0], stats[1]);
        startYear(false);
        yearNum++;
        dayNum = 0;
        if (running && pauseAtEndOfYear)
            pause();
    }
    else {
        dayNum++;
        doDay();
    }
    if (!running || delayTime > 0) {
        drawWorld();
        if (dayNum == 0)
            document.getElementById("message").innerHTML = "Year " + yearNum + ": Ready to start";
        else
            document.getElementById("message").innerHTML = "Year " + yearNum + ".&nbsp; Day " + dayNum;
    }
    if (running && delayTime > 0)
        timeout = setTimeout(step, delayTime);
}

function startFromScratch() {
    pause();
    startYear(true);
    drawWorld();
    worldNum++;
    yearNum = 1;
    dayNum = 0;
    document.getElementById("message").innerHTML = "Starting with World No. " + worldNum +
        "!&nbsp;  Click Run or Step, or change World Design.";
    bestAverage = 0.0;
    statslog.innerHTML = "";
    document.getElementById("statsheader").innerHTML = "&nbsp;";
    document.getElementById("stats").innerHTML = "&nbsp;";
}

function changeSetting(name, value) {
    if (settings[name] == value)
        return;
    settings[name] = value;
    if (name == "plantBirth" || name == "populationSize" || name == "plantCount" ||
        (name == "eaterBirth" && value < 3)) {  // need to redraw if at start of world
        if (dayNum == 0 && yearNum == 1 && !running) {
            startYear(true);
            drawWorld();
        }
    }
}

function changeSpeed() {
    var newDelay = 10;
    switch (speedSelect.value) {
        case "0":
            newDelay = 0;
            break;
        case "2":
            newDelay = 250;
            break;
        case "3":
            newDelay = 1000;
            break;
    }
    if (newDelay == delayTime)
        return;
    delayTime = newDelay;
    if (!running)
        return;
    if (timeout)
        clearTimeout(timeout);
    if (pauseAtEndOfYear)
        runToEndOfYear();
    else
        run();
}

function init() {
    canvas = document.getElementById("gacanvas");
    if (!canvas || !canvas.getContext) {
        // This browser apparently does not support canvasses since the canvas
        // element has no getContext function.  Give up!
        document.getElementById("message").innerHTML = "Sorry, your browser doesn't support the canvas element!<br>"
            + "This page should work with most modern web browsers";
        return;
    }
    graphics = canvas.getContext("2d");
    graphics.strokeStyle = "#FF0000";
    statslog = document.getElementById("statslog");
    stepButton = document.getElementById("stepButton");
    runButton = document.getElementById("runButton");
    runToSeasonButton = document.getElementById("runToSeasonButton");
    pauseButton = document.getElementById("pauseButton");
    restartButton = document.getElementById("restartButton");
    stepButton.onclick = step;
    restartButton.onclick = startFromScratch;
    runButton.onclick = run;
    runToSeasonButton.onclick = runToEndOfYear;
    pauseButton.onclick = pause;
    speedSelect = document.getElementById("speedSelect");
    speedSelect.value = "1";
    delayTime = 10;
    eaterBirthSelect = document.getElementById("eaterBirthSelect");
    eaterBirthSelect.value = "2";
    populationSelect = document.getElementById("populationSelect");
    populationSelect.value = "50";
    plantCountSelect = document.getElementById("plantCountSelect");
    plantCountSelect.value = "250";
    plantBirthSelect = document.getElementById("plantBirthSelect");
    plantBirthSelect.value = "1";
    plantReplacementSelect = document.getElementById("plantReplacementSelect");
    plantReplacementSelect.value = "0";
    mutationProbabilitySelect = document.getElementById("mutationProbabilitySelect");
    mutationProbabilitySelect.value = "0.001";
    crossoverProbabilitySelect = document.getElementById("crossoverProbabilitySelect");
    crossoverProbabilitySelect.value = "0.8";
    fitnessBiasSelect = document.getElementById("fitnessBiasSelect");
    fitnessBiasSelect.value = "1";
    speedSelect.onchange = changeSpeed;
    eaterBirthSelect.onchange = function () {
        changeSetting("eaterBirth", parseInt(eaterBirthSelect.value))
    };
    populationSelect.onchange = function () {
        changeSetting("populationSize", parseInt(populationSelect.value))
    };
    plantCountSelect.onchange = function () {
        changeSetting("plantCount", parseInt(plantCountSelect.value))
    };
    plantBirthSelect.onchange = function () {
        changeSetting("plantBirth", parseInt(plantBirthSelect.value))
    };
    plantReplacementSelect.onchange = function () {
        changeSetting("plantRebirth", parseInt(plantReplacementSelect.value))
    };
    mutationProbabilitySelect.onchange = function () {
        changeSetting("mutationProbability", parseFloat(mutationProbabilitySelect.value))
    };
    crossoverProbabilitySelect.onchange = function () {
        changeSetting("crossoverProbability", parseFloat(crossoverProbabilitySelect.value))
    };
    startFromScratch();
};