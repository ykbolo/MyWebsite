<template>
  <div class="map text-center">
    <canvas id="canvas" height="225" width="225">
    </canvas>
    <div class="controller">
      <div style="display:inline-block">
        <div class="row">
          <span class="shang" @click="move(2)">↑</span>
          <div class="col-12">
            <span class="zuo" @click="move(1)">←</span>
            <span class="xia margin-l-5px" @click="move(4)">↓</span>
            <span class="you margin-l-5px" @click="move(3)">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
