let w = screen.width - 15;
let h = screen.height / 2;

// Add heading
d3.select('body').append('h1')
    .text('Runaway Mouse');

function update(circle) {
    // if (event.clientX + circle.r == circle.cx) {
    circle
        .attr('cx', event.clientX)
        .attr('cy', event.clientY);
    // }
}

// SVG
let svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

let circle = svg.append('circle')
    .attr('cx', w / 2)
    .attr('cy', h / 2)
    .attr('r', 15)
    .attr('fill', '#666666')
    .on('mousemove', () => {

        update(circle);
    });