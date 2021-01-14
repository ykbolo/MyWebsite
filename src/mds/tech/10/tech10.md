# 小技巧-十六进制色值转成 rgba

## 关键词：css,rgba

### 时间：**2020.10.20**

#### 背景

适用场景

由接口配置标签色值，且标签的背景色和字体色一致，但是透明度不同

#### 代码

```

  <span :style="{ 'color': el.color || '#1478F0', 'background-color': colorRgb(el.color, 0.1) }">

  import colorRgb from '../../../../../utils/color-rgb'

  data() {
    return {
      colorRgb: colorRgb
    }
  }

```

```

  const colorRgb = (str, alpha) => {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 把颜色值变成小写
    var color = str.toLowerCase()
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        var colorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
        }
        color = colorNew
      }
      // 处理六位的颜色值，转为RGB
      var colorChange = []
      for (var j = 1; j < 7; j += 2) {
        colorChange.push(parseInt('0x' + color.slice(j, j + 2)))
      }
      // return 'RGB(' + colorChange.join(',') + ')'
      return `rgba(${colorChange.join(',')}${alpha ? ',' + alpha : ''})`
    } else {
      return color
    }
  }
  export default colorRgb

```
