<template>

  <div class="game">
    <div v-if="showChoose">
      <div @click="setName(1)"><button>猎人</button></div>
      <div @click="setName(2)"><button>猎物</button></div>
    </div>
    <div v-else>

      <div class="row">
        <div class="biaozhu col-4">
          <span class="biaozhu-title ishunter"></span>
          <span class="biaozhu-desc">猎人</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title iscat"></span>
          <span class="biaozhu-desc">猎物</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isboom"></span>
          <span class="biaozhu-desc">炸弹</span>
        </div>
      </div>
      <div class="row">
        <div class="biaozhu col-4">
          <span class="biaozhu-title issafe"></span>
          <span class="biaozhu-desc">绝对安全区</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isunknown"></span>
          <span class="biaozhu-desc">危险区</span>
        </div>
        <div class="biaozhu col-4">
          <span class="biaozhu-title isopen"></span>
          <span class="biaozhu-desc">走过的路径</span>
        </div>
      </div>
      <div v-if="!isgameover">
        <table>
          <tbody>
            <tr v-for="(item,index) in table">
              <td v-for="(value,idx) in item"><span v-bind:class="{ issafe:value.issafe,isopen: value.isopen,iscat:value.iscat,ishunter: value.ishunter,isboom:(value.isboom && (isgameover || isvip) && !value.ishunter && !value.iscat) }"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="errmess" @click="refresh()">{{gameovermessage}},点击退出</div>
    </div>
    <div v-if="isvip===false">
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
      <div class="tip margin-t-1x" v-if="username==='hunter'">
        <div><span class="tip-title isboom"></span><span class="tip-desc">距离猎物还有<em>{{distance}}</em>步</span></div>
        <div><span class="tip-title isboom"></span><span class="tip-desc">周围雷数<em>{{boomCount}}</em></span></div>
      </div>

      <div class="tip margin-t-1x" v-else>
        <div><span class="tip-title isboom"></span><span class="tip-desc">距离被抓还有<em>{{distance}}</em>步</span></div>
        <div><span class="tip-title isboom"></span><span class="tip-desc">周围雷数<em>{{boomCount}}</em></span></div>
      </div>
      <p>
      </p>
    </div>
    <div v-else class="rule-title margin-t-1x">你当前是观察者</div>
    <div class="rule-title margin-t-1x">游戏规则</div>
    <div class="rule-desc margin-t-1x">分为<em>猎人</em>和<em>猎物</em><br>
      随机生成若干个陷阱，踩到陷阱者失败,抓到猎物则猎人获胜<br>
      <em>猎人和猎物均可根据提示自由移动</em><br>
      <em>两者之间的距离</em>以及<em>周围陷阱个数</em>作为这场比赛的重要参照
    </div>
  </div>
</template>

<script src="./component.js">

</script>
<style lang="scss" src="./style.scss"></style>
