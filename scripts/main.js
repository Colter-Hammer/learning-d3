


// line-graph
let monthlySales = [
    { "month": 10, 'sales': 200 },
    { "month": 20, 'sales': 140 },
    { "month": 30, 'sales': 200 },
    { "month": 40, 'sales': 210 },
    { "month": 50, 'sales': 150 },
    { "month": 60, 'sales': 220 },
    { "month": 70, 'sales': 90 },
    { "month": 80, 'sales': 60 },
    { "month": 90, 'sales': 230 },
    { "month": 100, 'sales': 70 }
];

var lineFun = d3.svg.line()
    .x(d => d.month * 3)
    .y(d => h - d.sales)
    .interpolate('basis');

var svg = d3.select('body').append('svg').attr({ width: w, height: h });

var viz = svg.append('path')
    .attr({
        d: lineFun(monthlySales),
        "stroke": 'purple',
        'stroke-width': 2,
        'fill': 'none'
    });

var lables = svg.selectAll('text')
    .data(monthlySales)
    .enter()
    .append('text')
    .text(d => d.sales)
    .attr({
        x: d => d.month * 3,
        y: d => h - d.sales,
        'font-size': '12px',
        'fill': '#666666',
        'text-anchor': "start",
        'dy': '.35em',
        'font-weight': (d, i) => {
            if (i === 0 || i === (monthlySales.length - 1)) {
                return 'bold'
            } else { return 'normal'; };
        }
    })

