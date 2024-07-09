
:::info
📌使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到
:::

<a name="HZl1r"></a>
## [v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if)

- **预期**：`any`
- **用法**：根据表达式的值的 [truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>`，将提出它的内容作为条件块。当条件变化时该指令触发过渡效果
- 当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。详见[列表渲染教程](https://v2.cn.vuejs.org/v2/guide/list.html#v-for-with-v-if)
- **参考**：[条件渲染 - v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html)
:::info
**v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染。** **适用于：切换频率较低的场景。特点：不展示的DOM元素直接被移除**
:::
`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值的时候被渲染
```html
<body>
    <div id="app" style="border:solid 2px #aaa;width: 300px;padding: 20px;">
        <select v-model="state">
            <option value="0" selected>0</option>

            <option value="1">1</option>

            <option value="2">2</option>

        </select>

        <h1 v-if="state==0">吃饭</h1>

        <h1 v-else-if="state==1">睡觉</h1>

        <h1 v-else="state">学习</h1>

        <hr>
        <h1 v-show="state==0">吃饭</h1>

        <h1 v-show="state==1">睡觉</h1>

        <h1 v-show="state==2">学习</h1>

    </div>

</body>

<script src="libs/vue.js"></script>

<script>
    const vm = new Vue({
        el:"#app",
        data:{
            state:0
        }
    })
</script>

```

<a name="kr8xO"></a>
### [在 ](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-元素上使用-v-if-条件渲染分组)[<template>](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-元素上使用-v-if-条件渲染分组)[ 元素上使用 ](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-元素上使用-v-if-条件渲染分组)[v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-元素上使用-v-if-条件渲染分组)[ 条件渲染分组](https://v2.cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-元素上使用-v-if-条件渲染分组)

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？<br />此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。
```vue
<template v-if="ok">

  <h1>Title</h1>


  <p>Paragraph 1</p>


  <p>Paragraph 2</p>


</template>

```

<a name="l8WJo"></a>
### [v-else-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else-if)

> 2.1.0 新增

- **类型**：`any`
- **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`
- **用法**：表示 `v-if` 的“else if 块”。可以链式调用

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，可以连续使用：
```html
<div v-if="type === 'A'">
  A
</div>

<div v-else-if="type === 'B'">
  B
</div>

<div v-else-if="type === 'C'">
  C
</div>

<div v-else>
  Not A/B/C
</div>

```
:::info
类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后
:::

- **参考**：[条件渲染 - v-else-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else-if)

<a name="kDe9Q"></a>
### [v-else](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else)

- **不需要表达式**
- **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`
- **用法**：为 `v-if` 或者 `v-else-if` 添加“else 块”

你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：
```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>

<div v-else>
  Now you don't
</div>

```
`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别

- **参考**：[条件渲染 - v-else](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else)

<a name="mOA6a"></a>
### [用 ](https://v2.cn.vuejs.org/v2/guide/conditional.html#用-key-管理可复用的元素)[key](https://v2.cn.vuejs.org/v2/guide/conditional.html#用-key-管理可复用的元素)[ 管理可复用的元素](https://v2.cn.vuejs.org/v2/guide/conditional.html#用-key-管理可复用的元素)

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。<br />例如，如果你允许用户在不同的登录方式之间切换：
```vue
<template v-if="loginType === 'username'">

  <label>Username</label>


  <input placeholder="Enter your username">

</template>


<template v-else>

  <label>Email</label>


  <input placeholder="Enter your email address">

</template>

```
那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉，仅仅是替换了它的 `placeholder`

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可：
```vue
<template v-if="loginType === 'username'">

  <label>Username</label>


  <input placeholder="Enter your username" key="username-input">

</template>


<template v-else>

  <label>Email</label>


  <input placeholder="Enter your email address" key="email-input">

</template>

```
现在，每次切换时，输入框都将被重新渲染。
:::info
注意，`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute
:::

<a name="vxV6L"></a>
## v-show

- **预期**：`any`
- **用法**：根据表达式之真假值，切换元素的 `display` CSS property。当条件变化时该指令触发过渡效果
- **参考**：[条件渲染 - v-show](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-show)
:::info
**v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；适用于：切换频率较高的场景。特点：带有 **`**v-show**`** 的元素始终会被渲染并保留在 DOM 中。**`**v-show**`** 只是简单地切换元素的 CSS property **`**display**`**。**
:::
另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：
```html
<h1 v-show="ok">Hello!</h1>


```

:::info
注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`
:::
```html
<script src="./vue.js"></script>


  <body>
    <div id="app">
      <!-- 条件渲染 -->
    

      <!-- 成功才会显示 -->
      <p v-if="flag">欢迎来到德莱联盟</p>

      <!-- 联合使用 -->
      <p v-else>德玛西亚</p>

       <p v-show="show">我的音乐你听嘛</p> 
    </div>

  </body>


  <script>
    let app = Vue.createApp({
      data() {
        return {
          flag: false,
           show: true, 
        };
      },
      methods: {},
    });h
    app = app.mount("#app");
  </script>


```

<a name="MvEHr"></a>
## [v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)[ vs ](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)[v-show](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

`v-show` 和 `v-if` 是Vue.js中常用的指令，用于控制元素的显示与隐藏。下面是它们之间的区别：

1. 解析时机：
   - `v-show`：元素始终会被渲染到DOM中，只是通过CSS的display属性来控制它的显示与隐藏
   - `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
   - `v-if` 也是**惰性的**：元素只有在条件为真时才会被渲染到DOM中;如果在初始渲染时条件为假，则什么也不做元素根本不会存在于DOM中。——直到条件第一次变为真时，才会开始渲染条件块
2. 渲染开销：
   - `v-show`：由于元素始终在DOM中存在，使用 `v-show` 会有一些微小的渲染开销，尤其在切换频繁显示/隐藏时
   - `v-if`：元素在条件不满足时完全从DOM中移除，减少了渲染开销。但在条件满足时会重新渲染，添加到DOM中有一定的切换消耗
3. 条件变化响应：
   - `v-show`：当条件变化时，元素的显示与隐藏会立即响应，但它的内部状态仍然保留，比如表单输入的值
   - `v-if`：当条件变化时，元素的渲染状态会相应地进行添加或移除，所以每次条件改变时都会重新渲染整个元素

综上所述，如果需要频繁切换显示/隐藏的元素，可以使用 `v-show`。而如果需要根据条件动态添加或删除元素，则使用 `v-if` 更合适。同时，对于需要在渲染状态与内部状态之间进行权衡的情况，可以根据需求选择合适的指令

<a name="hEPzE"></a>
## [v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-与-v-for-一起使用)[ 与 ](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-与-v-for-一起使用)[v-for](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-与-v-for-一起使用)[ 一起使用](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-与-v-for-一起使用)

:::info
**不推荐**同时使用 `v-if` 和 `v-for`。请查阅[风格指南](https://v2.cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起-必要)以获取更多信息
:::
:::info
📌当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。请查阅[列表渲染指南](https://v2.cn.vuejs.org/v2/guide/list.html#v-for-with-v-if)以获取详细信息。也就是在遍历数据列表的同时，也在每一个元素上进行了条件判断，导致不必要的计算浪费性能。如果需要筛选数组中的元素，可以在 computed 中先筛选出需要的元素，再进行渲染。
:::
