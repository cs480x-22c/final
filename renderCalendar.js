let inputObject = document.getElementById('searchTxt')

function drawCalendar(myData, time, location) {
  var dict = {};
  tempArr = []
  let tempArr1 = []
  let current = myData[0];

  for (let i = 0; i < myData.length; i++) {
    tempArr.push(myData[i].Day)
  }
  var unique = [...new Set(tempArr)]

  for (let i = 0; i < unique.length; i++) {
    tempArr1 = []

    for (let j = 0; j < myData.length; j++) {


      if (myData[j].Day == unique[i]) {
        tempArr1.push([myData[j].Event_Name, myData[j].Location])
        dict[new Date(myData[j].Day)] = tempArr1
      }
    }
  }

  var calendarRows = function (month) {
    var m = d3.timeMonth.floor(month);
    return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
  }

  var minDate = d3.min(myData, function (d) {
    return new Date(d.Day);
  });
  var maxDate = d3.max(myData, function (d) { return new Date(d.Day); });

  var cellMargin = 2,
    cellSize = 20;

  var day = d3.timeFormat("%w"),
    week = d3.timeFormat("%U"),
    format = d3.timeFormat("%m/%d/%Y"),
    titleFormat = d3.utcFormat("%a, %d-%b"),
    monthName = d3.timeFormat("%B"),
    months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

  var svg = d3.select("#calendar").selectAll("svg")
    .data(months)
    .enter().append("svg")
    .attr("class", "month")
    .attr("width", (cellSize * 7) + (cellMargin * 8))
    .attr("height", function (d) {
      var rows = calendarRows(d);
      return (cellSize * rows) + (cellMargin * (rows + 1)) + 20; // the 20 is for the month labels
    })
    .append("g")

  svg.append("text")
    .attr("class", "month-name")
    .attr("x", ((cellSize * 7) + (cellMargin * 8)) / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text(function (d) { return monthName(d); })

  var rect = svg.selectAll("rect.day")
    .data(function (d, i) {
      return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1));
    })
    .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("rx", 3).attr("ry", 3) // rounded corners
    .attr("fill", '#eaeaea')
    .attr("x", function (d) {
      return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin;
    })
    .attr("y", function (d) {
      return ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellSize) +
        ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellMargin) +
        cellMargin + 20;
    })
    .on("mouseover", function (d) {
      d3.select(this).classed('hover', true);
    })
    .on("mouseout", function (d) {
      d3.select(this).classed('hover', false);
    })

  rect.append("title")
    .text(function (d) { return titleFormat(new Date(d)); });

  var lookup = d3.nest()
    .key(function (d) { return new Date(d.Day); })
    .rollup(function (leaves) {

      return leaves.length;
    })
    .object(myData);

  count = d3.nest()
    .key(function (d) { return new Date(d.Day); })
    .rollup(function (leaves) { return leaves.length; })
    .entries(myData);

  scale = d3.scaleLinear()
    .domain(d3.extent(count, function (d) { return d.value; }))
    .range([0.4, 1]); // the interpolate used for color expects a number in the range [0,1] but i don't want the lightest part of the color scheme

  rect.filter(function (d) {
    return d in lookup;
  })
    .style("fill", function (d) {
      return d3.interpolateBlues(scale(lookup[d]));
    })
    .attr('stroke', 'steelblue')
    .on("click", function (d) {
      console.log(d)
      d3.select("#events").html("")
      dict[d].forEach(function(element) {
        d3.select("#events").append("p").text(`${element[1]} : ${element[0]}`)
      })
      selectedDate = new Date(d).toLocaleDateString('en-US')
      d3.select("#time").text(`Showing events on ${selectedDate} in ${location} starting at ${time}`)
      colorBuildings(selectedDate, time)
    })
    .select("title")
    .text(function (d) { return "There are " + lookup[d] + " Events on " + titleFormat(new Date(d)) });
}

function getInputValue(location = document.getElementById('building').options[document.getElementById('building').selectedIndex].value, time = moment(document.getElementById("myInputTime").value, 'HH:mm').format('h:mm A')) {
  // Selecting the input element and get its value
  d3.select("#calendar").html("")
  d3.select("#events").html("")
  d3.select("#time").html("")
  d3.csv("filtered_25live.csv").then(function (data) {
    data = data.filter(function (row) {
      console.log(moment(row['Event_Start'], 'h:mm A').startOf('hour').format('h:mm A'))
      return (row['Event_Start'] == time) && (row['Location1'] == location);
    })
    d3.select("#info").text(`Calendar of events starting at ${time} in ${location}. Click a date to see details and update map`)
    drawCalendar(data, time, location)
  })
}