
> 📌Vue的自定义指令


<a name="18a1e615"></a>
## 自己定义

一、定义语法：

 (1).局部指令：<br /> 

- directives:{ 指令名（）{配置对象}} 

 (2).全局指令：

- vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)

 二、配置对象中常用的3个回调：

1. bind：指令与元素成功绑定时调用
2. inserted：指令所在元素被插入页面时调用
3. update：指令所在模板结构被重新解析时调用

三、备注：

- 指令定义时不加v-，但使用时要加v-；
- 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名

需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍<br />[函数简写](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E5%87%BD%E6%95%B0%E7%AE%80%E5%86%99)
```html
<body>

  <!-- 准备好一个容器-->
  <div id="root">
    <h2>{{name}}</h2>
    <h2>当前的n值是：<span v-text="n"></span> </h2>
    <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
    <h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
    <button @click="n++">点我n+1</button>
    <hr />
  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    data: {
      name: 'akun',
      n: 1
    },
    directives: {
      //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
      /* 'big-number'(element,binding){
        // console.log('big')
        element.innerText = binding.value * 10
      }, */
      big(element, binding) {
        console.log('big', this) //注意此处的this是window
        // console.log('big')
        element.innerText = binding.value * 10
      },
    }
  })

</script>
```

需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点

```html
<body>

  <!-- 准备好一个容器-->
  <div id="root">
    <input type="text" v-fbind:value="n">
  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    directives: {
      fbind: {
        //指令与元素成功绑定时（一上来）
        bind(element, binding) {
          element.value = binding.value
        },
        //指令所在元素被插入页面时
        inserted(element, binding) {
          element.focus()
        },
        //指令所在的模板被重新解析时
        update(element, binding) {
          element.value = binding.value
        }
      }
    }
  })

</script>
```

全局自定义指令

```javascript
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
```


<a name="7b55b277"></a>
## 官网简介

> 📌要实现自定义指令（Custom Directive）可以使用 Vue 提供的 `directive` 方法。指令中this式window


除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

当页面加载时，该元素将获得焦点 (注意：`autofocus` 在移动版 Safari 上不工作)。事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。现在让我们用指令来实现这个功能：
```vue
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```vue
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

然后你可以在模板中任何元素上使用新的 `v-focus` property，如下：

```html
<input v-focus>
```


<a name="90b6dfbc"></a>
## [钩子函数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)

> 📌想要使用这些配置，就只能写成对象形式


一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)

我们会在[稍后](https://v2.cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM)讨论[渲染函数](https://v2.cn.vuejs.org/v2/guide/render-function.html)时介绍更多 VNodes 的细节。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用
- `unbind`：只调用一次，指令与元素解绑时调用

接下来我们来看一下钩子函数的参数 (即 `el`、`binding`、`vnode` 和 `oldVnode`)
```vue
Vue.directive('my-directive', {
  // 钩子函数
  bind: function (el, binding, vnode) {
     // 指令绑定时的处理逻辑（一上来） 
  },
  inserted: function (el, binding, vnode) {
     // 元素插入到 DOM 中时的处理逻辑 
  },
  update: function (el, binding, vnode, oldVnode) {
     // 组件更新时的处理逻辑/指令所在模板被重新解析时调用 
  },
  componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  
  unbind: function (el, binding, vnode) {
    // 指令与元素解绑时的处理逻辑
  }
});
```


<a name="1307b791"></a>
## [钩子函数参数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM
- `binding`：一个对象，包含以下 property： 
   - `name`：指令名，不包括 `v-` 前缀
   - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`
   - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用
   - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
   - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
   - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://v2.cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

> 📌除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。


这是一个使用了这些 property 的自定义钩子样例：
```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```
```vue
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35638872/1718588627666-0754b3a6-5a91-4cf2-9c14-6a51c43a17cc.png#averageHue=%23fefdfc&id=ticFg&originHeight=221&originWidth=693&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

自定义指令的钩子函数包括 `bind`、`inserted`、`update`、`componentUpdated` 和 `unbind`。下面是一个例子，演示了如何使用所有这些钩子函数，并解释了它们的意义和作用：

```vue
<template>
  <div v-custom-directive="'red'" :custom-arg="'arg-value'" custom-modifier>
    Custom Directive Example
  </div>
</template>

<script>
export default {
  directives: {
    'custom-directive': {
      // bind 钩子函数，在元素与指令绑定时调用
      bind(el, binding, vnode) {
        console.log('bind hook');

        // el: 指令绑定的元素
        console.log('Element:', el);

        // binding: 指令对象，包含 name、value、oldValue、expression 等属性
        console.log('Binding:', binding);

        // vnode: 虚拟节点，包含一些有用的信息
        console.log('VNode:', vnode);
      },
      // inserted 钩子函数，在被绑定元素插入父节点时调用
      inserted(el, binding, vnode) {
        console.log('inserted hook');
      },
      // update 钩子函数，在组件更新时调用
      update(el, binding, vnode, oldVnode) {
        console.log('update hook');
      },
      // componentUpdated 钩子函数，在组件更新后调用
      componentUpdated(el, binding, vnode, oldVnode) {
        console.log('componentUpdated hook');
      },
      // unbind 钩子函数，在元素与指令解绑时调用
      unbind(el, binding, vnode) {
        console.log('unbind hook');
      }
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
```

在这个例子中：

- `bind` 钩子函数在元素与指令绑定时调用，用于进行一次性的初始化设置。它接收三个参数： 
   - `el`: 指令绑定的元素
   - `binding`: 指令对象，包含了与指令相关的信息
   - `vnode`: 虚拟节点，包含了一些有用的信息
- `inserted` 钩子函数在被绑定元素插入父节点时调用。它接收的参数与 `bind` 钩子相同
- `update` 钩子函数在组件更新时调用，但不会触发子组件的更新。它接收的参数同样与 `bind` 钩子相同，以及额外的 `oldVnode` 参数，表示上一个虚拟节点
- `componentUpdated` 钩子函数在组件及其子组件更新后调用。它接收的参数与 `update` 钩子相同
- `unbind` 钩子函数在元素与指令解绑时调用，用于进行清理工作。它接收的参数同样与 `bind` 钩子相同

这个例子中，自定义指令 `v-custom-directive` 被应用到一个 `div` 元素上，并提供了一些参数，包括颜色值 `'red'`、自定义参数 `'arg-value'`，以及修饰符 `custom-modifier`。在控制台中你将看到每个钩子函数被调用时打印的信息

<a name="b4948272"></a>
## [动态指令参数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E5%8A%A8%E6%80%81%E6%8C%87%E4%BB%A4%E5%8F%82%E6%95%B0)

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用

例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：

```html
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```vue
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample'
})
```

这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新

```html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```vue
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```

结果：

![](https://cdn.nlark.com/yuque/0/2024/png/35638872/1718588627750-d9ed6851-99be-4122-a8f1-156b7ff8199e.png#averageHue=%23fefefe&id=qTYpo&originHeight=257&originWidth=777&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

这样这个自定义指令现在的灵活性就足以支持一些不同的用例了


<a name="470faaa5"></a>
## [对象字面量](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E9%87%8F)

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式

```vue
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```vue
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```
