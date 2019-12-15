<template>
  <div class="list row margin-h-0x">
    <div class="col-4 left-container">
      <div class="logo-container margin-t-1x ">
        <img src="../../imgs/york.png">


      </div>
      <div class="category ">
        <span>York</span>
      </div>
      <div class="description">前端工程师</div>
      <div class="description">游戏玩家</div>
      <div class="description">电子发烧友</div>
      <div class="description">大四学生</div>
    </div>
    <div class="col-8 right-container">
      <div class="nav row margin-h-0x">
        <div class="col-6 row ">
          <router-link class="col-4 nav-link" :to="{name:'code'}">
            <div>

              代码
            </div>
          </router-link>
          <router-link class="col-4 nav-link" :to="{name:'game'}">
            <div>
              游戏
            </div>
          </router-link>
          <router-link class="col-4 nav-link" :to="{name:'article'}">
            <div>

              文章
            </div>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="./component.js">

</script>

<style lang="scss" src="./style.scss">

</style>
