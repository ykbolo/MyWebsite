<template>
  <router-view></router-view>
</template>

<script>
import store from '../../store'

export default {
  beforeRouteEnter(to, from, next) {
    if (store.state.user.token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
}
</script>
