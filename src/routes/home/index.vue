<template>
  <div class="bg-home full-screen text-center home">
    <div class="home-content">
      <div class="logo">
        <img src="../../imgs/york.png">
      </div>
      <br class="br">
      <div class="title">
        <h1>YorK的世界</h1>
        <div @click="changeHover">
          <p v-if='isHover'>逃离自己的舒适区</p>
          <p v-else>Escape from your comfort zone</p>
        </div>
      </div>
      <div id="nav">
        <div class="circle">
          <a href="page/Directory.html?content=game&amp;title=游戏" @click="showgame()">
            <img src="./images/youxi.svg">
            <span>游戏</span>
          </a>
        </div>
        <div class="circle">
          <a href="page/Directory.html?content=programming&amp;title=代码" @click="showcode()">
            <img src="./images/daima.svg">
            <span>代码</span>
          </a>
        </div>
        <div class="circle">
          <a href="page/Directory.html?content=drawing&amp;title=绘画" @click="showarticle()">
            <img src="./images/wenzhang.svg">
            <span>文章</span>
          </a>
        </div>
      </div>
      <hr class="seperator_betweenNavAndLink" color="#eee">
    </div>
  </div>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
