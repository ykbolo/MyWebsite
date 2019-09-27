export default {
  data() {
    return {
      isHover: true
    }
  },
  methods: {
    changeHover: function () {
      this.isHover = !this.isHover
    }
  },
  mounted() { }
}