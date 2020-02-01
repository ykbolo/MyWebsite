<template>
  <div class="aritcle-list">
    <!-- <app-tool></app-tool> -->
    <div v-if="showlist">
      <div @click="showcontent(1)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>1</em>：好物分享-外设篇</span>
          <br></div>
        <div class="every-body">键鼠，耳机推荐,使用感受</div>
      </div>
      <!-- <div class="every">
        <div class="every-head">
          <span>第二：d3深入浅出</span>
          <br></div>
        <div class="every-body">基于d3的可视化研究</div>
      </div>
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
