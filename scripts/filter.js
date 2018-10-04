//scatter plot

let w = 400;
let h = 400

let svg = d3.select('body').append('svg').attr({ width: w, height: h });

let monthlySales = [
    { "month": 10, 'sales': 200 },
    { "month": 20, 'sales': 140 },
    { "month": 30, 'sales': 200 },
    { "month": 40, 'sales': 300 },
    { "month": 50, 'sales': 150 },
    { "month": 60, 'sales': 220 },
    { "month": 70, 'sales': 90 },
    { "month": 80, 'sales': 60 },
    { "month": 90, 'sales': 230 },
    { "month": 100, 'sales': 70 }
];

function salesKPI(d) {
    if (d >= 250) {
        return '#33CC66';
    }
    else {
        return '#666666';
    }
}

function showMinMax(ds, col, val, type) {
    var max = d3.max(ds, d => d[col]);
    let min = d3.min(ds, d => d[col]);

    if (type == 'minmax' && (val == max || val == min)) {
        return val;
    } else {
        if (type == 'all') {
            return val;
        }
    }
}

var dots = svg.selectAll('circle')
    .data(monthlySales)
    .enter()
    .append('circle')
    .attr({
        cx: d => d.month * 3,
        cy: d => h - d.sales,
        r: 5,
        'fill': d => salesKPI(d.sales)
    })


var labels = svg.selectAll('text')
    .data(monthlySales)
    .enter()
    .append('text')
    .text(d => showMinMax(monthlySales, 'sales', d.sales, 'minmax'))
    .attr({
        x: d => d.month * 3,
        y: d => h - d.sales,
        'font-size': '17px',
        'font-family': 'sans-serif',
        'text-anchor': 'end',
        'dy': '-.35em'
    });

d3.select('select')
    .on('change', d => {
        let sel = d3.select('#label-option').node().value;

        svg.selectAll('text')
            .data(monthlySales)
            .text(d => showMinMax(monthlySales, 'sales', d.sales, sel));
    });