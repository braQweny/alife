import ArtLife_2_1  from './ArtLife_2_1';
require('chartist/dist/chartist.css');
import  Chartist  from 'chartist';
import  Init  from './Init';

let arr = ArtLife_2_1.main();
console.dir(arr);

let num = arr.map((tactObject) => {
    return tactObject.tactNum;
});
let creep = arr.map((tactObject) => {
    return tactObject.creeperNum;
});

let back = arr.map((tactObject) => {
    return tactObject.bactNum;
});

var googleArr = arr.map((tactObject) => {
    return [tactObject.creeperNum, tactObject.bactNum];
});
googleArr.unshift(['creeperNum', 'bactNum']);
console.dir(googleArr);
draw1();
draw2();


function draw1() {
    new Chartist.Line('.ct-chart-1', {
        labels: num,
        series: [
            creep,
            back
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });

}

function draw2() {
    google.charts.load("current", {packages: ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable
        (googleArr);

        var options = {
            legend: 'none',
            colors: ['#15A0C8'],

        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }


}
let up = document.getElementById('up');


up.addEventListener('click', () => {
    arr = ArtLife_2_1.main();
    googleArr = arr.map((tactObject) => {
        return [tactObject.creeperNum, tactObject.bactNum];
    });
    googleArr.unshift(['creeperNum', 'bactNum']);

    num = arr.map((tactObject) => {
        return tactObject.tactNum;
    });
    creep = arr.map((tactObject) => {
        return tactObject.creeperNum;
    });

    back = arr.map((tactObject) => {
        return tactObject.bactNum;
    });
    draw1()
    draw2()

})

console.log(Init.get_SIZE_WORLD());

console.log(Init.get_NUM_TACT())

console.log(Init.get_VEW_NUM_TACT())

console.log(Init.get_START_NUM_CREEPERS())
console.log(Init.get_START_NUM_BACT())

console.log(Init.get_CREEPER_ENERGY_PRO_LIFE())

console.log(Init.get_CREEPER_INITIAL_ENERGY())


console.log(Init.get_CREEPER_ENERGY_RESERVE())

console.log(Init.get_MAX_CREEPER_NUM_BORN_PER_TACK())

console.log(Init.get_MAX_BACT_EATEN_BY_CREEPER())


console.log(Init.get_BACT_MULTIPLICATION_RATE())


console.log(Init.get_BACT_SPREAD_RATE())

console.log(Init.get_CREEPER_ENERGY_RESERVE())

console.log(Init.get_BACT_NUM_LIMIT())


let panel = document.getElementById('panel');
let SIZE_WORLD = panel.querySelector('input[name=SIZE_WORLD]');
let NUM_TACT = panel.querySelector('input[name=NUM_TACT]');
console.log(SIZE_WORLD);

SIZE_WORLD.value = Init.get_SIZE_WORLD();
NUM_TACT.value = Init.get_NUM_TACT();
