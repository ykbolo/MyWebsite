<template>
  <div class="bg-home full-screen">
    <div class="text-center">
      <h1>首页</h1>
      <h2>
        <router-link :to="{name: 'color-pick'}">Examples</router-link>
      </h2>
      <h2>
        <router-link :to="{name: 'about-me'}">Login</router-link>
      </h2>
      <h2>
        <router-link :to="{name: 'more'}">userInfo</router-link>
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
  .full-screen {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .bg-home {
    background: url('../../background.jpg')
  }

</style>
