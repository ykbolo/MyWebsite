import $ from 'jquery'
// import marked from 'mark'
// import fs from 'fs'
// import bodyParser from 'body-parser'

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

    window.addEventListener("popstate", () => {
      alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
      console.log(this.type)
      alert(this.type)
      window.location.href = `/list/${this.type}`
    }, false);
  },
  methods: {
    back() {
      window.location.href = '/list' + this.type

    },
    getHtml() {
      var article = document.getElementById('article');

      $.ajax({
        url: "/getMdFile",
        type: "get",
        data: "id=" + this.id + "&type=" + this.type,
        success: function (result) {
          console.log('数据获取成功');
          article.innerHTML = JSON.parse(result).body;
        },
        error: function (err) {
          console.log(err);
          article.innerHTML = '<p>获取数据失败</p>';
        }
      });
    }
  }
}