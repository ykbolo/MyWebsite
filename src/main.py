# import logging
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
boomList = []
pos_cat={'x':14,'y':14}
pos_hunter={'x':0,'y':0}
class ChatroomHandler(WebSocketHandler):
    online_users = set()
    
    global boomList
    
    def createBoom(self,rowValue,colValue,count):
        global pos_cat
        global pos_hunter
        if count == 0:
            return
        else:
            rand = random.randint(0,rowValue*colValue-1)
            for x in boomList:
                if x == rand and rand== pos_cat['x']*colValue+pos_cat['y'] and rand== pos_hunter['x']*colValue+pos_hunter['y']:
                    return createBoom(rowValue,colValue,count)
        boomList.append(rand)
        # print(count-1)
        return self.createBoom(rowValue,colValue,count-1)
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

    def reg(self, message):
        print('reg')
        # 重写open方法，当有新的聊天用户进入的时候自动触发该函数

    def open(self):
        global pos_cat
        global pos_hunter
        print(len(self.online_users))
        # 每当有客户端连接，则增加一个对象==当有新的用户上线，将该用户加入集合中
        global boomList
        self.online_users.add(self)
        print(self.online_users)
        if len(self.online_users) == 1:
            boomList=[]
            self.createBoom(15,15,20)
            # print(self.boomList)
        for user in self.online_users:
            print('1')
            print(boomList)
            user.write_message(json.dumps({
              'type':'boomList',
              'boomList':boomList
            }))
            user.write_message(json.dumps({
                'type':'init_pos',
                'cat_pos':pos_cat,
                'hunter_pos':pos_hunter
            }))

    # on_message方法，当客户端有消息传来后，则
    def on_message(self, message):
        global pos_cat
        global pos_hunter
        message = json.loads(message)
        if message['type'] == 'position':
            if message['username'] == 'hunter':
                print('hunter')
                pos_hunter = message['current_position']
            elif message['username'] == 'cat':
                print('cat')
                pos_cat = message['current_position']
            else:
                return
            distance = self.cal_distance()
            print('distance',distance)
            for user in self.online_users:
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
            # print(pos_hunter)
            # print(pos_cat)
        elif message['type'] == 'gameover':
          if message['code']==0:
            if message['username']=='hunter':
              for user in self.online_users:
                user.write_message(json.dumps({
                  'type':'gameover',
                  'to_hunter':'你踩到了炸弹，任务失败',
                  'to_cat':'猎人踩到了炸弹，你安全了',
                  'code':0,
                  'pos':message['current_position'],
                  'loser':message['username']
                }))
            elif message['username']=='cat':
              for user in self.online_users:
                user.write_message(json.dumps({
                  'type':'gameover',
                  'to_hunter':'猎物踩到了炸弹，你可以饱餐一顿了',
                  'to_cat':'你踩到了炸弹，要被吃了噢',
                  'code':0
                }))
            
          elif message['code']==1:
            for user in self.online_users:
              user.write_message(json.dumps({
                'type':'gameover',
                'to_hunter':'恭喜你成功抓到了猎物',
                'to_cat':'猎人把你吃了噢',
                'code':1
              }))

    def on_close(self):
        print('close')
        # 当有用户退出时，将它移除克！
        self.online_users.remove(self)
        # print(len(self.online_users))
        # self.boomList = []
        # print('close')
        # print(self.boomList)

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
