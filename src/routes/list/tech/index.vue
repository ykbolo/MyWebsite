<template>
  <div class="tech-list">
    <!-- <app-tool></app-tool> -->
    <div v-if="showlist">
      <div @click="showcontent(1)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>1</em>：git的使用</span>
          <br></div>
        <div class="every-body">用git对于代码进行版本控制</div>
      </div>
      <div @click="showcontent(2)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>2</em>：vue+node+nginx配置gzip</span>
          <br></div>
        <div class="every-body">提升70%的无缓存情况下的访问速度</div>
      </div>
      <div @click="showcontent(3)" class="every margin-t-1x">
        <div class="every-head">
          <span><em>3</em>：vscode配置</span>
          <br></div>
        <div class="every-body">自用setting 参考，适用于 vue 前端开发</div>
      </div>
      <div @click="showcontent(4)" class="every">
        <div class="every-head">
          <span><em>4</em>：web开发工具分享</span>
          <br></div>
        <div class="every-body">那些存放在收藏夹中的网站-持续更新</div>
      </div>

      <div @click="showcontent(5)" class="every">
        <div class="every-head">
          <span><em>5</em>：「题目分析」</span>
          <br></div>
        <div class="every-body">关键词：闭包，引用</div>
      </div>

      <div @click="showcontent(6)" class="every">
        <div class="every-head">
          <span><em>6</em>：利用scrapy框架爬取苏大所有新闻标题信息</span>
          <br></div>
        <div class="every-body">关键词：爬虫，搜索引擎，scrapy</div>
      </div>

      <div @click="showcontent(7)" class="every">
        <div class="every-head">
          <span><em>7</em>：结果化存储爬虫数据</span>
          <br></div>
        <div class="every-body">关键词：爬虫，搜索引擎，scrapy，json</div>
      </div>
      <div @click="showcontent(8)" class="every">
        <div class="every-head">
          <span><em>8</em>：node实现elasticsearch批量导入文档</span>
          <br></div>
        <div class="every-body">关键词： elasticsearch 、搜索引擎 、json</div>
      </div>
      <div @click="showcontent(9)" class="every">
        <div class="every-head">
          <span><em>9</em>：浅谈 vue+node 实现前后端分离</span>
          <br></div>
        <div class="every-body">关键词：node，vue，跨域，axios，express</div>
      </div>
      <div @click="showcontent(10)" class="every">
        <div class="every-head">
          <span><em>10</em>：小技巧-十六进制色值转成 rgba</span>
          <br></div>
        <div class="every-body">css,rgba</div>
      </div>
      <div @click="showcontent(11)" class="every">
        <div class="every-head">
          <span><em>11</em>：python 脚本-生成键值对到剪贴板</span>
          <br></div>
        <div class="every-body">关键词：python，pyperclip</div>
      </div>
      <div @click="showcontent(12)" class="every">
        <div class="every-head">
          <span><em>12</em>：css 轮播器</span>
          <br></div>
        <div class="every-body">关键词：动画，css</div>
      </div>
      <div @click="showcontent(13)" class="every">
        <div class="every-head">
          <span><em>13</em>：利用 portfinder 解决端口号冲突</span>
          <br></div>
        <div class="every-body">关键词：端口，dev，portfinder，nodejs</div>
      </div>
    </div>
    <div v-else>
      <app-content :id="id" type='tech'></app-content>
    </div>
  </div>
</template>

<script src="./component.js">

</script>

<style lang="scss" src="./style.scss" scoped>

</style>
