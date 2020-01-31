import appContent from '../../components/app-content'
import snake from '../../snake'
export default {
  name: 'game',
  data() {
    return {
      id: 1,
      showlist: true,
      snake: false
    }
  },
  components: {
    'app-content': appContent,
    'snake': snake
  },
  created() {
    console.log('-----')

  },
  methods: {
    showcontent(id) {
      this.showlist = false
      this.id = id
      window.history.pushState({ status: 0 }, '', `?id=${this.id}`)
    },
    showsnake() {
      this.showlist = false
      this.snake = true
      // this.$router.push({ name: 'snake' })
    }
  }
}