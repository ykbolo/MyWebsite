<template>
  <div class="app-top-bar">
    <svg class="ez-logo">
      <symbol id="line-text">
        <text text-anchor="middle" x="50%" y="50%" dy=".4em">
          EZREAL-YORK
        </text>
      </symbol>
      <use xlink:href="#line-text" class="text"></use>
      <use xlink:href="#line-text" class="text"></use>
      <use xlink:href="#line-text" class="text"></use>
      <use xlink:href="#line-text" class="text"></use>
    </svg>
    <div class="main-nav">
      <router-link :to="el.path" v-for="(el, index) in tabs">
        {{ el.name }}
      </router-link>
    </div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss"></style>
