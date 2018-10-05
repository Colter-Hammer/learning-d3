let w = 900;
let h = 400;

let projection = d3.geo.albersUsa()
    .translate([w / 2, h / 2])
    .scale([w]);

let path = d3.geo.path().projection(projection);

let svg = d3.select('body').append('svg').attr({ width: w, height: h });

d3.json('https://raw.githubusercontent.com/Colter-Hammer/learning-d3/master/us.json', function (json) {

    svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#666666');

    d3.csv('https://raw.githubusercontent.com/Colter-Hammer/learning-d3/master/sales-by-city.csv', function (data) {
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr({
                cx: function (d) { return projection([d.lon, d.lat])[0]; },
                cy: function (d) { return projection([d.lon, d.lat])[1]; },
                r: function (d) { return Math.sqrt(parseInt(d.sales) * .00005); },
                'fill': 'red'
            });
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                if (!projection([d.lon, d.lat])) return;
                return projection([d.lon, d.lat])[0];

            })
            .attr("cy", function (d) {
                if (!projection([d.lon, d.lat])) return;
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", function (d) {
                return Math.sqrt(parseInt(d.sales) * 0.00005);
            })
            .style("fill", "red");

    });
});
// });



