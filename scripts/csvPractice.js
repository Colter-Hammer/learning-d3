const url = 'MonthlySales.csv';

let w = 500;
let h = 500;
let ds;
let svg = d3.select('body').append('svg').attr({ width: w, height: h });

function buildLine(ds) {
    var lineFun = d3.svg.line()
        .x(d => (d.month - 20130001) / 3.25)
        .y(d => h - d.sales)
        .interpolate('linear');

    var viz = svg.append('path')
        .attr({
            d: lineFun(ds),
            'stroke': 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });
}

function showTotals() {
    var t = d3.select('body').append('table');
    let salesTotal = 0.0;
    let salesAvg = 0.0;
    let metrics = [];

    salesTotal = Array.from(ds).reduce((acc, d) => {
        return acc += parseInt(d.sales);
    }, salesTotal);

    salesAvg = salesTotal / ds.length;

    metrics.push('Sales Total: ' + salesTotal);
    metrics.push('Sales Average: ' + salesAvg.toFixed(2));

    var tr = t.selectAll('tr')
        .data(metrics)
        .enter()
        .append('tr')
        .append('td')
        .text(d => d);
}


d3.csv('MonthlySales.csv', (err, data) => {
    if (err) console.log('ERR: ', err);
    else console.log(data);
    ds = data;
    buildLine(ds);
    showTotals();

});