
> 📌适用于在多个组件之间共享可复用的逻辑，主要解决代码复用问题。适合与组件生命周期、方法和数据相关的逻辑复用。可以囊括所有的Vue实力配置项。**plugin比它还要大，但是是直接全局的，而且不仅可以囊括配置项，还能有各种插件等**


<a name="d86ebfeb"></a>
## 局部混入

> 📌混入 (`mixin`) 提供了一种非常灵活的方式，来分发 `Vue`组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。**公共配置的抽离**


```vue
//mixins
export const hunhe = {
  methods: {
    showName() {
      alert(this.name)
    }
  },
  mounted() {
    console.log('你好啊！')
  },
}
export const hunhe2 = {
  data() {
    return {
      x: 100,
      y: 200
    }
  },
}
```
```vue
//Student组件
<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
import { hunhe, hunhe2 } from '../mixin'

export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      sex: '男'
    }
  },
  mixins: [hunhe, hunhe2]
}
</script>

//School组件
<template>
  <div>
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
//引入一个hunhe
import {hunhe,hunhe2} from '../mixin'

export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      address: '北京',
      x: 666
    }
  },
   mixins:[hunhe,hunhe2],
}
</script>
```

<a name="dddea064"></a>
## [全局混入](https://v2.cn.vuejs.org/v2/guide/mixins.html#%E5%85%A8%E5%B1%80%E6%B7%B7%E5%85%A5)

> 📌混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响**每一个**之后创建的 `Vue`实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。你写到的使用地方都会使用


```vue
//main.js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import {hunhe,hunhe2} from './mixin' 
//关闭Vue的生产提示
Vue.config.productionTip = false

Vue.mixin(hunhe)
Vue.mixin(hunhe2)
 

//创建vm
new Vue({
  el:'#app',
  render: h => h(App)
})
```

> 📌请谨慎使用全局混入，因为它会影响每个单独创建的 `Vue`实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为[插件](https://v2.cn.vuejs.org/v2/guide/plugins.html)发布，以避免重复应用混入。


<a name="4150b623"></a>
## [选项合并](https://v2.cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)

> 📌当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。以你组件里写的为主,混合的为辅

> 📌比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先

```vue
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

> 📌同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用


```vue
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

> 📌值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对


```vue
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

> 📌注意：`Vue.extend()` 也使用同样的策略进行合并


<a name="98c611f7"></a>
## [自定义选项合并策略](https://v2.cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5)

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

```vue
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

对于多数值为对象的选项，可以使用与 `methods` 相同的合并策略：

```vue
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

可以在 [Vuex](https://github.com/vuejs/vuex) 1.x 的混入策略里找到一个更高级的例子：

```vue
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```
