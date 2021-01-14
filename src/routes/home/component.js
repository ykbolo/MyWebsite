// import '../../../public/photos'
export default {
    data() {
        return {
            imgurl: '',
            index: 1
        }
    },
    components: {},
    methods: {

    },
    mounted() {
        // this.play(5)
        // this.imgurl = '/'
        // setInterval(() => {
        //     let randomNum = Math.ceil(Math.random() * 100)
        //     this.imgurl = `../../../public/photos/${randomNum}.jpg`
        // }, 2000)
    },
    methods: {
        play(num) {
            //生成num个div
            for (var i = 0; i < num; i++) {
                var Div = document.createElement("div");
                Div.className = "ball";
                Div.leftVal = 0.1 * (3 + i); //预存每个球的初始速度
                Div.topVal = 0.1 * (3 + i) //预存每个球的初始速度
                Div.style.backgroundColor = randomC();
                document.getElementsByClassName("home").appendChild(Div);
            }

            var aBall = document.querySelectorAll(".ball");
            var maxTop = document.documentElement.clientHeight - aBall[0].clientHeight, //获取top的最大值
                maxLeft = document.documentElement.clientWidth - aBall[0].clientWidth; //获取left的最大值

            window.onresize = function() {
                maxTop = document.documentElement.clientHeight - aBall[0].clientHeight; //获取top的最大值
                maxLeft = document.documentElement.clientWidth - aBall[0].clientWidth; //
            };

            auto();

            function auto() {
                for (var i = 0; i < num; i++) {
                    var Ball = aBall[i],
                        startL = Ball.offsetLeft, //取每个球的初始left和TOP值
                        startT = Ball.offsetTop, //取每个球的初始left和TOP值
                        Left = startL + Ball.leftVal, //改变，每个球的left和top值
                        Top = startT + Ball.topVal; //改变，每个球的left和top值


                    if (Left >= maxLeft || Left <= 0) {
                        Left = Math.min(Left, maxLeft); //限制Left的最大值
                        Left = Math.max(Left, 0); //限制最小值

                        Ball.leftVal = -Ball.leftVal;
                        Ball.style.backgroundColor = randomC();

                    }
                    if (Top >= maxTop || Top <= 0) {
                        Ball.topVal = -Ball.topVal;

                        Top = Math.min(Top, maxTop); //限制Left的最大值
                        Top = Math.max(Top, 0); //限制最小值
                        Ball.style.backgroundColor = randomC();
                    }


                    Ball.style.top = Top + "px";
                    Ball.style.left = Left + "px";
                }
                requestAnimationFrame(auto)

            }
            // rgb(0-255)
            function randomC() {
                var r = Math.floor(Math.random() * 256),
                    g = Math.floor(Math.random() * 256),
                    b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

        }

    }
}