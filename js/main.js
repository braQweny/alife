import ArtLife_2_1  from './ArtLife_2_1'
require('chartist/dist/chartist.css')
import * as d3 from 'd3'

import  Init  from './Init'
import  Helpers  from './Helpers'

let data = ArtLife_2_1.main()
let arr = data['arr']
let total = data['total']
console.dir(total)
let simulation = data['simulation']


total[0].length = 100
total[1].length = 100
console.log(simulation);

table(total)


var googleArr = arr.map((tactObject) => {
    return [tactObject.creeperNum, tactObject.bactNum]
})

draw1()
draw2()
draw3()

function draw1() {

    var datad3 = arr
    var margin = {top: 10, right: 100, bottom: 30, left: 40}
    var width = 800 - margin.left - margin.right
    var height = 300 - margin.top - margin.bottom
    d3.select('#chart1 svg').remove()

    var svg = d3.select('#chart1')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleLinear().domain([0, Init.NUM_TACT]).range([0, width]);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))

    var yScale = d3.scaleLinear()
        .domain([
            d3.min(datad3, d => {
                return Math.min(d.bactNum, d.creeperNum)
            }),
            d3.max(datad3, d => {
                return Math.max(d.bactNum, d.creeperNum)
            })
        ])
        .range([height, 0])
    svg
        .append('g')
        .call(d3.axisLeft(yScale))

    var lineFunc = d3.line()
        .x(function (d) {
            return xScale(d.tactNum)
        })
        .y(function (d) {
            return yScale(d.bactNum)
        }).curve(d3.curveCatmullRom.alpha(0.5))

    var lineFunc2 = d3.line()
        .x(function (d) {
            return xScale(d.tactNum)
        })
        .y(function (d) {
            return yScale(d.creeperNum)
        }).curve(d3.curveCatmullRom.alpha(0.5))

    svg.append('svg:path')
        .attr('d', lineFunc(datad3))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

    svg.append('svg:path')
        .attr('d', lineFunc2(datad3))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

    svg.append('rect')
        .attr('x', 710)
        .attr('y', 0)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'blue')
    svg.append('text')
        .attr('x', 730)
        .attr('y', 15)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'white')
        .text('B')

    svg.append('rect')
        .attr('x', 710)
        .attr('y', 30)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'red')
    svg.append('text')
        .attr('x', 730)
        .attr('y', 45)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'black')
        .text('C')

}

function draw2() {
    var datad3 = googleArr
    var margin = {top: 10, right: 100, bottom: 30, left: 40}
    var width = 800 - margin.left - margin.right
    var height = 300 - margin.top - margin.bottom
    d3.select('#chart2 svg').remove()

    var svg = d3.select('#chart2')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var xScale = d3.scaleLinear().domain(d3.extent(datad3, d => d[0])).range([0, width])
    var yScale = d3.scaleLinear().domain(d3.extent(datad3, d => d[1])).range([height, 0])

    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale))
    svg.append('g').call(d3.axisLeft(yScale))


    var lineFunc = d3.line()
        .x(function (d) {
            return xScale(d[0])
        })
        .y(function (d) {
            return yScale(d[1])
        }).curve(d3.curveCatmullRom.alpha(0.5))

    svg.append('svg:path')
        .attr('d', lineFunc(datad3))
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('fill', 'red')

    svg.append('rect')
        .attr('x', 710)
        .attr('y', 250)
        .attr('width', 90)
        .attr('height', 20)
        .attr('fill', 'red')
    svg.append('text')
        .attr('x', 730)
        .attr('y', 265)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'black')
        .text('C')

    svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', 'blue')
    svg.append('text')
        .attr('x', 20)
        .attr('y', 15)
        .attr('width', 70)
        .attr('height', 50)
        .attr('fill', 'white')
        .text('B')
}

function draw3() {

    d3.select('#chart3 > svg').remove()
    var box = 60

    var margin = {top: 40, right: 40, bottom: 40, left: 40}
    var width = 680 - margin.left - margin.right
    var height = 680 - margin.top - margin.bottom

    var svg = d3.select('#chart3')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var svg2 = d3.select('#chart3').select('svg')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    function render(data) {
        var t = d3.transition().duration(1000)

        var updateRect = svg.selectAll('rect')
            .data(data, (d) => d)

        updateRect.exit().remove()
        updateRect.enter().append('rect')
            .attr('x', (d) => {
                return d[2] * box
            })
            .attr('y', d => {
                return height - (d[3] + 1) * box
            })
            .attr('width', box)
            .attr('height', box)
            .attr('fill', (d) => {
                if (d[0] > d[1]) {
                    return 'green'
                }
                else if
                (d[0] < d[1]) {
                    return 'black'
                }
                else {
                    return 'blue'
                }

            })
            .attr('stroke', '#fff')

        var updateText = svg.selectAll('text')
            .data(data, (d) => d)

        updateText.exit().remove()

        updateText.enter().append('text')
            .attr('x', (d) => {
                return d[2] * box + 20
            })
            .attr('y', d => {
                return height - (d[3] + 1) * box + (box - 15)
            })

            .attr('fill', '#C5113E')
            .text((d) => {
                return d[1]
            })

        var updateText2 = svg2.selectAll('text')
            .data(data, (d) => d)

        updateText2.exit().remove()

        updateText2.enter().append('text')
            .attr('x', (d) => {
                return d[2] * box + 20
            })
            .attr('y', d => {
                return height - (d[3] + 1) * box + (box - 30)
            })

            .attr('fill', 'white')
            .text((d) => {
                return d[0]
            })

    }

    var test = 0
    var time = setInterval(function () {

        render(simulation[test].world)
        // console.log('TAKT =>', test)
        test++
        if (test == simulation.length) {
            clearInterval(time)

        }
    }, 100)

}

let button = document.getElementById('update')

button.addEventListener('click', () => {
    Helpers.updateValue()
    Helpers.setValue()
    console.log('UPDATE')


})

let up = document.getElementById('up')

up.addEventListener('click', () => {
    console.log('RECOMP');
    data = ArtLife_2_1.main();
    total = data['total'];
    total[0].length = 100;
    total[1].length = 100;
    console.dir(total);
    arr = data['arr'];
    simulation = data['simulation'];
    console.dir(simulation.length);
    googleArr = arr.map((tactObject) => {
        return [tactObject.creeperNum, tactObject.bactNum]
    })


    draw1();
    draw2();
    draw3();
    table(data['total'])
})

Helpers.setValue();

function table(arr2) {
    // console.log('======> DATA')
    // console.dir(arr2)
    var array = arr2
    var arrayLength = array[0].length;

    var theTable = document.createElement('table');
    theTable.className = 'table table-bordered';
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
            td3.appendChild(document.createTextNode(i))
        }
        tr.appendChild(td3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        theTable.appendChild(tr)
    }
    document.getElementById('table').innerHTML = '';
    document.getElementById('table').append(theTable)
}

function responsivefy(svg) {
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)
    function resize() {
        var targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}