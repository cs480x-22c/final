function onMouseOver(d, i) {
  d3.select(this).attr("class", "highlight");
  d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr("width", x.bandwidth() + 5)
    .attr("y", function (d) {
      return y(d.value) - 10;
    })
    .attr("height", function (d) {
      return height - y(d.value) + 10;
    });

  g.append("text")
    .attr("class", "val")
    .attr("x", function () {
      return x(d.year);
    })
    .attr("y", function () {
      return y(d.value) - 15;
    })
    .text(function () {
      return ["$" + d.value]; // Value of the text
    });
}

//mouseout event handler function
function onMouseOut(d, i) {
  // use the text label class to remove label on mouseout
  d3.select(this).attr("class", "bar");
  d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("height", function (d) {
      return height - y(d.value);
    });

  d3.selectAll(".val").remove();
}
