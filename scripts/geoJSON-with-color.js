let w = 500;
let h = 400;

let projection = d3.geo.albersUsa()
    .translate([w / 2, h / 2])
    .scale([w]);

let path = d3.geo.path().projection(projection);

let svg = d3.select('body').append('svg').attr({ width: w, height: h });

let color = d3.scale.linear()
    .range(['rgb(254,240,217)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(227,74,51)', 'rgb(179,0,0)']);
d3.csv('https://raw.githubusercontent.com/Colter-Hammer/learning-d3/master/state-sales.csv', function (data) {

    color.domain([
        0, d3.max(data, function (d) { return d.sales; })
    ]);

    d3.json('https://raw.githubusercontent.com/Colter-Hammer/learning-d3/master/us.json', function (json) {

        for (let i = 0; i < data.length; i++) {
            let salesState = data[i].state;
            let salesVal = parseFloat(data[i].sales);

            for (let j = 0; j < json.features.length; j++) {
                let usState = json.features[j].properties.NAME;

                if (salesState === usState) {
                    json.features[j].properties.value = salesVal;

                    break;
                }
            }
        }

        svg.selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('fill', function (d) {
                let value = d.properties.value;
                if (value) {
                    return color(value);
                } else {
                    return '#666666';
                }
            });
    });

});
