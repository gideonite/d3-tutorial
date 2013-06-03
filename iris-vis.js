var process_data = function(data) {
    return data.map(function(d){
        d['Petal.Length'] = parseFloat(d['Petal.Length']);
        d['Petal.Width'] = parseFloat(d['Petal.Width']);

        return d;
    });
};

var dims = {
    width: 500,
    height: 500,
    radius: 2.5
};

var margin = {
    left: 50,
    top: 50
};

// params:
var iris_plot = function(params) {
//div, data, x_feature, y_feature

    data = process_data(params.data);

    var svg = d3.select(params.div)
        .append('svg')
        .style('margin-left', margin.left + "px")
        .style('margin-top', margin.top + "px")
        .attr('width', dims.width + 2 * dims.radius)
        .attr('height', dims.height + 2 * dims.radius);

    // x
    var x_domain = data.map(function(d) {
        return d['Petal.Width'];
    });
    x_domain = [d3.min(x_domain), d3.max(x_domain)];

    var x = d3.scale.linear()
        .domain(x_domain)
        .range([dims.radius, dims.width]);

    // y
    var y_domain = data.map(function(d) {
        return d['Petal.Length'];
    });
    y_domain = [d3.min(y_domain), d3.max(y_domain)];

    var y = d3.scale.linear()
        .domain(y_domain)
        .range([dims.radius, dims.height]);

    var species_domain = data.map(function(d) {
        return d['Species'];
    });

    species_scale = d3.scale.ordinal()
        .domain(species_domain)
        .range(["red", "blue", "green"]);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', dims.radius)
        .attr('fill', function(d) { return species_scale(d['Species']); })
        .attr('cx', function(d) { return x(d['Petal.Width']); })
        .attr('cy', function(d) { console.log(d['Petal.Length']); return y(d['Petal.Length']); });
};
