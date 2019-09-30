/* eslint-disable */
import service from '../../service/test'
import _ from 'lodash'
import Axios from 'axios'
export default {
  name: 'about-me',
  data() {
    return {
      username: 'yangkang',
      password: '123'
    }
  },
  mounted() {
    Axios.post('http://localhost:7777/test', { username: this.username, password: this.password }).then(res => {
      console.log(res)
    })
  }
}