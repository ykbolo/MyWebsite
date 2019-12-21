// import WebSocket from "vue-websocket";
import $ from 'jquery'
import { thresholdScott } from 'd3'

export default {
  name: 'about-me',
  data() {
    return {
      username: 'yk',
      table: [],
      current_position: {
        x: 0,
        y: 0
      }
    }
  },

  methods: {
    init: function () {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        // 实例化socket
        this.socket = new WebSocket('ws://127.0.0.1:8880/game')
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    initTable: function () {
      for (var i = 0; i < 15; i++) {
        this.table.push([])
        for (var j = 0; j < 15; j++) {
          this.table[i].push({
            isopen: 0,
            isuser: 0,
            isblock: 0,
            isgift: 0
          })
        }
      }
      this.table[this.current_position.x][this.current_position.y].isopen = 1
      this.table[this.current_position.x][this.current_position.y].isuser = 1
      console.log(this.table)
    },
    move(direction) {
      let table_isuser_pos = this.table[this.current_position.x][this.current_position.y]
      if (direction === "left" && this.current_position.y > 0) {
        table_isuser_pos.isuser = 0
        this.current_position.y = this.current_position.y - 1
      } else if (direction === "right" && this.current_position.y < 14) {
        table_isuser_pos.isuser = 0
        this.current_position.y = this.current_position.y + 1
      } else if (direction === "up" && this.current_position.x > 0) {
        table_isuser_pos.isuser = 0
        this.current_position.x = this.current_position.x - 1
      } else if (direction === "down" && this.current_position.x < 14) {
        table_isuser_pos.isuser = 0
        this.current_position.x = this.current_position.x + 1
      } else {

        return
      }
      console.log(this.current_position)
      this.table[this.current_position.x][this.current_position.y].isopen = 1
      this.table[this.current_position.x][this.current_position.y].isuser = 1
    },
    open: function () {
      console.log("socket连接成功")
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function (msg) {
      console.log(msg.data)
    },
    send: function () {
      var msg = {
        type: "msg",
        username: "yk",
        content: "msg2" //发送消息
      }
      this.socket.send(JSON.stringify(msg))
    },
    close: function () {
      console.log("socket已经关闭")
    }

  },
  mounted() {
    this.init()
    this.initTable()
  }
}