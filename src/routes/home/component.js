import appClock from '../code/app-clock'

export default {
  data() {
    return {
      isHover: true
    }
  },
  components: {
    [appClock.name]: appClock
  },
  methods: {
    changeHover: function () {
      this.isHover = !this.isHover
    }
  },
  mounted() { }
}