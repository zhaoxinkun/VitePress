
:::info
**切记一件事，所有的methods都会被挂载到vm实例对象身上，或者你的new出来的vue实例对象身上，但是绝对不会做数据代理，也就是不会有getter和setter**。因为那样做，会使Vue模型很累
:::
:::info
点击事件绑定方法直接声明就是调用，（）是用来传递参数的
:::

<a name="aNCPu"></a>
## [v-on](https://v2.cn.vuejs.org/v2/api/#v-on)

:::info
`v-on` 指令用于监听 DOM 事件并在事件触发时执行指定的方法。它是 Vue.js 中事件处理的核心指令之一，能够绑定原生事件和自定义事件
:::

- **缩写**：`@`
```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>


<!-- 缩写 -->
<a @click="doSomething">...</a>


<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>

```
```html
<div id="app">
  <button @click="sayHello">Click Me</button>

</div>


<script>
  new Vue({
    el: '#app',
    methods: {
      sayHello() {
        alert('Hello!');
      }
    }
  });
</script>


```

- **预期**：`Function | Inline Statement | Object`
- 优点
   - **简化事件处理**：提供了一种简单且直观的方式来监听和处理 DOM 事件
   - **事件修饰符**：通过丰富的修饰符，可以轻松实现常见的事件处理需求，如阻止事件传播、只触发一次事件等
   - **动态事件名**：支持绑定动态生成的事件名称，使事件处理更加灵活
```html
<div id="app">
  <button v-on:[eventName]="handleEvent">Click Me</button>

</div>


<script>
  new Vue({
    el: '#app',
    data: {
      eventName: 'click'
    },
    methods: {
      handleEvent() {
        alert('Event triggered');
      }
    }
  });
</script>


```

- **参数**：`event`
   - **事件名**：必需参数，指定要监听的事件类型，如 `click`、`submit` 等
   - **事件处理器**：可以是方法名称、内联 JavaScript 表达式或内联方法调用
- **用法**：绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` property：`v-on:click="handle('ok', $event)"`。从 `2.4.0` 开始，`v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的

<a name="GGthZ"></a>
## [监听事件](https://v2.cn.vuejs.org/v2/guide/events.html#监听事件)

:::info
可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。可以简写为@XXXX，其中xxx是事件名
:::

- 事件的回调需要配置在methods对象中，最终会在vm上
- methods中配置的函数，不要用箭头函数！否则this就不是vm了
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
- @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>事件的基本使用</title>

  <!-- 引入Vue -->
  <script type="text/javascript" src="../js/vue.js"></script>

</head>

<body>
  <!-- 准备好一个容器-->
  <div id="root">
    <button v-on:click="count++">点击增加{{count}}</button>

  </div>

</body>

<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    el: '#root',
    data: {
      count: 0
    }
  })
</script>


</html>
```

<a name="sHhws"></a>
## [事件处理方法](https://v2.cn.vuejs.org/v2/guide/events.html#事件处理方法)

:::info
然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称
:::
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>事件的基本使用</title>

  <!-- 引入Vue -->
  <script type="text/javascript" src="../js/vue.js"></script>

</head>


<body>

  <!-- 准备好一个容器-->
  <div id="root">
    <h2>欢迎回来{{name}}</h2>

    <!-- <button v-on:click="showInfo">点我提示信息</button> -->
    <button @click="showInfo1">点我提示信息1（不传参）</button>

    <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>

  </div>

</body>


<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    el: '#root',
    data: {
      name: '赵新坤',
    },
    methods: {
      showInfo1(event) {
        // console.log(event.target.innerText)
        // console.log(this) //此处的this是vm
        alert('同学你好！')
      },
      showInfo2(event, number) {
        console.log(event, number)
        // console.log(event.target.innerText)
        // console.log(this) //此处的this是vm
        alert('同学你好！！')
      }
    }
  })
</script>


</html>

```

<a name="uDAe2"></a>
## [内联处理器中的方法](https://v2.cn.vuejs.org/v2/guide/events.html#内联处理器中的方法)

:::info
**除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法（传参）**
:::
```html
<div id="example-3">
  <button  v-on:click="say('hi') ">Say hi</button>

  <button  v-on:click="say('what') ">Say what</button>

</div>

```
```html
new Vue({
el: '#example-3',
methods: {
say: function (message) {
alert(message)
}
}
})
```

:::info
📌**有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 **`$event`** 把它传入方法：**
:::
```html
<button  v-on:click="warn('Form cannot be submitted yet.', $event) ">
  Submit
</button>

```
```html
// ...
methods: {
warn: function (message, event) {
// 现在我们可以访问原生事件对象
if (event) {
event.preventDefault()
}
alert(message)
}
}
```
:::info
绑定多个事件时，事件之间使用分号“；”分开即可
:::

<a name="XYem9"></a>
### 事件对象回顾

:::info
📌事件对象event，其中有一个target（事件目标）
:::

- 事件处理方法
   - 在事件处理方法内，接收event参数
```html
<body>
  <div id="app">
    <button  v-on:click="fn" >
      点击
    </button>

  </div>

</body>

<script src="libs/vue.js"></script>

<script>
  const vm = new Vue({
    el:"#app",
    methods: {
      fn(event){
        console.log(event);
      } 
    },
  })
</script>

```

- 行内调用事件
   - 需要主动将`$event`传参占位，防止搞丢了
```html
<body>
  <div id="app"> 
    <button v-on:click="fn($event)"> //默认第一个参数是event 
      点击
    </button>

  </div>

</body>

<script src="libs/vue.js"></script>

<script>
  const vm = new Vue({
    el:"#app",
    methods: {
      fn(event){
        console.log(event);
      } 
    },
  })
</script>

```

<a name="FNyFW"></a>
## [事件修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#事件修饰符)

:::info
在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
:::
:::info
事件修饰符可以组合使用，例如：`@click.stop.prevent` 可以同时阻止事件冒泡和阻止默认行为。有顺序之分
:::
:::info
使用修饰符时，顺序很重要，相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素**自身的点击**
:::
为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表的。<br />示例：
```javascript
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>


<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>


 <!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a> 

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>


<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>


<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>


<!-- 2.1.4 新增，点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>


 //Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。 
<!-- 2.3.0 新增，滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>

```

<a name="BTOak"></a>
### `.stop`

:::info
`.stop`阻止事件冒泡，即停止事件在父元素上的进一步传播。等同于 JavaScript 中的 event.stopPropagation()
:::
```javascript
// HTML
<div id="parent">
  <button id="child">Click me</button>

</div>


// JavaScript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', function(event) {
  console.log('Parent clicked');
});

child.addEventListener('click', function(event) {
  event.stopPropagation();
  console.log('Child clicked');
});

//vue
<div @click="handleClickOutside">
  <button @click.stop="handleButtonClick">点击我</button>

</div>


```
:::info
在上述示例中，点击子元素按钮时，父元素上的点击事件不会被触发。`.stop`修饰符阻止了事件冒泡。阻止事件冒泡,加在父级元素的事件上
:::

<a name="e6uvU"></a>
### `.prevent`

:::info
`.prevent`阻止默认事件，例如在表单提交时阻止页面刷新。等同于 JavaScript 中的event.preventDefault()（如果事件可取消，则取消该事件，而不停止事件的进一步传播）
:::
```javascript
// JavaScript
const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Form submitted');
});

//vue
<a href="https://www.example.com" @click.prevent="handleClick">访问网站</a>


```
:::info
在上述示例中，当表单提交时，页面不会刷新。`.prevent`修饰符阻止了默认的表单提交行为
:::

<a name="HYT2T"></a>
### `.capture`

- `.capture`使用事件捕获模式而不是默认的冒泡模式。与事件冒泡的方向相反，事件捕获由外到内
:::info
这就要对于js事件流中的事件捕获和事件冒泡的理解了，首先是当我们点击嵌套元素的时候，首先执行的是事件捕获阶段也就是从外到内去寻找你点击的嵌套元素，此时并不会执行你的绑定的函数等，然后从内到外开始事件冒泡，并触发事件函数，有相同事件名字或事件方法的会一并触发，这就是事件冒泡
:::
```javascript
// JavaScript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', function(event) {
  console.log('Capture: Parent clicked');
}, true);

child.addEventListener('click', function(event) {
  console.log('Capture: Child clicked');
}, true);

//vue
<div @click.capture="handleClickCapture">
  <button @click="handleButtonClick">点击我</button>

</div>


```
:::info
在上述示例中，通过使用`.capture`修饰符，事件处理程序在捕获阶段执行。因此，当你点击子元素按钮时，首先会输出"Capture: Parent clicked"，然后才是"Capture: Child clicked"
:::

<a name="treAq"></a>
### `.self`

:::info
📌`.self`只有event.target事件源（即触发事件的元素本身）触发时才触发事件处理程序，不包括其子元素
:::
:::info
📌事件触发过程中会有事件对象，JS自带的，其中就有一个event.target方法，也就是事件对象目标方法，.self是只有在事件目标对象是自己的时候才会触发，也可以用来解决事件的冒泡,加在子元素上,只当在 event.target 是当前元素自身时触发处理函数
:::
```javascript
// HTML
<div id="parent">
  <button id="child">Click me</button>

</div>


// JavaScript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', function(event) {
  console.log('Parent clicked');
});

child.addEventListener('click', function(event) {
  if (event.target === child) {
    console.log('Child clicked');
  }
});

//vue
<div @click.self="handleDivClick">
  <button @click="handleDivClick">点击这个段落不会触发</button>

</div>


```
在上述示例中，当点击子元素按钮时，只有子元素自身被点击时才会输出"Child clicked"。`.self`修饰符将仅对触发事件的元素本身执行事件处理程序

<a name="ea3eR"></a>
### `.once`

:::info
`.once`只会触发一次事件，即只执行一次然后自动移除该事件监听器。适用于只需响应一次的场景，如初始化设置。` 2.1.4新增`
:::
```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', function(event) {
  console.log('Button clicked');
}, { once: true });

//vue
<body>
    <div class="app">
        <!-- 只渲染一次 -->
        <p v-once>{{msg}}</p>

        <p>{{msg}}</p>

        <button @click=" msg = Math.random() ">按钮</button>

    </div>

</body>


```
:::info
在上述示例中，只有在第一次点击按钮时，事件处理程序才会执行。`.once`修饰符使事件只被触发一次。不像其它只能对原生的 DOM 事件起作用的修饰符，.**once** 修饰符还能被用到自定义的组件事件上。
:::

<a name="ChYbu"></a>
### `.passive`

:::info
`.passive`告知浏览器该事件监听器不会调用 `preventDefault()`，用于提高滚动等性能。立即触发滚动事件，不会等待onscroll结束，事件的默认行为立即执行，无需等待事件回调执行完毕 `2.3.0新增`(常用于移动端)
:::
:::info
这个的话，例如@wheel滚轮滑动和@Scroll滚动条滑动问题，单独使用滚轮或者滚动条都可以触发事件，但是我滑轮滑了，但是滚动条还没有到我指定的位置，因为中间有回调函数还在执行
:::
```javascript
const element = document.getElementById('myElement');

element.addEventListener('touchsta rt', function(event) {
  console.log('Touch start');
}, { passive: true });


//vue
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>事件修饰符</title>

    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>

    <style>
      *{
        margin-top: 20px;
      }
      .list{
        width: 200px;
        height: 200px;
        background-color: peru;
        overflow: auto;
      }
      li{
        height: 100px;
      }
    </style>

  </head>

  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
      <ul @wheel.passive="demo" class="list">
        <li>1</li>

        <li>2</li>

        <li>3</li>

        <li>4</li>

      </ul>


    </div>

  </body>


  <script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
      el:'#root',
      data:{
      },
      methods:{
        demo(){
          for (let i = 0; i < 100000; i++) {
            console.log('#')
          }
          console.log('累坏了')
        }
      }
    })
  </script>

</html>


```
在上述示例中，通过使用`.passive`修饰符，告知浏览器该事件监听器不会调用`preventDefault()`。这在滚动等性能敏感的场景下可以提高性能<br />这个 `.passive` 修饰符尤其能够提升移动端的性能。不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你**不**想阻止事件的默认行为

<a name="L60mu"></a>
## [按键修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#按键修饰符)

:::info
可以连着使用，有顺序之分，也可以再.一个按键，组合使用
:::
在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：
```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->

<input v-on:keyup.enter="submit">
```
:::info
📌你可以直接将 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。（一定注意，有的是两个单词组成的按键，例如大小写键，使用时应为：caps-lock）
:::
```html
<input v-on:keyup.page-down="onPageDown">
```
在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用

<a name="TXoms"></a>
### [按键码](https://v2.cn.vuejs.org/v2/guide/events.html#按键码)

:::info
`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持
:::
使用 `keyCode` attribute 也是允许的：
```html
<input v-on:keyup.13="submit">
```
为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter`：监听回车键（keyCode 为 13）的按下事件
- `.tab`：监听 Tab 键（keyCode 为 9）的按下事件。(特殊，必须配合keydown去使用)
- `.delete`：监听删除键（keyCode 为 8 或 46）的按下事件。 (捕获“删除”和“退格”键)
- `.esc`监听 ESC 键（keyCode 为 27）的按下事件
- `.space`监听空格键（keyCode 为 32）的按下事件
- `.up` 监听上方向键（keyCode 为 38）的按下事件
- `.down`监听下方向键（keyCode 为 40）的按下事件
- `.left`监听左方向键（keyCode 为 37）的按下事件
- `.right`监听右方向键（keyCode 为 39）的按下事件

有一些按键 (`.esc` 以及所有的方向键) 在 IE9 中有不同的 `key` 值，如果你想支持 IE9，这些内置的别名应该是首选
:::info
Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）。你还可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名，但是不建议，没什么用
:::
```javascript
// 可以使用 `v-on:keyup.f1`

//Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
Vue.config.keyCodes.f1 = 112

Vue.config.keyCodes.huiche = 13 //定义了一个别名按键，不推荐
```

示例：

```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>键盘事件</title>

    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>

  </head>

  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <h2>欢迎来到{{name}}学习</h2>

      <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
    </div>

  </body>


  <script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
     Vue.config.keyCodes.huiche = 13 //定义了一个别名按键，不推荐 

    new Vue({
      el:'#root',
      data:{
        name:'赵新坤'
      },
      methods: {
        showInfo(e){
          // console.log(e.key,e.keyCode)
          console.log(e.target.value)
        }
      },
    })
  </script>

</html>

```

<a name="qWFBq"></a>
### [系统修饰键](https://v2.cn.vuejs.org/v2/guide/events.html#系统修饰键)

在 2.1.0 新增系统修饰符中，可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器<br />这几个就是大佬，因为本身就带有其他功能，所以，只能配合`keydown`或者使用`按键.其他按键`的方式才可以触发

- 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
- 配合keydown使用：正常触发事件

请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。如果你想要这样的行为，请为 `ctrl` 换用 `keyCode`：`keyup.17`

- `.ctrl`
- `.Tab`
- `.alt`
- `.shift`
- `.meta`
```latex
注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。
在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。
在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。
在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，
比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。
在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。
```
```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

<a name="PwaLt"></a>
### [.exact](https://v2.cn.vuejs.org/v2/guide/events.html#exact-修饰符)[ 修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#exact-修饰符)

:::info
📌在 2.5.0 新增系统修饰符中，`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件
:::

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>


<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>


<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>


```

<a name="UsNwr"></a>
### [鼠标按钮修饰符](https://v2.cn.vuejs.org/v2/guide/events.html#鼠标按钮修饰符)

:::info
在 2.2.0 新增鼠标按钮修饰符中，这些修饰符会限制处理函数仅响应特定的鼠标按钮
:::

- `.left`
- `.right`
- `.middle`

<a name="MqVNu"></a>
## [为什么在 HTML 中监听事件？](https://v2.cn.vuejs.org/v2/guide/events.html#为什么在-HTML-中监听事件？)

你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们
