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
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
