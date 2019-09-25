<template>
  <div class="text-center">
    <h1>首页</h1>
    <h2><router-link :to="{name: 'examples'}">Examples</router-link></h2>
    <h2><router-link :to="{name: 'login'}">Login</router-link></h2>
    <h2><router-link :to="{name: 'user-info'}">userInfo</router-link></h2>
  </div>
</template>

<script>
export default {
  mounted() {}
}
</script>