<template>
  <div class="game">
    <table>
      <tbody>
        <tr v-for="(item,index) in table">
          <td v-for="(value,idx) in item"><span v-bind:class="{ isopen: value.isopen===1,isuser: value.isuser===1 }"></span></td>
        </tr>
      </tbody>
    </table>
    <div class="controller">
      <div style="display:inline-block">
        <div class="row">
          <span class="shang" @click="move('up')">↑</span>
          <div class="col-12">
            <span class="zuo" @click="move('left')">←</span>
            <span class="xia margin-l-5px" @click="move('down')">↓</span>
            <span class="you margin-l-5px" @click="move('right')">→</span>
          </div>
        </div>
      </div>
    </div>
    <span>游戏规则</span>
    <div>分为追捕者和被追捕者</div>
    <div>被追捕者负责放置炸弹，最多不超过10个,可以在没有被打开的盒子中自由移动，如果追捕者碰到炸弹将获胜</div>
    <div>追捕者可以看到距离被追捕者的最短距离，能显示所在炸弹的个数，追捕者与被追捕者重合则获胜</div>
  </div>
</template>

<script src="./component.js">

</script>
<style lang="scss" src="./style.scss"></style>
