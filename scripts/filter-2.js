let h = 300;
let w = 500;
let padding = 20;
// let ds;

function showHeader(ds) {

    d3.select('body').append('h1')
        .text(ds.category + ' Sales (2013)');
}

function getDate(d) {
    let strDate = new String(d);
    let year = strDate.substr(0, 4);
    let month = strDate.substr(4, 2) - 1;
    let day = strDate.substr(6, 2);

    return new Date(year, month, day);

}

function buildLine(ds) {

    let minDate = getDate(ds.monthlySales[0]['month']);
    let maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding + 5, w - padding]);

    var yScale = d3.scale.linear()
        .domain([
            0, d3.max(ds.monthlySales, d => d.sales)
        ])
        .range([h - padding, 10]);


    let xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b'));
    var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

    var lineFun = d3.svg.line()
        .x(d => xScale(getDate(d.month)))
        .y(d => yScale(d.sales))
        .interpolate('linear');

    let svg = d3.select('body').append('svg').attr({ width: w, height: h, 'id': 'svg-' + ds.category });

    let yAxis = svg.append('g').call(yAxisGen)
        .attr('class', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`);

    let xAxis = svg.append('g').call(xAxisGen)
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${h - padding})`);


    var viz = svg.append('path')
        .attr({
            d: lineFun(ds.monthlySales),
            'stroke': 'purple',
            'stroke-width': 2,
            'fill': 'none',
            'class': 'path-' + ds.category,
        });
}

function updateLine(ds) {

    let minDate = getDate(ds.monthlySales[0]['month']);
    let maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding + 5, w - padding]);

    var yScale = d3.scale.linear()
        .domain([
            0, d3.max(ds.monthlySales, d => d.sales)
        ])
        .range([h - padding, 10]);

    let xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b')).ticks(ds.monthlySales.length - 1);
    var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

    var lineFun = d3.svg.line()
        .x(d => xScale(getDate(d.month)))
        .y(d => yScale(d.sales))
        .interpolate('linear');

    let svg = d3.select('body').select('#svg-' + ds.category);

    let yAxis = svg.selectAll('g.y-axis').call(yAxisGen);

    let xAxis = svg.selectAll('g.x-axis').call(xAxisGen);

    var viz = svg.selectAll('.path-' + ds.category)
        .transition()
        .duration(2000)
        .ease('linear')
        .attr({
            d: lineFun(ds.monthlySales)
        });
}

d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', function (err, data) {
    if (err) {
        console.log('ERR: ', err);
    }
    else {
        // console.log(data);
    }

    let decodedData = JSON.parse(window.atob(data.content));

    // console.log(decodedData.contents);

    decodedData.contents.forEach(function (ds) {
        // console.log(ds);
        showHeader(ds);
        buildLine(ds);
    });

    d3.select('select')
        .on('change', (d, i) => {

            let sel = d3.select('#date-option').node().value;

            let decodedData = JSON.parse(window.atob(data.content));

            decodedData.contents.forEach(function (ds) {
                ds.monthlySales.splice(0, ds.monthlySales.length - sel);
                updateLine(ds);
            });
        });
});

