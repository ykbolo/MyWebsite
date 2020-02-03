import appContent from '../../components/app-content'
import snake from '../../snake'
export default {
  name: 'game',
  data() {
    return {
      hasid: false,
      showlist: true,
      snake: false,
      id: 1
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
      this.hasid = true
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
