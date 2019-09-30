export default {
  data() {
    return {
      isHover: true
    }
  },
  components: {
  },
  methods: {
    changeHover: function () {
      this.isHover = !this.isHover
    }
  },
  mounted() { }
}