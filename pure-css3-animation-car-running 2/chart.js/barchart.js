var margin = {top: 20, right: 20, bottom: 70, left: 40},

width = 1500 - margin.left - margin.right,

height = 700 - margin.top - margin.bottom;





// var	parseDate = d3.time.format("%Y").parse;



var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);





var y = d3.scale.linear().range([height, 0]);



var xAxis = d3.svg.axis()

.scale(x)

.orient("bottom");

// .tickFormat(d3.time.format("%Y"));







var yAxis = d3.svg.axis()

.scale(y)

.orient("left")
.ticks(20)
.tickFormat(d3.format("s"));







var svg = d3.select("chart-wrapper").append("svg")

.attr("width", width + margin.left + margin.right)

.attr("height", height + margin.top + margin.bottom)

.append("g")

.attr("transform",

"translate(" + margin.left + "," + margin.top + ")");







var country = [{key:"country", values:[]}];

var obs_value=[{key:"obs_value", values:[]}];



var obj=[];

console.log(obj);

d3.json("https://datasource.kapsarc.org/api/records/1.0/search/?dataset=greenhouse-gas-emissions&facet=time_period&facet=country&facet=variable&refine.variable=1A3+-+Transport&refine.time_period=2014&exclude.country=Belgium&exclude.country=Denmark&exclude.country=Estonia&exclude.country=Hungary&exclude.country=Greece&exclude.country=Iceland&exclude.country=Netherlands&exclude.country=Slovak+Republic&exclude.country=Norway&exclude.country=Czech+Republic&exclude.country=Luxembourg&exclude.country=Austria&exclude.country=Portugal&exclude.country=Lithuania&exclude.country=Slovenia&exclude.country=Finland&exclude.country=Latvia", function(error,data)

{

console.log(data);

var value = [];

var value2 =[];

var temp;

var temp2;





$.each( data.records, function( key, val ) {

console.log(data.records);

$.each( val.fields, function( key2, val2  ) {

  if (key2=="country" ){

   temp =val2;

   value.push( {  country : val2 }  );}

   if (key2=="obs_value"){

    temp2 =val2;

    value2.push({ obs_value: val2} );

  }

});

obj.push({ country : temp ,obs_value: temp2 });

// console.log(obj[0].time_period);



});



// console.log(d3.select(obj));

// var p = d3.select(obj).selectAll(obj)

//  .data(theData)

//  .enter()

//  .append("p")

//  .text(function (d,i) {

//    return "i = " + i + " d = "+d;

//   });


console.log(obj[1].country);

console.log(obj[1].obs_value);

console.log(data);

// .sort(function(a,b){return a - b; }



x.domain(obj.map(function(d) {  return d.country; }));

y.domain([0, d3.max(obj, function(d) { console.log(d.obs_value);return d.obs_value; })]);

var colors=d3.scale.linear()

.domain([0,obj.length])

.range(["#efefef","#000"])

svg.append("g")

.attr("class", "x axis")

.attr("transform", "translate(0," + height + ")")

.call(xAxis)

.selectAll("text")

.style("text-anchor", "end")

.attr("dx", "-.8em")

.attr("dy", "-.55em")

.attr("transform", "rotate(-90)" );



svg.append("g")

.attr("class", "y axis")

.call(yAxis)

.append("text")

.attr("transform", "rotate(-90)")

.attr("y", 6)

.attr("dy", ".71em")

.style("text-anchor", "end")



svg.append("g")

.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

.selectAll(".textlabel")

.data(obj)

.enter()

.append("text")

.attr("class", "textlabel")

.attr("x", function(d){ return x(d["country"]) + (x.rangeBand()/-4); })

.attr("y", function(d){ return y(d["obs_value"]) - 25; })

.text(function(d){ return d3.format("")(d["obs_value"]); });



svg.selectAll("bar")

.data(obj)

.enter().append("rect")

.style("fill",function(d,i){



return colors(i);

})

// .attr("class","rectangle")

.attr("x", function(d) {   return x(d.country); })

.attr("width", x.rangeBand())

.attr("y", function(d) { return y(d.obs_value); })

.attr("height", function(d) { return height - y(d.obs_value);})

.attr("height", 0)

    .transition()

    .duration(300)

    // .ease(d)

    .delay(function (d, i) {

      return i *300;

    })

    .attr("y", function (d, i) {



     console.log(y(d.obs_value)); return y(d.obs_value);

    })

    .attr("height", function (d, i) {

      return height -y(d.obs_value);

    })



});
