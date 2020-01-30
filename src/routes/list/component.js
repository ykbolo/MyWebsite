import d3 from 'd3'
export default {
  name: 'list',
  data() {
    return {
      title: '代码'
    }
  },
  mounted() {
    // this.category_move()
    // this.description_move()
  },
  methods: {
    // category_move() {
    //   var category = d3.select(".category"),
    //     duration = 3000;
    //   category.classed("box", true)
    //     .style("background-color", "orange") // <-B
    //     .transition() // <-C
    //     .duration(duration) // <-D
    //     .style("background-color", "purple") // <-E
    //     .style("margin-top", "300px") // <-F
    //     .transition() // <-C
    //     .duration(duration) // <-D
    //     .style("margin-top", "20px") // <-F
    //     .style("background-color", "orange")
    // },
    // description_move() {
    //   var description = d3.selectAll(".description"),
    //     duration = 3000;
    //   description.classed("box", true)
    //     .style("color", "purple") // <-B
    //     .transition() // <-C
    //     .duration(duration) // <-D
    //     .style("color", "#af18af") // <-E
    //     // <-F
    //     .transition() // <-C
    //     .duration(duration) // <-D

    // }
  }
}