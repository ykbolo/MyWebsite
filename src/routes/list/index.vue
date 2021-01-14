<template>
  <div class="list row margin-h-0x">
    <app-tool></app-tool>

    <!-- <app-footer></app-footer> -->
    <div class="col-xs-12 col-md-2 left-container">
      <div class="logo-container margin-t-1x ">
        <img src="../../imgs/york.png">
      </div>
      <div class="category ">
        <span>York</span>
      </div>
      <!-- <div class="hidden-xs">
        <div class="description">前端工程师</div>
        <div class="description">游戏玩家</div>
        <div class="description">电子发烧友</div>
        <div class="description">大四学生</div>
      </div> -->
      <div>
        <router-link :to="{name:'life'}">
          <div class="nav-link" :class="{active:this.$route.name==='life'}">
            测评
          </div>
        </router-link>
        <router-link :to="{name:'game'}">
          <div class="nav-link" :class="{active:this.$route.name==='game'}">
            游戏
          </div>
        </router-link>
        <router-link :to="{name:'tech'}">
          <div class="nav-link" :class="{active:this.$route.name==='tech'}">
            技术
          </div>
        </router-link>
      </div>
    </div>

    <div class="col-xs-12 col-md-10 right-container">

      <router-view></router-view>
    </div>
    <div style="height:100px"></div>
  </div>
</template>
<script src="./component.js">

</script>

<style lang="scss" src="./style.scss">

</style>
