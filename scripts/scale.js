let h = 100;
let w = 400;
// let ds;

function showHeader(ds) {

    d3.select('body').append('h1')
        .text(ds.category + ' Sales (2013)');
}

function buildLine(ds) {
    var xScale = d3.scale.linear()
        .domain([
            d3.min(ds.monthlySales, d => d.month),
            d3.max(ds.monthlySales, d => d.month)
        ])
        .range([0, w]);

    var yScale = d3.scale.linear()
        .domain([
            0, d3.max(ds.monthlySales, d => d.sales)
        ])
        .range([h, 0]);

    var lineFun = d3.svg.line()
        .x(d => xScale(d.month))
        .y(d => yScale(d.sales))
        .interpolate('linear');

    let svg = d3.select('body').append('svg').attr({ width: w, height: h });
    var viz = svg.append('path')
        .attr({
            d: lineFun(ds.monthlySales),
            'stroke': 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });
}


d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', function (err, data) {
    if (err) {
        console.log('ERR: ', err);
    }
    else {
        console.log(data);
    }

    let decodedData = JSON.parse(window.atob(data.content));

    console.log(decodedData.contents);

    decodedData.contents.forEach(function (ds) {
        console.log(ds);
        showHeader(ds);
        buildLine(ds);
    });

});