import appContent from '../../components/app-content'
export default {
  name: 'game',
  data() {
    return {
      id: 1,
      showlist: true
    }
  },
  components: {
    'app-content': appContent
  },
  created() {
    console.log('-----')

  },
  methods: {
    showcontent(id) {
      this.showlist = false
      this.id = id
    }
  }
}