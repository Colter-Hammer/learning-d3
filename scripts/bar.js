// bar graph
let w = 500;
let h = 300;
let padding = 2;
let dataset = [5, 10, 14, 20, 25, 15, 17, 42, 50,];

let svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h);

function colorPicker(v) {
    if (v <= 15) {
        return "red";
    } else return "green";
}

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr({
        x: (d, i) => i * (w / dataset.length),
        y: d => h - d * 4,
        width: w / dataset.length - padding,
        height: d => d * 4,
        fill: d => colorPicker(d)
    })
    .on('mouseover', function (d) {
        svg.append('text')
            .text(d)
            .attr({
                "text-anchor": "middle",
                x: parseFloat(d3.select(this).attr('x')) + parseFloat(d3.select(this).attr('width') / 2),
                y: parseFloat(d3.select(this).attr('y')) + 12,
                'font-family': 'sans-serif',
                'font-size': 12,
                'fill': '#ffffff',
                id: 'tooltip'
            });
    })
    .on('mouseout', function () {
        d3.select('#tooltip').remove();
    });



// Adds a tool tip/hover text to the rectangle
// .append('title')
// .text(d => d);

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .text(function (d) { return d; })
//     .attr({
//         "text-anchor": "middle",
//         x: (d, i) => i * (w / dataset.length) + ((w / dataset.length - padding) / 2),
//         y: function (d) { return h - (d * 4) + 15; },
//         fill: '#ffffffff'
//     });