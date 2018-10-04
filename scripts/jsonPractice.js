let h = 100;
let w = 400;
// let ds;

function showHeader(ds) {

    d3.select('body').append('h1')
        .text(ds.category + ' Sales (2013)');
}

function buildLine(ds) {

    var lineFun = d3.svg.line()
        .x(d => (d.month - 20130001) / 3.25)
        .y(d => h - d.sales)
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