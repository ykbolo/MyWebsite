<template>
  <div class="app-tool">
    <div class="tool-main" :style="{display:tool?'':'none'}">
      <div class="box">
        <router-link :to="{name:'home'}">
          <img src="../imgs/首页.svg">
        </router-link>
      </div>
      <div class="box wechat" @click="showWX()"><img src="../imgs/微信.svg">
        <div class="aside" :style="{display:wx?'block':'none'}"><img src="../imgs/york杨康.jpg"></div>
      </div>
      <div class="box top"><img src="../imgs/置顶.svg"></div>
    </div>
    <div class="box hide" @click="showTool()" :style="{opacity:tool?'1':'0.3',border:tool?'':'none'}"><img :src=src></div>
  </div>
</template>
<script>
  import sq from '../imgs/收起.svg';
  import zk from '../imgs/展开.svg';
  export default {
    name: 'app-tool',
    data() {
      return {
        wx: false,
        tool: true,
        src: sq
      }
    },

    methods: {
      showWX() {
        this.wx = !this.wx
      },
      showTool() {
        this.tool = !this.tool
        this.src = this.tool ? sq : zk
      }
    }
  }

</script>
<style lang="scss" scoped>
  @media screen and (min-width:768px) {
    .app-tool {
      z-index: 100;
      position: fixed;
      width: 80px;
      right: 0;
      bottom: 80px;
      border: 1px solid grey;

      .box {
        border: 1px solid #63575b;
        height: 80px;
        background: #c7747b;
        position: relative;



        &.wechat {
          cursor: pointer;

          .aside {
            display: none;
            position: absolute;
            left: -300px;
            top: -200px;
            width: 300px;
            height: 300px;

          }
        }

        img {
          width: 95%;
          height: 95%;
        }

        .aside {
          width: 150%;
          height: 150%;
        }
      }
    }
  }

  @media screen and (max-width:768px) {
    .app-tool {
      z-index: 100;
      position: fixed;
      display: flex;
      bottom: 42px;
      // border: 1px solid grey;
      text-align: center;
      width: 100%;
      justify-content: center;

      .tool-main {
        display: flex;
      }

      .box {
        border: 1px solid #8f083c;
        height: 80px;
        width: 80px;
        background: #c7747b;
        position: relative;

        &.wechat:hover {
          cursor: pointer;
        }

        img {
          width: 95%;
          height: 95%;
        }

        .aside {
          width: 150%;
          height: 150%;
          position: absolute;
          left: -100px;
          top: -300px;
          width: 300px;
          height: 300px;
        }
      }
    }
  }

</style>
