# css 轮播器

## 关键词：动画，css

### 时间：**2020.08.21**

#### 背景

####

自动执行动画

```
autoNext() {
  let self = this
  self.timer = setInterval(() => {
    // if (!domUtil.getHidden()) {
    self._nextClick()
    // }
  }, 3000)
}
_nextClick() {
  let len = this.state.itemNum
  this.state.currentItem = this.state.currentItem + 1
  if (this.state.currentItem === len) {
    this.state.currentItem = 0
  }
}
```

分析元素移动状态

```
<div class="box3 inline-block">
  <for|index, item| in=riskItems>
    <div
      key={
                    index: index
                  }
      class=[
                    "item list-item",
                    index === state.currentItem && "item-fade",
                    (index + 1 === state.currentItem ||
                      (index === state.itemNum - 1 && state.currentItem === 0)) &&
                      "item-fade-before"
                  ]>
      <span class="item-text  inline-block margin-r-20px margin-l-20px">
        xxx
      </span>
    </div>
  </for>
</div>
```

```
.list-item {
    height: 20px;
    top: 20px;
    transform: translateY(0px);
    position: absolute;
    transition: all 0.3s;
    display: inline-block;

    &.item-fade {

      transform: translateY(-100%);
    }

    &.item-fade-before {//向上偏移2个身位
      transform: translateY(-200%);
      transition: all 0.3s;
    }

    &.item-fade-before-before {//隐藏状态
      transform: translateY(-300%);
      display: none;
      transition: all 0.3s;
    }
  }

```

处理数据少的情况,不然会有 bug

```
items = _.includes([2, 3], items.length) ? _.concat(items, items) : items
```
