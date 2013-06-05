// params: array of iris data
//
// converts strings to floats, and adds a field 'idx' which is the datum's
// index in the array.  Later this 'idx' is used to identify the datum.
//
// returns processed list of data
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

var species_domain = ['setosa', 'versicolor', 'virginica'];

// lifted from the d3/lib
var d3_category20c = [
"#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
    "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
    "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
    "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
    "#636363", "#969696", "#bdbdbd", "#d9d9d9"
    ];

    // probably not the clearest way of doing this
    species_scale = d3.scale.ordinal()
    .domain(species_domain)
    .range([d3_category20c[0], d3_category20c[6], d3_category20c[8]]);

// params: an object with the following: [ div, data, x_feature, y_feature,
// x_axis (boolean), y_axis (boolean) ]
//
// returns the svg containing the scatter plot
var iris_scatter = function(params) {
    var dims = {
        width: 200,
        height: 200,
        radius: 2.5,
        padding_top: 20,
        padding_right: 10
    };

    var margin = {
        right: 20,
        top: 50
    };

    data = process_data(params.data);

    var svg = d3.select(params.div)
        .append('svg')
        .style('margin-right', margin.right + "px")
        .style('margin-top', margin.top + "px")
        .attr('width', dims.width + 2 * dims.radius)
        .attr('height', dims.height + 2 * dims.radius);

    // x scale
    var x_domain = data.map(function(d) {
        return d[params.x_feature];
    });
    x_domain = [d3.min(x_domain), d3.max(x_domain)];

    var x_scale = d3.scale.linear()
        .domain(x_domain)
        .range([dims.radius, dims.width - dims.padding_right - dims.radius - 5]);

    // y scale
    var y_domain = data.map(function(d) {
        return d[params.y_feature];
    });
    y_domain = [d3.min(y_domain), d3.max(y_domain)];

    var y_scale = d3.scale.linear()
        .domain(y_domain)
        .range([dims.height, dims.padding_top + dims.radius + 5]);

    var circle = svg.selectAll('circle')
        .data(data);        // bind data to circles

    circle
        .enter()            // create an enter selection
        .append('circle')
        .attr('r', dims.radius)
        .attr('fill', function(d) { return species_scale(d['Species']); })
        .attr('cx', function(d) { return x_scale(d[params.x_feature]); })
        .attr('cy', function(d) { return y_scale(d[params.y_feature]); });

    circle.on('mouseover', function(that) {
        d3.selectAll('circle').filter(function(d) {
            // grab all the points whose data have the same index as the one
            // mouse overed
            return d.idx === that.idx;
        })
        .attr('fill', 'red')
        .attr('r', dims.radius * 2)
        .style('z-index', 200);
    });

    circle.on('mouseout', function(that) {
        d3.selectAll('circle').filter(function(d) {
            return d.idx === that.idx;
        })
        .attr('fill', function(d) { return species_scale(d['Species']); })
        .attr('r', dims.radius);
    });

    if (params.x_axis) {
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + dims.padding_top + ')')
                    .call(d3.svg.axis()
                        .scale(x_scale)
                        .orient("top")
                        .ticks(5));
    }

    if (params.y_axis) {
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (dims.width - dims.padding_right) + ',0)')
                    .call(d3.svg.axis()
                        .scale(y_scale)
                        .orient("right")
                        .ticks(5));
    }

    return svg;
};

//var iris_parallel_coordinates = function(params) {
//
//    var dims = {
//        width: 400,
//        height: 200,
//        radius: 2.5,
//        padding_top: 20,
//        padding_right: 10
//    };
//
//    var svg = d3.select(params.div)
//        .append('svg')
//        .attr('width', dims.width)
//        .attr('height', dims.height);
//
//    var sepal_length_range = data.map(function(d) { return d['Sepal.Length']; });
//    sepal_length_range = [ d3.min(sepal_length_range), d3.max(sepal_length_range) ];
//    var sepal_length_scale = d3.scale.linear()
//        .domain(dims.height)
//        .range(sepal_length_range);
//
//    var sepal_width_range = data.map(function(d) { return d['Sepal.Width']; });
//    sepal_width_range = [ d3.min(sepal_width_range), d3.max(sepal_width_range) ];
//    var sepal_width_scale = d3.scale.linear()
//        .domain(dims.height)
//        .range(sepal_width_range);
//
//    svg.selectAll('line')
//        .data(params.data)
//        .enter()
//        .append('line')
//        .attr('d', function(d) {
//        });
//};
