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

    var petal_length_domain = data.map(function(d) {
        return d['Petal.Length'];
    });
    petal_length_domain = [d3.min(petal_length_domain), d3.max(petal_length_domain)];

    var y = d3.scale.linear()
        .domain(petal_length_domain)
        .range([dims.radius, dims.height]);

    var petal_width_domain = data.map(function(d) {
        return d['Petal.Width'];
    });
    petal_width_domain = [d3.min(petal_width_domain), d3.max(petal_width_domain)];

    var x = d3.scale.linear()
        .domain(petal_width_domain)
        .range([dims.radius, dims.width]);

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
