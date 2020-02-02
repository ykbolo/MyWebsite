# 基于 websocket 实现双人小游戏

### 时间： _2019.01.08_

#### --->[游戏入口](http://ezreal-yk.cn/share?_blank) <---

#### --->[ppt 下载](http://ezreal-yk.cn/share.pptx?_blank) <---

## 采用技术

- HTML5
- WebSocket
- Vue
- Python

## 游戏规则

适合玩家人数：2

- 分为猎人和猎物,游戏区随机生成若干个隐形的陷阱
- 踩到陷阱者失败,抓到猎物则猎人获胜
- 猎人和猎物均可根据提示自由移动
- 两者之间的距离以及周围陷阱个数作为这场比赛的重要参照

## 游戏截图

![avatar](../../../mds/game/1/1.bmp)
![avatar](../../../mds/game/1/2.bmp)
![avatar](../../../mds/game/1/3.bmp)
![avatar](../../../mds/game/1/4.bmp)

## 前端代码

### index.vue

```
  <template>

  <div class="game">
    <div v-if="showChoose">
      <div @click="setName(1)"><button>猎人</button></div>
      <div @click="setName(2)"><button>猎物</button></div>
    </div>
    <div v-else>

      <div class="row">
        <div class="biaozhu col-4">
          <span class="biaozhu-title ishunter"></span>
          <span class="biaozhu-desc">猎人</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title iscat"></span>
          <span class="biaozhu-desc">猎物</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isboom"></span>
          <span class="biaozhu-desc">炸弹</span>
        </div>
      </div>
      <div class="row">
        <div class="biaozhu col-4">
          <span class="biaozhu-title issafe"></span>
          <span class="biaozhu-desc">绝对安全区</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isunknown"></span>
          <span class="biaozhu-desc">危险区</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isopen"></span>
          <span class="biaozhu-desc">走过的路径</span>
        </div>
      </div>
      <div v-if="!isgameover">
        <table>
          <tbody>
            <tr v-for="(item,index) in table">
              <td v-for="(value,idx) in item"><span v-bind:class="{ issafe:value.issafe,isopen: value.isopen,iscat:value.iscat,ishunter: value.ishunter,isboom:(value.isboom && (isgameover || isvip) && !value.ishunter && !value.iscat) }"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="errmess" @click="refresh()">{{gameovermessage}},点击退出</div>
    </div>
    <div v-if="isvip===false">
      <div class="controller">
        <div style="display:inline-block">
          <div class="row">
            <span class="shang" @click="move('up')">↑</span>
            <div class="col-12">
              <span class="zuo" @click="move('left')">←</span>
              <span class="xia margin-l-5px" @click="move('down')">↓</span>
              <span class="you margin-l-5px" @click="move('right')">→</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tip margin-t-1x" v-if="username==='hunter'">
        <div><span class="tip-title isboom"></span><span class="tip-desc">距离猎物还有<em>{{distance}}</em>步</span></div>
        <div><span class="tip-title isboom"></span><span class="tip-desc">周围雷数<em>{{boomCount}}</em></span></div>
      </div>

      <div class="tip margin-t-1x" v-else>
        <div><span class="tip-title isboom"></span><span class="tip-desc">距离被抓还有<em>{{distance}}</em>步</span></div>
        <div><span class="tip-title isboom"></span><span class="tip-desc">周围雷数<em>{{boomCount}}</em></span></div>
      </div>
      <p>
      </p>
    </div>
    <div v-else class="rule-title margin-t-1x">你当前是观察者</div>
    <div class="rule-title margin-t-1x">游戏规则</div>
    <div class="rule-desc margin-t-1x">分为<em>猎人</em>和<em>猎物</em><br>
      随机生成若干个陷阱，踩到陷阱者失败,抓到猎物则猎人获胜<br>
      <em>猎人和猎物均可根据提示自由移动</em><br>
      <em>两者之间的距离</em>以及<em>周围陷阱个数</em>作为这场比赛的重要参照
    </div>
  </div>
</template>

<script src="./component.js">

</script>
<style lang="scss" src="./style.scss"></style>


```

### component.js

```

export default {
  name: 'share',
  data() {
    return {
      showChoose: true, // 是否显示选择界面
      username: '', // 当前用户的用户名
      rowValue: 15, // 表格行数
      colValue: 15, // 表格列数
      table: [], // 存放每个格子的各项数据
      current_position: {
        x: 0,
        y: 0
      }, // 当前用户所在的坐标
      distance: '*', // 猎人和猎物的距离
      boomCount: 0, // 当前所在位置周围炸弹的数量
      boomList: [], // 存放炸弹随机数的列表
      isgameover: false, // 游戏是否结束,
      isvip: false,
      gameovermessage: ''
    }
  },

  methods: {
    // 选择角色的点击事件
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
    },
    init: function () {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        // 实例化socket
        this.socket = new WebSocket('ws://192.144.235.129:8880/game')
        // this.socket = new WebSocket('ws://127.0.0.1:8880/game')
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    // 初始化游戏区的数据
    initTable: function () {
      // let tb_pos = this.table[this.current_position.x][this.current_position.y] // 用于定位当前的位置所在的格子
      for (var i = 0; i < 15; i++) {
        this.table.push([])
        for (var j = 0; j < 15; j++) {
          this.table[i].push({
            isopen: false, // 是否走过该路径
            ishunter: 0, // 是否是猎人所在的格子
            isboom: 0, // 是否是雷
            iscat: 0, // 是否是猎物所在的格子
            value: 0, // 当前格子周围炸弹的数量
            issafe: false // 是否是安全区--由排雷函数计算得知
          })
        }
      }
      let tb_pos = this.table[this.current_position.x][this.current_position.y] // 用于定位当前的位置所在的格子
      tb_pos.isopen = 1
      //console.log(this.username)
      if (this.username == "hunter") {
        tb_pos.ishunter = 1
      } else if (this.username == "cat") {
        //console.log('cat')
        tb_pos.iscat = 1
      } else {
        //console.log('观察')
      }
    },
    // 移动函数
    move(direction) {
      if (!this.isgameover && !this.isvip) {


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
        let tb_pos = this.table[this.current_position.x][this.current_position.y] // 赋值改变后的定位
        //console.log(this.current_position)
        this.Open(this.current_position.x, this.current_position.y, this.rowValue, this.colValue)
        tb_pos.isopen = true
        if (this.username === "hunter") {
          tb_pos.ishunter = 1
        } else if (this.username === "cat") {
          tb_pos.iscat = 1
        } else {
          //console.log('观察者')
        }

        var msg = {
          current_position: this.current_position,
          username: this.username,
          type: 'position'
        }
        console.log(msg)
        this.boomCount = tb_pos.value
        this.socket.send(JSON.stringify(msg))
      }
    },
    // 用于把随机生成的雷插到游戏区内部
    insertBoom() {
      // console.log(this.boomList)
      var count = 0
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          for (var k = 0; k < this.boomList.length; k++) {
            if (this.colValue * i + j === this.boomList[k]) {
              count++
              // console.log(count)
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
      console.log("连接错误")
    },
    getMessage: function (msg) {
      var data = JSON.parse(msg.data)
      // //console.log(data)
      if (data.type === 'distance') {
        this.distance = data.distance
        // //console.log(this.distance)
        if (this.distance === 0) {
          // this.message = '猎人抓到了猎物'
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
            this.gameovermessage = data.to_cat
            // window.location.reload()
          } else if (this.username === 'hunter') {
            this.gameovermessage = data.to_hunter
            // window.location.reload()
          }
          if (data.loser === 'cat') {
            this.table[data.pos.x][data.pos.y].iscat = 1
          } else if (data.loser === 'hunter') {
            this.table[data.pos.x][data.pos.y].ishunter = 1
          }

        } else if (data.code === 1) {
          if (this.username === 'cat') {
            this.gameovermessage = data.to_cat
          } else if (this.username === 'hunter') {
            this.gameovermessage = data.to_hunter
          } else {
            this.gameovermessage = '猎人抓到了猎物'
          }
        }
      } else if (data.type === 'isvip_set') {
        console.log(data)
        this.isvip = true
        this.username = 'vip'
        this.table[data.hunter_pos.x][data.hunter_pos.y].ishunter = 1
        this.table[data.cat_pos.x][data.cat_pos.y].iscat = 1
      } else if (data.type === 'isvip' && this.isvip === true) {
        console.log(data)
        this.table[data.hunter_pos.x][data.hunter_pos.y].ishunter = 1
        this.table[data.cat_pos.x][data.cat_pos.y].iscat = 1
        // 不必知道移动前的位置，把它上一步的残影清空先
        for (var a1 = data.hunter_pos.x - 1; a1 <= data.hunter_pos.x + 1; a1++) {
          for (var b1 = data.hunter_pos.y - 1; b1 <= data.hunter_pos.y + 1; b1++) {
            if (this.isArea(a1, b1, this.rowValue, this.colValue)) {
              this.table[a1][b1].ishunter = 0
              this.table[a1][b1].iscat = 0
            }
          }
        }
        for (var a2 = data.cat_pos.x - 1; a2 <= data.cat_pos.x + 1; a2++) {
          for (var b2 = data.cat_pos.y - 1; b2 <= data.cat_pos.y + 1; b2++) {
            if (this.isArea(a2, b2, this.rowValue, this.colValue)) {
              this.table[a2][b2].ishunter = 0
              this.table[a2][b2].iscat = 0
            }
          }
        }
        this.table[data.hunter_pos.x][data.hunter_pos.y].ishunter = 1
        this.table[data.cat_pos.x][data.cat_pos.y].iscat = 1
      }
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
          username: this.username,
          current_position: this.current_position
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
    },
    refresh() {
      window.location.reload()
    }

  },
  mounted() {



  }
}
```

### style.scss

```
.margin-l-5px {
  margin-left: 5px;
}

em {
  color: #e40914;
  font-weight: 600;
  font-style: normal;
}

.game {
  text-align: center;

  .errmess {
    font-weight: 600;
    color: #E68442;
    cursor: pointer;
  }

  .biaozhu {
    .biaozhu-title {
      width: 25px;
      height: 25px;
      border: 1px solid #eeeeee;

      display: inline-block;

      &.issafe {
        background: #3431d698;
      }

      &.isboom {
        background: url(./image/boom.png) no-repeat center 50% !important;
        background-size: 25px 25px !important;
      }

      &.ishunter {
        background: url(./image/hunter.png) no-repeat center 50% !important;
        background-size: 25px 25px !important;
      }

      &.iscat {
        background: url(./image/cat.png) no-repeat center 50% !important;
        background-size: 25px 25px !important;
      }

      &.isopen {
        background: #ffffff;

      }

      &.isunknown {
        background: #333333;
      }
    }

    .biaozhu-desc {
      font-size: 14px;
      color: rgb(126, 86, 13);
      position: relative;
      top: -5px;

    }
  }

  .tip {
    text-align: center;

    .tip-title {
      width: 25px;
      height: 25px;
      border: 1px solid #eeeeee;

      display: inline-block;

      &.isboom {
        background: url(./image/boom.png) no-repeat center 50% !important;
        background-size: 25px 25px !important;
      }
    }

    .tip-desc {
      font-size: 14px;
      color: rgb(126, 86, 13);
      position: relative;
      top: -5px;
    }
  }

  .rule-title {
    border: 2px solid rgb(17, 160, 204);
    padding: 3px;
    color: #333333;
    font-weight: 600;
    font-size: 1.2em;
  }

  table {
    width: 100%;
    height: auto;

    td {
      width: 10px;
      height: 25px;
      border: 1px solid #eeeeee;
      position: relative;

      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: #333333;
      }

      .isopen {
        background: #ffffff !important;
      }

      .ishunter {
        background: url(./image/hunter.png) no-repeat center 50% !important;

        background-size: contain !important;
      }

      .isboom {
        background: url(./image/boom.png) no-repeat center 50% !important;
        background-size: contain !important;
      }

      .iscat {
        background: url(./image/cat.png) no-repeat center 50% !important;
        background-size: contain !important;
      }

      .issafe {
        background: #3431d698;
      }
    }
  }

  .controller {
    margin-top: 30px;
    text-align: center;
    position: relative;

    .shang {
      position: relative;
      left: 65px;
      bottom: 5px;
    }

    span {
      display: inline-block;
      font-size: 1.2em;
      width: 30px;
      height: 30px;
      border: 1px solid #333333;
    }

    .col-12 {
      span {
        display: inline-block;
      }
    }
  }
}

```

## 后端代码

### main.py

```

import time
import tornado.escape
import tornado.ioloop
import tornado.web
import uuid
import json
import random
from tornado import gen
from tornado.options import define, options, parse_command_line
from tornado.websocket import WebSocketHandler
'''
  tornado.web 包括Web框架大部分主要功能，包括RequestHandler和Application类。
  tornado.httpserver一个无阻塞HTTP服务器的实现
  tornado.escape HTML、JSON、URLs等编码解码和字符串操作
  tornado.ioloop 核心IO循环
  tornado.websocket实现和浏览器的双向通信
  tornado.options解析终端参数
'''
define("port", default=8880, help="run on the given port", type=int)
define("debug", default=False, help="run in debug mode")
boomList = [] # 生成炸弹的列表
pos_cat={'x':14,'y':14} # 猎物的初始位置
pos_hunter={'x':0,'y':0} # 猎人的初始位置

class ChatroomHandler(WebSocketHandler):
    online_users = set()
    global boomList # 声明全局变量
    # 生成随机数，若生成重复数字或者在npc的位置上，重新生成
    def createBoom(self,rowValue,colValue,count):
        global pos_cat
        global pos_hunter
        if count == 0:
            return
        else:
            rand = random.randint(0,rowValue*colValue-1)
            for x in boomList:
                if x == rand or rand== pos_cat['x']*colValue+pos_cat['y'] or rand== pos_hunter['x']*colValue+pos_hunter['y']:
                    return createBoom(rowValue,colValue,count)
        boomList.append(rand)
        # print(count-1)
        return self.createBoom(rowValue,colValue,count-1)
    # 计算cat和hunter之间最短距离的函数，算法是 sum=|y1-y2|+|x1-x2|
    def cal_distance(self):
        global pos_cat
        global pos_hunter
        row_dis = abs(pos_cat['x']-pos_hunter['x'])
        col_dis = abs(pos_cat['y']-pos_hunter['y'])
        print('cat_pos')
        print(pos_cat)
        print('hunter_pos')
        print(pos_hunter)
        distance = row_dis+col_dis
        print(distance)
        return distance

    # 重写open方法，当有新的聊天用户进入的时候自动触发该函数
    def open(self):
        global pos_cat
        global pos_hunter
        # print(len(self.online_users))
        # 每当有客户端连接，则增加一个对象==当有新的用户上线，将该用户加入集合中
        global boomList
        self.online_users.add(self)
        print(self.online_users)
        if len(self.online_users) == 1:
            boomList=[]
            self.createBoom(15,15,20)

        for user in self.online_users:
            # 告诉每个用户炸弹随机数列表
            user.write_message(json.dumps({
              'type':'boomList',
              'boomList':boomList
            }))
            user.write_message(json.dumps({
              'type':'user_num',
              'user_num':len(self.online_users)
            }))
        if len(self.online_users)>2:
            self.write_message(json.dumps({
              'type':'isvip_set',
              'cat_pos':pos_cat,
              'hunter_pos':pos_hunter
            }))
        print(self.online_users)
    # on_message方法，当客户端有消息传来后，则
    def on_message(self, message):
        global pos_cat
        global pos_hunter
        message = json.loads(message)
        if message['type'] == 'position':
            # 设置前端传来的npc位置
            if message['username'] == 'hunter':
                print('hunter')
                pos_hunter = message['current_position']
            elif message['username'] == 'cat':
                print('cat')
                pos_cat = message['current_position']
            else:
                return
            distance = self.cal_distance() # 计算距离
            # print('distance',distance)
            for user in self.online_users:
                # 把距离，npc位置发送给前端
                user.write_message(json.dumps({
                    'type': 'distance',
                    'distance': distance
                }))
                user.write_message(json.dumps({
                    'type': 'cat_pos',
                    'cat_pos': pos_cat
                }))
                user.write_message(json.dumps({
                    'type': 'cat_hunter',
                    'hunter_pos': pos_hunter
                }))
                user.write_message(json.dumps({
                    'type':'isvip',
                    'cat_pos':pos_cat,
                    'hunter_pos':pos_hunter
                }))

        elif message['type'] == 'gameover':
          # 前端传来游戏结束的消息
          if message['code']==0:
            # 踩到炸弹的情况
            if message['username']=='hunter':
              # 猎人踩到炸弹
              for user in self.online_users:
                user.write_message(json.dumps({
                  'type':'gameover',
                  'to_hunter':'你踩到了炸弹，任务失败',
                  'to_cat':'猎人踩到了炸弹，你安全了',
                  'code':0,
                  'pos':message['current_position'],
                  'loser':message['username'] # 发送是谁踩到了
                }))
            elif message['username']=='cat':
              # 猎物踩到炸弹
              for user in self.online_users:
                user.write_message(json.dumps({
                  'type':'gameover',
                  'to_hunter':'猎物踩到了炸弹，你可以饱餐一顿了',
                  'to_cat':'你踩到了炸弹，要被吃了噢',
                  'code':0,
                  'pos':message['current_position'],
                  'loser':message['username'] # 发送是谁踩到了
                }))

          elif message['code']==1:
            # 被猎人抓到的情况
            for user in self.online_users:
              user.write_message(json.dumps({
                'type':'gameover',
                'to_hunter':'恭喜你成功抓到了猎物',
                'to_cat':'猎人把你吃了噢',
                'code':1
              }))

    def on_close(self):
        print('close')
        global pos_cat
        global pos_hunter
        self.online_users.remove(self)
        if len(self.online_users) == 0:
          pos_cat = {'x':14,'y':14}
          pos_hunter = {'x':0,'y':0}


    def post(self):
        self.render("logout.html")

    # 设置为true,这样可以允许其他ip访问
    def check_origin(self, origin):
        return True


# 路由的设置
class Application(tornado.web.Application):
    def _init_(self, *args, **kwargs):
        super(Application, self)._init_(*args, **kwargs)
        self.db = tornado.Connection(
            host="127.0.0.1",
            database="itcast",
            user="root",
            password="mysql"
        )


# 主函数
if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application([
        (r"/game", ChatroomHandler)
    ],
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

```

### ->[游戏入口](http://ezreal-yk.cn/share)<-
