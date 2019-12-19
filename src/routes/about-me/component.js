// import WebSocket from "vue-websocket";
import $ from 'jquery'
export default {
  data() {
    return {

      username: 'yk'
    }
  },

  methods: {
    // sendMsg: function (msg) {
    //   this._websocket.send(msg)
    // },
    sender: function () {
      var msg = {
        type: "msg",
        username: "yk",
        content: "msg" //发送消息
      }
      this._websocket.send(JSON.stringify(msg));
      // this.sendMsg(msg);
      $("#msg").val('');
    },
    // sendMsg:function () {
    //   this._websocket.send(msg)
    // }
  },
  mounted() {
    var _websocket = new WebSocket('ws://127.0.0.1:8880/game')
    setTimeout(function () {
      var msg = {
        type: "msg",
        username: "yk",
        content: "msg" //发送消息
      }
      _websocket.send(JSON.stringify(msg))
      console.log(JSON.stringify(msg))
    }, 5000
    )
  }
}