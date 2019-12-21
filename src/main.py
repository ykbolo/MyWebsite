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


class ChatroomHandler(WebSocketHandler):

    def reg(self, message):
        print('reg')
        # 重写open方法，当有新的聊天用户进入的时候自动触发该函数

    def open(self):
        # 当有新的用户上线，将该用户加入集合中
        print('open')
        # self.online_users.add(self)
        # # 将新用户加入的信息发送给所有的在线用户
        # for user in self.online_users:
        #     userName = self.get_cookie('user')
        #     msg = "加入聊天室"
        #     user.write_message(json.dumps({
        #         'type': 'sys',
        #                 'msg': msg
        #     }))

    # 重写on_message方法，当聊天消息有更新时自动触发的函数
    def on_message(self, message):

        message = json.loads(message)
        print(message)

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
