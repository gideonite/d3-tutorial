var process_data = function(data) {
    return data.map(function(d, i){
        d['Petal.Length'] = parseFloat(d['Petal.Length']);
        d['Petal.Width'] = parseFloat(d['Petal.Width']);
        d['Sepal.Length'] = parseFloat(d['Sepal.Length']);
        d['Sepal.Width'] = parseFloat(d['Sepal.Width']);
        d['idx'] = i;       // use this as an id later

        return d;
    });
};

var dims = {
    width: 200,
    height: 200,
    radius: 2.5,
    height_padding: 20
};

var margin = {
    right: 20,
    top: 50
};

// params: an object with the following: div, data, x_feature, y_feature
// returns the svg containing the scatter plot
var iris_scatter = function(params) {

    data = process_data(params.data);

    var svg = d3.select(params.div)
        .append('svg')
        .style('margin-right', margin.right + "px")
        .style('margin-top', margin.top + "px")
        .attr('width', dims.width + 2 * dims.radius)
        .attr('height', dims.height + 2 * dims.radius);

    // x
    var x_domain = data.map(function(d) {
        return d[params.x_feature];
    });
    x_domain = [d3.min(x_domain), d3.max(x_domain)];

    var x = d3.scale.linear()
        .domain(x_domain)
        .range([dims.radius, dims.width]);

    // y
    var y_domain = data.map(function(d) {
        return d[params.y_feature];
    });
    y_domain = [d3.min(y_domain), d3.max(y_domain)];

    var y = d3.scale.linear()
        .domain(y_domain)
        .range([dims.radius, dims.height]);

    var species_domain = data.map(function(d) {
        return d['Species'];
    });

    // lifted from the d3/lib
    var d3_category20c = [
        "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
        "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
        "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
        "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
        "#636363", "#969696", "#bdbdbd", "#d9d9d9"
            ];

    species_scale = d3.scale.ordinal()
        .domain(species_domain)
        .range([d3_category20c[0], d3_category20c[6], d3_category20c[8]]);

    var circle = svg.selectAll('circle')
        .data(data);

    circle
        .enter()
        .append('circle')
        .attr('r', dims.radius)
        .attr('fill', function(d) { return species_scale(d['Species']); })
        .attr('cx', function(d) { return x(d[params.x_feature]); })
        .attr('cy', function(d) { return dims.height - y(d[params.y_feature]); });

    circle.on('mouseover', function(that) {
        d3.selectAll('circle').filter(function(d) {
            return d.idx === that.idx;
        }).attr('fill', 'red');
    });

    circle.on('mouseout', function(that) {
        d3.selectAll('circle').filter(function(d) {
            return d.idx === that.idx;
        }).attr('fill', function(d) { return species_scale(d['Species']); })
    });

    if (params.x_axis) {
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + dims.top_padding + ')')
                    .call(d3.svg.axis()
                        .scale(x)
                        .orient("top")
                        .ticks(5));
    }

    if (params.y_axis) {
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + dims.width + ',0)')
                    .call(d3.svg.axis()
                        .scale(y)
                        .orient("right")
                        .ticks(5));
    }

    return svg;
};
