export default {
  name: 'snake',
  data() {
    return {
      snake: [],
      snakeCount: 6,
      food: 0,
      foodx: 0,
      foody: 0,
      togox: 3,
      ctx: {},
      pertime: 1000
    }
  },
  mounted() {
    let self = this
    window.onkeydown = function (e) {

      self.keydown(e);
    }
    var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");

    this.start();
    this.inter()
    this.interv = this.inter()

    this.drawtable();

  },
  methods: {
    inter() {
      setInterval(() => {
        this.move()
        console.log('循环')
      }, this.pertime)
    },
    drawtable() //画地图的函数
    {
      console.log('drawtable');
      for (var i = 0; i < 16; i++) //画竖线
      {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(15 * i, 0);
        this.ctx.lineTo(15 * i, 225);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      for (var j = 0; j < 16; j++) //画横线
      {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 15 * j);
        this.ctx.lineTo(225, 15 * j);
        this.ctx.closePath();
        this.ctx.stroke();
      }

      for (var k = 0; k < this.snakeCount; k++) //画蛇的身体
      {
        this.ctx.fillStyle = "#000";
        if (k == this.snakeCount - 1) {
          this.ctx.fillStyle = "red"; //蛇头的颜色与身体区分开
        }
        this.ctx.fillRect(this.snake[k].x, this.snake[k].y, 15, 15); //前两个数是矩形的起始坐标，后两个数是矩形的长宽。

      }
      //绘制食物	
      this.ctx.fillStyle = "orange";
      this.ctx.fillRect(this.foodx, this.foody, 15, 15);
      this.ctx.fill();

    }
    ,

    start() //定义蛇的坐标
    {
      //var snake =[];//定义一条蛇，画蛇的身体
      //var snakeCount = 6;//初始化蛇的长度
      console.log('start');
      for (var k = 0; k < this.snakeCount; k++) {
        this.snake[k] = { x: k * 15, y: 0 };

      }

      this.drawtable();
      this.addfood(); //在start中调用添加食物函数

    }
    ,
    addfood() {
      console.log('addfood');
      this.foodx = Math.floor(Math.random() * 15) * 15; //随机产生一个0-1之间的数
      this.foody = Math.floor(Math.random() * 15) * 15;

      for (var k = 0; k < this.snake; k++) {
        if (this.foodx == this.snake[k].x && this.foody == this.snake[k].y) //防止产生的随机食物落在蛇身上
        {
          this.addfood();
        }
      }


    }
    ,
    move(togo) {
      console.log('move')
      if (this.pertime > 100) {
        this.pertime = this.pertime - 50
      }
      if (togo) {
        this.togox = togo
      }
      var togoxx = togo ? togo : this.togox
      switch (togoxx) {
        case 1:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x - 15, y: this.snake[this.snakeCount - 1].y });
          break; //向左走
        case 2:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x, y: this.snake[this.snakeCount - 1].y - 15 });
          break;
        case 3:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x + 15, y: this.snake[this.snakeCount - 1].y });
          break;
        case 4:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x, y: this.snake[this.snakeCount - 1].y + 15 });
          break;
        case 5:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x - 15, y: this.snake[this.snakeCount - 1].y - 15 });
          break;
        case 6:
          this.snake.push({ x: this.snake[this.snakeCount - 1].x + 15, y: this.snake[this.snakeCount - 1].y + 15 });
          break;


      }
      this.snake.shift(); //删除数组第一个元素
      this.ctx.clearRect(0, 0, 450, 450); //清除画布重新绘制
      this.isEat();
      this.isDead();
      this.drawtable();
    }
    ,
    keydown(e) {
      switch (e.keyCode) {
        case 37:
          this.togo = 1;
          break;
        case 38:
          this.togo = 2;
          break;
        case 39:
          this.togo = 3;
          break;
        case 40:
          this.togo = 4;
          break;
        case 65:
          this.togo = 5;
          break;
        case 68:
          this.togo = 6;
          break;
      }
      this.move(this.togo)
    }
    ,
    isEat() //吃到食物后长度加1
    {
      console.log('isEat')
      if (this.snake[this.snakeCount - 1].x == this.foodx && this.snake[this.snakeCount - 1].y == this.foody) {
        this.addfood();
        this.snakeCount++;
        this.snake.unshift({ x: -15, y: -15 });
      }

    }
    ,
    isDead() {
      console.log('isDead')
      if (this.snake[this.snakeCount - 1].x >= 225 || this.snake[this.snakeCount - 1].y >= 225 || this.snake[this.snakeCount - 1].x < 0 || this.snake[this.snakeCount - 1].y < 0) {
        setTimeout(() => {
          window.location.reload()
        }, 20)

        // clearInterval(this.interv);
      }
    }
  }
}