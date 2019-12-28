import $ from 'jquery'
import marked from 'mark'
import fs from 'fs'
import bodyParser from 'body-parser'

export default {
  name: 'app-content',
  props: [
    'id',
    'type'

  ],
  mounted() {
    console.log('-----')
    console.log(this.id)
    this.getHtml()
  },
  methods: {
    back() {
      window.location.href = '/list'

    },
    getHtml() {
      var article = document.getElementById('article');

      $.ajax({
        url: "/getMdFile", success: function (result) {
          console.log('数据获取成功');
          article.innerHTML = JSON.parse(result).body;
        }, error: function (err) {
          console.log(err);
          article.innerHTML = '<p>获取数据失败</p>';
        }
      });
    }
  }
}