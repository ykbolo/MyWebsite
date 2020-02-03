<template>
  <div class="game-list">
    <div v-if="showlist">
      <div @click="showcontent(1)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>1</em>：猎人与猎物</span>
          <br></div>
        <div class="every-body">基于websocket实现的web小游戏</div>
      </div>
      <div @click="showsnake()" class="every margin-t-1x">
        <div class="every-head">
          <span><em>2</em>：贪吃蛇</span>
          <br></div>
        <div class="every-body">经典单机游戏</div>
      </div>
      <!--
      <div @click="showcontent(2)" class="every">
        <div class="every-head">
          <span>第二：守望先锋</span>
          <br></div>
        <div class="every-body">基于d3的可视化研究</div>
      </div>
      <div @click="showcontent(3)" class="every">
        <div class="every-head">
          <span>第三：王者荣耀</span>
          <br></div>
        <div class="every-body">小白也能会的git命令</div>
      </div> -->
    </div>
    <div v-else>
      <div v-if="hasid">
        <app-content :id="id" type='game'></app-content>
      </div>
      <div v-if="snake">
        <snake></snake>
      </div>
    </div>
  </div>
</template>
<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
