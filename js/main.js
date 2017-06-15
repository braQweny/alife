import ArtLife_2_1  from './ArtLife_2_1'
require('chartist/dist/chartist.css');
import * as d3 from "d3"

import  Init  from './Init'
import  Helpers  from './Helpers'

let data = ArtLife_2_1.main();
let arr = data['arr'];
let total = data['total'];
let simulation = data['simulation'];
console.dir(simulation);
total[0].length = 100;
total[1].length = 100;


table(data['total']);

let num = arr.map((tactObject) => {
    return tactObject.tactNum
})
let creep = arr.map((tactObject) => {
    return tactObject.creeperNum
})

let back = arr.map((tactObject) => {
    return tactObject.bactNum
})

var googleArr = arr.map((tactObject) => {
    return [tactObject.creeperNum, tactObject.bactNum]
})
// googleArr.unshift(['creeperNum', 'bactNum'])
// console.dir(googleArr)
draw1()
draw2()

function draw1() {

    var datad3 = arr
    var margin = {top: 10, right: 100, bottom: 30, left: 40};
    var width = 800 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    d3.select("#chart1 svg").remove();

    var svg = d3.select('#chart1')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    var yScale = d3.scaleLinear()
        .domain([
            d3.min(datad3, d => {
                return Math.min(d.bactNum, d.creeperNum)
            }),
            d3.max(datad3, d => {
                return Math.max(d.bactNum, d.creeperNum)
            })
        ])
        .range([height, 0]);
    svg
        .append('g')
        .call(d3.axisLeft(yScale));

    var lineFunc = d3.line()
        .x(function (d) {
            return xScale(d.tactNum);
        })
        .y(function (d) {
            return yScale(d.bactNum);
        }).curve(d3.curveCatmullRom.alpha(0.5));

    var lineFunc2 = d3.line()
        .x(function (d) {
            return xScale(d.tactNum);
        })
        .y(function (d) {
            return yScale(d.creeperNum);
        }).curve(d3.curveCatmullRom.alpha(0.5));

    svg.append("svg:path")
        .attr("d", lineFunc(datad3))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    svg.append("svg:path")
        .attr("d", lineFunc2(datad3))
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none")

    svg.append("rect")
        .attr('x', 710)
        .attr('y', 0)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'blue')
    svg.append("text")
        .attr('x', 730)
        .attr('y', 15)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'white')
        .text('B');

    svg.append("rect")
        .attr('x', 710)
        .attr('y', 30)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'red')
    svg.append("text")
        .attr('x', 730)
        .attr('y', 45)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'black')
        .text('C');



}



function draw2() {
    var datad3 = googleArr;
    var margin = {top: 10, right: 100, bottom: 30, left: 40};
    var width = 800 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    d3.select("#chart2 svg").remove();

    var svg = d3.select('#chart2')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleLinear().domain(d3.extent(datad3, d => d[0])).range([0, width]);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    var yScale = d3.scaleLinear()
        .domain(d3.extent(datad3, d => d[1]))
        .range([height, 0]);
    svg
        .append('g')
        .call(d3.axisLeft(yScale));

    var lineFunc = d3.line()
        .x(function (d) {
            return xScale(d[0]);
        })
        .y(function (d) {
            return yScale(d[1]);
        }).curve(d3.curveCatmullRom.alpha(0.5));


    svg.append("svg:path")
        .attr("d", lineFunc(datad3))
        .attr("stroke", "blue")
        .attr("stroke-width", 0)
        .attr("fill", "red");


    svg.append("rect")
        .attr('x', 710)
        .attr('y', 250)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'blue')
    svg.append("text")
        .attr('x', 730)
        .attr('y', 265)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'white')
        .text('B');

    svg.append("rect")
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', 'red')
    svg.append("text")
        .attr('x', 20)
        .attr('y', 15)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'black')
        .text('C');




}

let button = document.getElementById('update');

button.addEventListener('click', () => {
    Helpers.updateValue()
    Helpers.setValue()
    console.log('UPDATE')
    // console.log(Init.SIZE_WORLD)
    // console.log(typeof Init.NUM_TACT)
    // console.log(Init.VEW_NUM_TACT)
    // console.log(Init.START_NUM_CREEPERS)
    //
    // console.log(Init.START_NUM_BACT)
    //
    // console.log(Init.CREEPER_ENERGY_PRO_LIFE)
    // console.log(Init.CREEPER_INITIAL_ENERGY)
    // console.log(Init.CREEPER_ENERGY_RESERVE)
    //
    // console.log(Init.MAX_CREEPER_NUM_BORN_PER_TACK)
    // console.log(Init.MAX_BACT_EATEN_BY_CREEPER)
    //
    // console.log(Init.BACT_MULTIPLICATION_RATE)
    // console.log(Init.BACT_SPREAD_RATE)
    // console.log(Init.BACT_NUM_LIMIT)

})

let up = document.getElementById('up');

up.addEventListener('click', () => {
    console.log('RECOMP');
    data = ArtLife_2_1.main();
    arr = data['arr'];
    googleArr = arr.map((tactObject) => {
        return [tactObject.creeperNum, tactObject.bactNum]
    });

    num = arr.map((tactObject) => {
        return tactObject.tactNum
    });
    creep = arr.map((tactObject) => {
        return tactObject.creeperNum
    });

    back = arr.map((tactObject) => {
        return tactObject.bactNum
    });
    draw1();
    draw2();
    table(data['total']);
});

Helpers.setValue();


function table(arr2) {
    console.log('======> DATA')
    console.dir(arr2);
    var array = arr2;
    var arrayLength = array[0].length;

    var theTable = document.createElement('table');
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    td1.appendChild(document.createTextNode('Creepers'));
    td2.appendChild(document.createTextNode('Bacteria'));
    td3.appendChild(document.createTextNode('Przebieg'));
    tr.appendChild(td3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    theTable.appendChild(tr);

    for (let i = 0; i < arrayLength; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        if ((i % 10) == 0) {
            td1.appendChild(document.createTextNode(array[0][i]));
            td2.appendChild(document.createTextNode(array[1][i]));
            td3.appendChild(document.createTextNode(i));
        }
        tr.appendChild(td3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        theTable.appendChild(tr);
    }
    document.getElementById('table').innerHTML = '';
    document.getElementById('table').append(theTable);
}



function responsivefy(svg) {
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}