<template>
  <keep-alive>
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
            <router-link :to="{name:'game'}">
              <img src="../../imgs/游戏.svg">
              <br>
              <span>游戏</span>
            </router-link>
          </div>
          <div class="circle">
            <router-link :to="{name:'life'}">
              <img src="../../imgs/生活.svg">
              <br>
              <span>生活</span>
            </router-link>
          </div>
          <div class="circle">
            <router-link :to="{name:'tech'}">
              <img src="../../imgs/科技.svg">
              <br>
              <span>文章</span>
            </router-link>
          </div>
        </div>
        <hr class="seperator_betweenNavAndLink" color="#eee">
      </div>
      <app-footer></app-footer>
    </div>
  </keep-alive>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
