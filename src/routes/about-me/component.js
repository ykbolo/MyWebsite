import e from "cors"

// import WebSocket from "vue-websocket";
// import $ from 'jquery'
// import { schemeGnBu } from 'd3'

export default {
  name: 'about-me',
  data() {
    return {
      showChoose: true,
      npccolor: 'white',
      username: '',
      table: [],
      current_position: {
        x: 0,
        y: 0
      },
      distance: '*'
    }
  },

  methods: {
    setName(type) {
      if (type === 1) {
        this.username = "hunter"
      } else {
        this.username = "cat"
      }
      this.showChoose = false
      this.initTable()
      this.createBoom()
    },
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
            ishunter: 0,
            isboom: 0,
            isgift: 0,
            iscat: 0
          })
        }
      }
      this.table[this.current_position.x][this.current_position.y].isopen = 1
      console.log(this.username)
      if (this.username == "hunter") {
        this.table[this.current_position.x][this.current_position.y].ishunter = 1
      } else if (this.username == "cat") {
        console.log('cat')
        this.table[this.current_position.x][this.current_position.y].iscat = 1
      } else {
        console.log('观察')
      }

      console.log(this.table)
    },
    move(direction) {
      let table_ishunter_pos = this.table[this.current_position.x][this.current_position.y]
      if (direction === "left" && this.current_position.y > 0) {
        table_ishunter_pos.iscat = 0
        table_ishunter_pos.ishunter = 0
        this.current_position.y = this.current_position.y - 1
      } else if (direction === "right" && this.current_position.y < 14) {
        table_ishunter_pos.iscat = 0
        table_ishunter_pos.ishunter = 0
        this.current_position.y = this.current_position.y + 1
      } else if (direction === "up" && this.current_position.x > 0) {
        table_ishunter_pos.iscat = 0
        table_ishunter_pos.ishunter = 0
        this.current_position.x = this.current_position.x - 1
      } else if (direction === "down" && this.current_position.x < 14) {
        table_ishunter_pos.iscat = 0
        table_ishunter_pos.ishunter = 0
        this.current_position.x = this.current_position.x + 1
      } else {
        return
      }
      console.log(this.current_position)
      this.table[this.current_position.x][this.current_position.y].isopen = 1
      if (this.username === "hunter") {
        this.table[this.current_position.x][this.current_position.y].ishunter = 1
      } else if (this.username === "cat") {
        this.table[this.current_position.x][this.current_position.y].iscat = 1
      } else {
        console.log('观察者')
      }

      var msg = {
        current_position: this.current_position,
        username: this.username,
        type: 'position'
      }
      this.socket.send(JSON.stringify(msg))
    },
    createBoom: function () {
      this.table[2][3].isboom = 1
      this.table[2][5].isboom = 1
    },
    open: function () {
      console.log("socket连接成功")
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function (msg) {
      var data = JSON.parse(msg.data)
      // console.log(data)
      if (data.type === 'distance') {
        this.distance = data.distance
        // console.log(this.distance)
      } else if (data.type === 'cat_pos') {
        console.log(data.cat_pos)
        console.log('---')
      } else if (data.type === 'hunter_pos') {
        console.log(data.cat_pos)
        console.log('---')
      }

    },
    send: function (msg) {
      this.socket.send(JSON.stringify(msg))
    },
    close: function () {
      console.log("socket已经关闭")
    }

  },
  mounted() {
    this.init()


  }
}