# Plugin

<!-- ## 目录

- [Plugin](#plugin)
  - [目录](#目录)
  - [定义插件](#定义插件)
  - [应用插件](#应用插件)
  - [使用插件](#使用插件) -->

> 📌适用于在多个组件之间共享可复用的逻辑，主要解决代码复用问题，增强Vue。适合与组件生命周期、方法和数据相关的逻辑复用。可以囊括Mixins，甚至更多.在插件内部可以添加全局方法、全局指令、实例方法等，但要注意不要与已有的方法和指令重名，以避免冲突。

## 定义插件

1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element "vue-custom-element")
2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch "vue-touch")
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router "vue-router")
4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router "vue-router")

> 📌接收参数,参数是`Vue`构造函数,包含各种`Vue`构造函数的方法和属性

> 📌Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

```javascript
//plugin.js
export default {
  install(Vue,x,y,z){
    console.log(x,y,z)
     //全局过滤器
    Vue.filter('mySlice',function(value){
      return value.slice(0,4)
    }) 

     //定义全局指令 
    Vue.directive('fbind',{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element,binding){
        element.focus()
      },
      //指令所在的模板被重新解析时
      update(element,binding){
        element.value = binding.value
      }
    })

     //定义混入 
    Vue.mixin({
      data() {
        return {
          x:100,
          y:200
        }
      },
    })

    //给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = ()=>{alert('你好啊')}
  }
}
```

## 应用插件

> 📌通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```vue
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

也可以传入一个可选的选项对象：

```vue
Vue.use(MyPlugin, { someOption: true })
```

`Vue.use` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

Vue.js 官方提供的一些插件 (例如 `vue-router`) 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 `Vue.use()`：

```vue
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```

[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries "awesome-vue") 集合了大量由社区贡献的插件和库。

```javascript
//main.js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import plugins from './plugins'
//关闭Vue的生产提示
Vue.config.productionTip = false

 //应用（使用）插件
Vue.use(plugins,1,2,3) 
//创建vm
new Vue({
  el:'#app',
  render: h => h(App)
})
```

## 使用插件

```javascript
//school.vue
<template>
  <div>
   //过滤器 
     <h2>学校名称：{{name | mySlice}}</h2> 
    <h2>学校地址：{{address}}</h2>
    //自定义方法
     <button @click="test">点我测试一个hello方法</button> 
  </div>
</template>

<script>
  export default {
    name:'School',
    data() {
      return {
        name:'清华大学',
        address:'北京',
      }
    },
    methods: {
       test(){
        this.hello()
      } 
    },
  }
</script>
```

```javascript
//student.vue、
<template>
  <div>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
     //自定义指令 
     <input type="text" v-fbind:value="name"> 
  </div>
</template>

<script>
  export default {
    name:'Student',
    data() {
      return {
        name:'张三',
        sex:'男'
      }
    },
  }
</script>
```
