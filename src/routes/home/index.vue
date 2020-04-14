<template>
  <keep-alive>
    <div class="bg-home full-screen text-center home">
      <app-tool></app-tool>
      <div class="home-content">
        <div class="container">
          <svg class="svg" viewBox="0 0 600 300">
            <symbol id="line-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".4em">
                EZREAL-YORK
              </text>
            </symbol>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
          </svg>
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
      </div>
      <app-footer></app-footer>
    </div>
  </keep-alive>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
