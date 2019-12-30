<template>
  <div class="aritcle-list">
    <div v-if="showlist">
      <div @click="showcontent(1)" class="every margin-t-1x">
        <div class="every-head">
          <span>第一：git的使用</span>
          <br></div>
        <div class="every-body">用git对于代码进行版本控制</div>
      </div>
      <!-- <div @click="showcontent(2)" class="every">
        <div class="every-head">
          <span>第二：d3深入浅出</span>
          <br></div>
        <div class="every-body">基于d3的可视化研究</div>
      </div>
      <div @click="showcontent(3)" class="every">
        <div class="every-head">
          <span>第三：git的使用</span>
          <br></div>
        <div class="every-body">小白也能会的git命令</div>
      </div> -->
    </div>
    <div v-else>
      <app-content :id="id" type='article'></app-content>
    </div>
  </div>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
