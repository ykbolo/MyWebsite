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
