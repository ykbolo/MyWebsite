<template>
  <div class="bg-home full-screen text-center home">
    <app-tool></app-tool>
    <div class="home-content">
      <div class="logo">
        <img src="../../imgs/york.png">
      </div>
      <br class="br">
      <div class="title">
        <h1>YorK的世界</h1>
        <div @click="changeHover">
          <p v-if='isHover'>ezreal-yk.cn</p>
          <p v-else>503589510@qq.com</p>
        </div>
        <a href="/share">
          <h1>游戏入口</h1>
        </a>
      </div>
      <div id="nav">
        <div class="circle">
          <router-link :to="{name:'game'}" @click="showgame()">
            <img src="./images/youxi.svg">
            <span>游戏</span>
          </router-link>
        </div>
        <div class="circle">
          <router-link :to="{name:'code'}" @click="showcode()">
            <img src="./images/daima.svg">
            <span>代码</span>
          </router-link>
        </div>
        <div class="circle">
          <router-link :to="{name:'article'}" @click="showarticle()">
            <img src="./images/wenzhang.svg">
            <span>文章</span>
          </router-link>
        </div>
      </div>
      <hr class="seperator_betweenNavAndLink" color="#eee">
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
