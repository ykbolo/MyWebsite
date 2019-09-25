<template>
  <div class="bg-home full-screen">
    <div class="text-center">
      <h1>首页</h1>
      <h2>
        <router-link :to="{name: 'color-pick'}">代码天地</router-link>
      </h2>
      <h2>
        <router-link :to="{name: 'about-me'}">关于我</router-link>
      </h2>
      <h2>
        <router-link :to="{name: 'more'}">文章</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {}
  }

</script>

<style scoped>

</style>
