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
boomList = [] # 生成炸弹的列表
pos_cat={'x':14,'y':14} # 猎物的初始位置
pos_hunter={'x':0,'y':0} # 猎人的初始位置
online_users = []
class ChatroomHandler(WebSocketHandler):
    # global 
    # global boomList 
    # 声明全局变量
    # 生成随机数，若生成重复数字或者在npc的位置上，重新生成
    def createBoom(self,rowValue,colValue,count): 
        global pos_cat
        global pos_hunter
        global boomList
        if count == 0:
            return
        else:
            rand = random.randint(0,rowValue*colValue-1)
            for x in boomList:
                if x == rand or rand== pos_cat['x']*colValue+pos_cat['y'] or rand== pos_hunter['x']*colValue+pos_hunter['y']:
                    return self.createBoom(rowValue,colValue,count)
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
        global online_users
        # print(len())
        # 每当有客户端连接，则增加一个对象==当有新的用户上线，将该用户加入集合中
        global boomList
        online_users.append(self)
        print(online_users)
        if len(online_users) == 1:
            boomList=[]
            self.createBoom(15,15,20)
        
        for user in online_users:
            # 告诉每个用户炸弹随机数列表
            user.write_message(json.dumps({
              'type':'boomList',
              'boomList':boomList
            }))
            user.write_message(json.dumps({
              'type':'user_num',
              'user_num':len(online_users)
            }))
        if len(online_users)>2:
            self.write_message(json.dumps({
              'type':'isvip_set',
              'cat_pos':pos_cat,
              'hunter_pos':pos_hunter
            }))
        print(online_users)
    # on_message方法，当客户端有消息传来后，则
    def on_message(self, message):
        global pos_cat
        global pos_hunter
        global online_users
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
            for user in online_users:
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
              for user in online_users:
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
              for user in online_users:
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
            for user in online_users:
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
        global online_users
        online_users=[]
        if len(online_users) == 0:
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
