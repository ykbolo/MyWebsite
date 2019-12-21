import logging
import time
import tornado.escape
import tornado.ioloop
import tornado.web

import uuid
import json
from tornado.concurrent import Future
from tornado import gen
from tornado.options import define, options, parse_command_line
from tornado.websocket import WebSocketHandler

define("port", default=8880, help="run on the given port", type=int)
define("debug", default=False, help="run in debug mode")
pos_cat = {'x': 5, 'y': 5}
pos_hunter = {'x': 0, 'y': 0}


class ChatroomHandler(WebSocketHandler):
    online_users = set()

    def cal_distance(self):
        print(pos_cat)
        print(pos_hunter)
        row_dis = abs(pos_cat['x']-pos_hunter['x'])
        col_dis = abs(pos_cat['y']-pos_hunter['y'])
        distance = row_dis+col_dis
        print(distance)
        return distance

    def reg(self, message):
        print('reg')
        # 重写open方法，当有新的聊天用户进入的时候自动触发该函数

    def open(self):
        # 当有新的用户上线，将该用户加入集合中

        self.online_users.add(self)
        # 将新用户加入的信息发送给所有的在线用户

    # 重写on_message方法，当聊天消息有更新时自动触发的函数
    def on_message(self, message):
        global pos_hunter
        global pos_cat
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
            print(pos_hunter)
            print(pos_cat)

    def on_close(self):
        print('close')
        # post方法

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
