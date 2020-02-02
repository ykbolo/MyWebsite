<template>
  <div class="aritcle-list">
    <!-- <app-tool></app-tool> -->
    <div v-if="showlist">
      <div @click="showcontent(1)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>1</em>：好物分享-外设篇1</span>
          <br></div>
        <div class="every-body">索尼H900N无线降噪耳机</div>
      </div>
      <div @click="showcontent(2)" class="every">
        <div class="every-head">
          <span><em>2</em>：好物分享-外设篇2</span>
          <br></div>
        <div class="every-body">罗技G603无线鼠标</div>
      </div>
      <!--
      <div class="every">
        <div class="every-head">
          <span>第三：git的使用</span>
          <br></div>
        <div class="every-body">小白也能会的git命令</div>
      </div> -->
    </div>
    <div v-else>
      <app-content :id="id" type='life'></app-content>
    </div>
  </div>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
