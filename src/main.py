# import logging
import time
import tornado.escape
import tornado.ioloop
import tornado.web
import uuid
import json

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

class ChatroomHandler(WebSocketHandler):
    online_users = set()
    pos_cat={'x':1,'y':5}
    pos_hunter={'x':1,'y':5}
    def cal_distance(self):
        row_dis = abs(self.pos_cat['x']-self.pos_hunter['x'])
        col_dis = abs(self.pos_cat['y']-self.pos_hunter['y'])
        distance = row_dis+col_dis
        print(distance)
        return distance

    def reg(self, message):
        print('reg')
        # 重写open方法，当有新的聊天用户进入的时候自动触发该函数

    def open(self):
        # 每当有客户端连接，则增加一个对象==当有新的用户上线，将该用户加入集合中
        self.online_users.add(self)

    # on_message方法，当客户端有消息传来后，则
    def on_message(self, message):
        message = json.loads(message)
        if message['type'] == 'position':
            if message['username'] == 'hunter':
                print('hunter')
                self.pos_hunter = message['current_position']
            elif message['username'] == 'cat':
                print('cat')
                self.pos_cat = message['current_position']
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
                    'cat_pos': self.pos_cat
                }))
                user.write_message(json.dumps({
                    'type': 'cat_hunter',
                    'hunter_pos': self.pos_hunter
                }))
            # print(pos_hunter)
            # print(pos_cat)

    def on_close(self):
        print('close')
        # 当有用户退出时，将它移除克！
        self.online_users.remove(self)


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
