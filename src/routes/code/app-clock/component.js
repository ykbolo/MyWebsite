export default {
  name: 'app-clock',
  mounted() {
    window.requestAnimationFrame(this.clock);
  },
  methods: {
    clock: function () {
      var now = new Date()
      var ctx = document.getElementById('canvas').getContext('2d')

      ctx.save()
      ctx.clearRect(0, 0, 1000, 1000)
      ctx.translate(200, 200)
      ctx.scale(0.4, 0.4)
      ctx.rotate(-Math.PI / 2)
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'white'
      ctx.lineWidth = 8
      ctx.lineCap = "round" //线段端点样式

      // hour marks
      ctx.save()
      // 相当于画20px的竖条
      for (var i = 0; i < 12; i++) {
        ctx.beginPath()
        ctx.rotate(Math.PI / 6)
        ctx.moveTo(100, 0)
        ctx.lineTo(120, 0)
        ctx.stroke()
      }
      ctx.restore()

      // minute marks
      ctx.save()
      ctx.lineWidth = 5
      ctx.strokeStyle = 'orange'
      for (i = 0; i < 60; i++) {
        if (i % 5 != 0) {
          ctx.beginPath()
          ctx.moveTo(117, 0)
          ctx.lineTo(120, 0)
          ctx.stroke()
        }
        ctx.rotate(Math.PI / 30)
      }
      ctx.restore()

      var sec = now.getSeconds()
      var min = now.getMinutes()
      var hr = now.getHours()
      hr = hr >= 12 ? hr - 12 : hr

      ctx.fillStyle = "black"
      // write Hours
      ctx.save();
      ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.restore();


      //write minutes
      ctx.save();
      ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(112, 0);
      ctx.stroke();
      ctx.restore();

      // Write seconds
      ctx.save();
      ctx.rotate(sec * Math.PI / 30);
      ctx.strokeStyle = "#D40000";
      ctx.fillStyle = "#D40000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(83, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();

      // 表框颜色
      ctx.beginPath();
      ctx.lineWidth = 14;
      ctx.strokeStyle = 'rgba(250,250,0,0.3)';
      ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fillStyle = "white"
      ctx.restore();

      ctx.lineWidth = 5
      //this.clockBlock(ctx)

      window.requestAnimationFrame(this.clock);
    },
    clockBlock: function (ctx) {
      for (let i = 0; i < 12; i++) {
        let arr = ['black', 'yellow', 'green', 'pansy', 'orange', 'grey', 'red', 'scarlet', 'purple', '#8B6914', '#8B1A1A', '#00C5CD']
        ctx.strokeStyle = arr[i];
        ctx.beginPath()
        let x = 200
        let y = 200
        let radius = 85 - 2 * i
        let startAngle = i * Math.PI / 6
        let endAngle = (i + 1) * Math.PI / 6
        let anticlockwise = true
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
        ctx.stroke()
      }
    }
  }
}