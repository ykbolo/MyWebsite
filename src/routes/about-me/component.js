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
      rowValue: 15,
      colValue: 15,
      table: [],
      current_position: {
        x: 0,
        y: 0
      },
      distance: '*',
      boomCount: 0,
      boomList: [],
      init_pos_cat: {},
      init_pos_hunter: {},
      isgameover: false,
      message: ''
    }
  },

  methods: {
    setName(type) {
      if (type === 1) {
        this.username = "hunter"
        this.current_position = { x: 0, y: 0 }
      } else {
        this.username = "cat"
        this.current_position = { x: 14, y: 14 }
      }
      this.showChoose = false
      this.init()
      this.initTable()
      // this.createBoom(this.rowValue, this.colValue, 20)

      console.log(this.table)
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
            isopen: false,
            ishunter: 0,
            isboom: 0,
            isgift: 0,
            iscat: 0,
            value: 0,
            issafe: false
          })
        }
      }
      this.table[this.current_position.x][this.current_position.y].isopen = 1
      //console.log(this.username)
      if (this.username == "hunter") {
        this.table[this.current_position.x][this.current_position.y].ishunter = 1
      } else if (this.username == "cat") {
        //console.log('cat')
        this.table[this.current_position.x][this.current_position.y].iscat = 1
      } else {
        //console.log('观察')
      }

      //console.log(this.table)
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
      //console.log(this.current_position)
      this.Open(this.current_position.x, this.current_position.y, this.rowValue, this.colValue)
      this.table[this.current_position.x][this.current_position.y].isopen = true
      if (this.username === "hunter") {
        this.table[this.current_position.x][this.current_position.y].ishunter = 1
      } else if (this.username === "cat") {
        this.table[this.current_position.x][this.current_position.y].iscat = 1
      } else {
        //console.log('观察者')
      }

      var msg = {
        current_position: this.current_position,
        username: this.username,
        type: 'position'
      }
      console.log(msg)
      this.boomCount = this.table[this.current_position.x][this.current_position.y].value
      this.socket.send(JSON.stringify(msg))
    },
    // createBoom(rowValue, colValue, count) {
    //   if (count == 0) {
    //     return 0;
    //   } else {
    //     var rand = Math.ceil(Math.random() * (rowValue * colValue - 1));
    //     for (var i = 0; i < this.boomList.length; i++) {
    //       if (this.boomList[i] == rand && this.current_position.x + this.current_position.y == rand) {
    //         return this.createBoom(rowValue, colValue, count);
    //       }
    //     }
    //     this.boomList.push(rand);

    //     return this.createBoom(rowValue, colValue, --count);
    //   }
    // },
    insertBoom() {
      console.log(this.boomList)
      var count = 0
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          for (var k = 0; k < this.boomList.length; k++) {
            if (this.colValue * i + j === this.boomList[k]) {
              count++
              console.log(count)
              this.table[i][j].isboom = 1
            }
          }
        }
      }
    },

    open: function () {
      console.log("socket连接成功")

    },
    error: function () {
      //console.log("连接错误")
    },
    getMessage: function (msg) {
      var data = JSON.parse(msg.data)
      // //console.log(data)
      if (data.type === 'distance') {
        this.distance = data.distance
        // //console.log(this.distance)
        if (this.distance === 0) {
          this.message = '猎人抓到了猎物'
          let msg = {
            type: 'gameover',
            code: 1
          }
          this.socket.send(JSON.stringify(msg))
        }
      } else if (data.type === 'cat_pos') {
        console.log(data.cat_pos)
        //console.log('---')
      } else if (data.type === 'hunter_pos') {
        console.log(data.cat_pos)
        //console.log('---')
      } else if (data.type === 'boomList') {
        console.log(data.boomList)
        for (var i = 0; i < data.boomList.length; i++) {
          this.boomList.push(data.boomList[i])
        }
        this.insertBoom()
        this.InsertCount(this.rowValue, this.colValue)
      } else if (data.type === 'gameover') {
        this.isgameover = true
        if (data.code === 0) {
          if (this.username === 'cat') {
            alert(data.to_cat)
          } else if (this.username === 'hunter') {
            alert(data.to_hunter)
          }
        } else if (data.code === 1) {
          if (this.username === 'cat') {
            alert(data.to_cat)
          } else if (this.username === 'hunter') {
            alert(data.hunter)
          }
        }
      }
      // } else if (data.type === 'init_pos') {
      //   console.log(data)
      //   this.init_pos_cat = data.cat_pos
      //   this.init_pos_hunter = data.hunter_pos
      //   // if (this.username === 'hunter') {
      //   //   this.current_position = data.hunter_pos
      //   // } else if (this.username === 'cat') {
      //   //   this.current_position = data.cat_pos
      //   // }

      // }

    },
    send: function (msg) {
      //this.socket.send(JSON.stringify(msg))
    },
    close: function () {
      //console.log("socket已经关闭")
    },
    // 定义是否在区域内的方法
    isArea(x, y, rowValue, colValue) {
      if (x >= 0 && x < rowValue && y >= 0 && y < colValue) {
        // console.log('true')
        return true;

      } else {
        // console.log('false')
        return false;

      }
    },
    //定义打开格子事件
    Open(x, y, rowValue, colValue) {
      if (this.table[x][y].isboom) {
        this.isgameover = true

        var msg = {
          type: 'gameover',
          code: 0,
          username: this.username
        }
        this.socket.send(JSON.stringify(msg))
        return;
      }
      this.table[x][y].issafe = true

      if (this.table[x][y].value > 0) {
        //console.log((x + 1).toString() + "行" + (y + 1).toString() + "列");
        return;
      }
      for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
          if (
            this.isArea(i, j, rowValue, colValue) &&
            !this.table[i][j].issafe && !this.table[i][j].isopen && !this.table[x][y].isboom
          ) {
            //如果没有打开过且不是雷，则打开它
            this.Open(i, j, rowValue, colValue);
          }
        }
      }
    },
    //将每个格子里面的数字插入到列表里面的方法
    InsertCount(rowValue, colValue) {
      console.log(rowValue, colValue)
      for (var x = 0; x < rowValue; x++) {
        for (var y = 0; y < colValue; y++) {
          if (this.isArea(x, y, rowValue, colValue) && (!this.table[x][y].isboom)
          ) {
            var count1 = 0;
            for (var i = x - 1; i <= x + 1; i++) {
              for (var j = y - 1; j <= y + 1; j++) {
                if (this.isArea(i, j, rowValue, colValue)) {

                  if (this.table[i][j].isboom) {
                    count1 = count1 + 1;
                  }
                }
              }
            }
            if (this.isArea(x, y, rowValue, colValue)) {
              this.table[x][y].value = count1
            }
          }
        }
      }
    }


  },
  mounted() {



  }
}