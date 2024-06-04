# Directives

## 目录

- [参数](#参数)
- [动态参数](#动态参数)
- [v-text](#v-text)
- [v-cloak](#v-cloak)
  - [与其他指令结合使用](#与其他指令结合使用)
- [v-pre](#v-pre)
  - [显示静态内容](#显示静态内容)
- [v-once](#v-once)
- [v-slot](#v-slot)

> 📌**指令 (Directives) 是带有 ****`v-`**** 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (****`v-for`**** 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。回顾我们在介绍中看到的例子：**

> 📌**常用在标签属性中，功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。**

![](image/image_KKvU1neDRG.png)

## [参数](https://v2.cn.vuejs.org/v2/guide/syntax.html#参数 "参数")

> 📌一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML attribute：

```html
<a v-bind:href="url">...</a>
```

在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` attribute 与表达式 `url` 的值绑定。

另一个例子是 `v-on` 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">...</a>
```

在这里参数是监听的事件名。

## [动态参数](https://v2.cn.vuejs.org/v2/guide/syntax.html#动态参数 "动态参数")

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<!-- 注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述 -->

<a v-bind:[attributeName]="url"> ... </a>
```

> 📌**这里的 ****`attributeName`**** 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 ****`data`**** property ****`attributeName`****，其值为 ****`"href"`****，那么这个绑定将等价于 ****`v-bind:href`****。**

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

**对动态参数的值的约束**

> 📌动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

**对动态参数表达式的约束**

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->

<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

> 📌**在 DOM 中使用模板时，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：**

```html
<!--

在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。

除非在实例中有一个名为“someattr”的 property，否则代码不会工作。

-->

<a v-bind:[someAttr]="value"> ... </a>
```

## [v-text](https://v2.cn.vuejs.org/v2/api/#v-text "v-text")

`v-text` 指令用于更新元素的 `textContent`，它将绑定的数据渲染为纯文本，替换元素中的内容。这与 Mustache 语法 `{{ }}` 类似，但 `v-text` 是一个指令，可以用于更灵活的场景。

- **预期**：`string`
- 优点
  - **防止 XSS 攻击**：因为 `v-text` 只插入纯文本，不会解析 HTML，确保了内容的安全。
  - **简洁明了**：对于简单的文本绑定，使用 `v-text` 比 `{{ }}` 更清晰。
  - **动态更新**：绑定的文本会随数据变化而自动更新。
- **详细**：

  更新元素的 `textContent`。如果要更新部分的 `textContent`，需要使用 `{{ Mustache }}` 插值。
- **示例**：

```html
//简单使用
<div id="app">
  <p v-text="message"></p>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      message: 'Hello, Vue!'
    }
  });
</script>

//动态更新
<div id="app">
  <p v-text="message"></p>
  <button @click="updateMessage">Update Message</button>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      message: 'Hello, Vue!'
    },
    methods: {
      updateMessage() {
        this.message = 'Updated Message!';
      }
    }
  });
</script>


```

- **参考**：[数据绑定语法 - 插值](https://v2.cn.vuejs.org/v2/guide/syntax.html#插值 "数据绑定语法 - 插值")
- 问题：一闪而过
  > 📌当刷新页面的时候，会一闪而过{{}}，这是因为有了js阻塞，导致模板渲染结束了，但是数据还没有加载完，解决方式通过v-clock指令搭配css：display-none解决；或者通过v-if和v-show解决；亦或者使用钩子函数解决。
  ```html
  <div id="app" v-cloak>
    {{ message }}
  </div>

  [v-cloak] {
    display: none; 
  }

  ```

## [v-cloak](https://v2.cn.vuejs.org/v2/api/#v-cloak "v-cloak")

- 用途
  - `v-cloak` 指令用于在 Vue 实例编译完成前保持元素的隐藏状态。通常与 CSS 规则配合使用，确保在 Vue 编译和渲染完毕之前不会显示未编译的模板内容。这对于防止用户看到未渲染的模板语法（例如双花括号 {{ }} ）非常有用。
- js阻塞
  ```text
  在JavaScript中，阻塞通常指的是代码执行过程中的停顿或延迟。这可能是由于以下几种情况导致的：

  同步执行：JavaScript是单线程的，意味着代码会按照顺序一行一行地执行。如果有一个耗时较长的操作（如网络请求、计算密集型任务），它会阻塞后续代码的执行，直到该操作完成。这可能会导致页面响应变慢或卡顿。

  长时间运行的脚本：如果JavaScript代码运行时间过长，超出了浏览器的限制（通常是几秒钟），浏览器可能会强制中断脚本的执行，以防止页面出现长时间的无响应状态。

  脚本加载阻塞：当浏览器遇到<script>标签时，它会停止页面渲染，直到脚本加载并执行完毕。如果脚本文件很大或加载时间较长，会导致页面在加载脚本期间出现空白或延迟。

  为了避免阻塞影响页面的性能和用户体验，可以采取一些优化策略：

  异步执行：将耗时的操作（如网络请求、定时器、事件处理等）放在异步函数中，以确保不会阻塞后续代码的执行。可以使用setTimeout、setInterval、Promise、async/await等方式来实现异步操作。

  分块加载：将脚本文件拆分为多个小文件，并使用异步加载方式（如async或defer属性）来加载脚本，以减少对主渲染线程的阻塞。可以使用模块化工具（如Webpack、Rollup）进行代码分块和按需加载。

  避免长时间运行的脚本：将耗时较长的任务拆分为多个小任务，并使用定时器或requestAnimationFrame等方式分批执行，以避免单个任务执行时间过长导致阻塞。

  使用Web Worker：对于一些需要进行大量计算或耗时操作的任务，可以将其放在Web Worker中运行，以避免阻塞主线程的执行。

  总之，通过合理的异步处理、代码拆分和优化策略，可以最大程度地减少JavaScript的阻塞，提高页面的性能和响应速度。
  ```
- 优点
  - **避免闪烁问题**：在 Vue 实例初始化和模板编译完成之前隐藏元素，防止用户看到未编译的模板语法。
  - **提高用户体验**：确保页面加载时呈现的是完全渲染的内容，提高页面的美观和专业度。

首先，在 CSS 中定义一个规则来隐藏 `v-cloak` 元素：

```css
[v-cloak] {
  display: none;
}
```

然后，在 HTML 中使用 `v-cloak` 指令：

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
</head>
<body>
  <div id="app">
    <p v-cloak>{{ message }}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello, Vue!'
      }
    });
  </script>
</body>
</html>
```

在这个例子中，`v-cloak` 会在 Vue 实例编译完成前隐藏 `p` 元素。编译完成后，Vue 会移除 `v-cloak` 属性，`p` 元素会显示绑定的数据内容。

##### 与其他指令结合使用

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
</head>
<body>
  <div id="app">
    <p v-cloak>{{ message }}</p>
    <button @click="updateMessage">Update Message</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello, Vue!'
      },
      methods: {
        updateMessage() {
          this.message = 'Message updated!';
        }
      }
    });
  </script>
</body>
</html>
```

在这个例子中，`v-cloak` 仍然用于隐藏 `p` 元素的初始内容，直到 Vue 实例编译完成。在 Vue 实例初始化完成后，用户可以点击按钮更新消息内容。

`v-cloak` 指令是一个简单而有效的工具，用于在 Vue 实例初始化和编译完成之前隐藏未编译的模板内容。结合 CSS 使用，可以避免闪烁问题，提高页面的用户体验和美观度。尽管没有修饰符，但其功能已经足够满足需要在编译前隐藏内容的场景需求。

## [v-pre](https://v2.cn.vuejs.org/v2/api/#v-pre "v-pre")

- **不需要表达式**
- **用法**：

  `v-pre` 指令用于跳过这个元素和其所有子元素的编译过程。使用这个指令可以显著加快渲染速度，尤其是在需要显示大量静态内容时。这对性能优化非常有用。

  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 优点
  - **性能优化**：通过跳过编译过程，可以减少渲染开销，提高性能。
  - **调试方便**：在开发过程中，可以用它来检查未编译的模板内容。
  - **保留原始内容**：确保元素内容保持原样，不被 Vue 的编译器处理。
- **示例**：跳过这个元素和他的子元素的编译过程,不会进行编译
  ```javascript
  <div id="app">
    <div v-pre>{{ This will not be compiled }}</div>
    <div>{{ This will be compiled }}</div>
  </div>

  <script>
    new Vue({
      el: '#app'
    });
  </script>
  ```
  在这个例子中，第一个 `div` 标签的内容 `{{ This will not be compiled }}` 不会被 Vue 编译，它会按原样显示。而第二个 `div` 标签的内容 `{{ This will be compiled }}` 会被 Vue 编译并渲染。
  ##### 显示静态内容
  ```html
  <div id="app">
    <div v-pre>
      <p>{{ This is static content }}</p>
      <span>{{ Will not be compiled }}</span>
    </div>
    <div>
      <p>{{ message }}</p>
    </div>
  </div>

  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'This will be compiled'
      }
    });
  </script>
  ```
  在这个例子中，`v-pre` 指令包裹的内容不会被 Vue 编译，会按原样显示。未使用 `v-pre` 的部分会正常编译并渲染。

## [v-once](https://v2.cn.vuejs.org/v2/api/#v-once "v-once")

- **不需要表达式**
- **详细**：

  只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
  ```javascript
  <div id="app">
    <p v-once>{{ message }}</p>
    <button @click="updateMessage">Update Message</button>
  </div>

  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'This will be rendered once'
      },
      methods: {
        updateMessage() {
          this.message = 'Message updated';
        }
      }
    });
  </script>

  ```
- **参考**：
  - [数据绑定语法- 插值](https://v2.cn.vuejs.org/v2/guide/syntax.html#插值 "数据绑定语法- 插值")
  - [组件 - 对低开销的静态组件使用 ](https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#通过-v-once-创建低开销的静态组件 "组件 - 对低开销的静态组件使用 ")[v-once](https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#通过-v-once-创建低开销的静态组件 "v-once")

## [v-slot](https://v2.cn.vuejs.org/v2/api/#v-slot "v-slot")

- **缩写**：`#`
- **预期**：可放置在函数参数位置的 JavaScript 表达式 (在[支持的环境下](https://v2.cn.vuejs.org/v2/guide/components-slots.html#解构插槽-Props "支持的环境下")可使用解构)。可选，即只需要在为插槽传入 prop 的时候使用。
- **参数**：插槽名 (可选，默认值是 `default`)
- **限用于**
  - `<template>`
  - [组件](https://v2.cn.vuejs.org/v2/guide/components-slots.html#独占默认插槽的缩写语法 "组件") (对于一个单独的带 prop 的默认插槽)
- **用法**：

  提供具名插槽或需要接收 prop 的插槽。
- **参考**：
  - [组件 - 插槽](https://v2.cn.vuejs.org/v2/guide/components-slots.html "组件 - 插槽")
  - [RFC-0001](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md "RFC-0001")
- 优点
  - **组件灵活性**：允许开发者自定义组件的内容布局，使得组件更加灵活。
  - **代码重用**：可以在多个地方重复使用具名插槽，提高了代码的重用性和可维护性。
- 基本用法
  ```vue
  <template>
    <div>
      <my-component>
        <template v-slot:header>
          <h1>This is the header</h1>
        </template>
        <template v-slot:footer>
          <p>This is the footer</p>
        </template>
      </my-component>
    </div>
  </template>

  <script>
  import MyComponent from './MyComponent.vue';

  export default {
    components: {
      MyComponent
    }
  };
  </script>
  ```
  在这个例子中，`my-component` 组件包含两个具名插槽 `header` 和 `footer`。通过 `v-slot` 指令可以在组件内部定义具名插槽的内容，从而实现自定义的组件布局。
- 默认插槽
  ```vue
  <template>
    <div>
      <my-component>
        <p>This is the default slot content</p>
      </my-component>
    </div>
  </template>

  <script>
  import MyComponent from './MyComponent.vue';

  export default {
    components: {
      MyComponent
    }
  };
  </script>
  ```
  如果没有指定插槽名称，则内容将被分发到组件的默认插槽中。在子组件中使用 `v-slot:default` 或简写形式 `#default` 来接收默认插槽内容。
- 动态插槽名
  ```vue
  <template>
    <div>
      <my-component v-slot:[slotName]>
        <p>This is the dynamically named slot content</p>
      </my-component>
    </div>
  </template>

  <script>
  import MyComponent from './MyComponent.vue';

  export default {
    components: {
      MyComponent
    },
    data() {
      return {
        slotName: 'header'
      };
    }
  };
  </script>
  ```
  在这个例子中，插槽的名称是动态的，根据 `slotName` 数据的值动态确定。
- 作用域插槽
  ```vue
  <template>
    <div>
      <my-component>
        <template v-slot:default="slotProps">
          <p>{{ slotProps.text }}</p>
        </template>
      </my-component>
    </div>
  </template>

  <script>
  import MyComponent from './MyComponent.vue';

  export default {
    components: {
      MyComponent
    }
  };
  </script>
  ```
  在这个例子中，通过 `slotProps` 变量可以访问到父组件传递给插槽的数据。这种类型的插槽称为作用域插槽。

`v-slot` 指令是 Vue.js 中用于定义具名插槽的重要指令，通过它可以实现对组件内容布局的灵活控制。具名插槽能够有效地提高组件的复用性和可维护性，使得组件的内容更加清晰和易于理解。通过动态插槽名和作用域插槽的使用，可以进一步增强插槽的灵活性和功能。
