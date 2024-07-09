<a name="mltuf"></a>
## 
:::info
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组
:::
```latex
绑定样式：

1. class样式

写法:class="xxx" xxx可以是字符串、对象、数组。

 字符串写法适用于：类名不确定，要动态获取。

对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。

数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。 

1. style样式

:style="{fontSize: xxx}"其中xxx是动态值。

:style="[a,b]"其中a、b是样式对象。
```

<a name="rDmCi"></a>
## [绑定 HTML Class](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#绑定-HTML-Class)

```html
<title>绑定样式</title>

    <style>
      .basic{
        width: 400px;
        height: 100px;
        border: 1px solid black;
      }
    

      .happy{
        border: 4px solid red;;
        background-color: rgba(255, 255, 0, 0.644);
        background: linear-gradient(30deg,yellow,pink,orange,yellow);
      }
      .sad{
        border: 4px dashed rgb(2, 197, 2);
        background-color: gray;
      }
      .normal{
        background-color: skyblue;
      }

      .atguigu1{
        background-color: yellowgreen;
      }
      .atguigu2{
        font-size: 30px;
        text-shadow:2px 2px 10px red;
      }
      .atguigu3{
        border-radius: 20px;
      }
    </style>

    <script type="text/javascript" src="../js/vue.js"></script>

  

  <body>

    <!-- 准备好一个容器-->
    <div id="root">
       <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 --> 
      <div class="basic"  :class="mood"  @click="changeMood">{{name}}</div> <br/><br/>

       <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 --> 
     方式一：<div class="basic"  :class="classArr" >{{name}}</div> <br/><br/>
     方式二：<div class="basic" :class="[a,b,c]">{{name}}</div> <br/><br/>

       <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 --> 
      <div class="basic"  :class="classObj" >{{name}}</div> <br/><br/>

    </div>

  </body>


  <script type="text/javascript">
    Vue.config.productionTip = false
  

    const vm = new Vue({
      el:'#root',
      data:{
        name:'赵新坤',
         //字符串方法 
         mood:'normal', 
      

          //数组写法 
        //方式一
        classArr:['atguigu1','atguigu2','atguigu3'], //可以使用数组方法
        //方式二
        a:'atguigu1',
        b:'atguigu2',
        c:'atguigu3',
      

          //对象写法 
        classObj:{
          atguigu1:false,
          atguigu2:false,
        },
      },
    

       methods: {
        changeMood(){
          const arr = ['happy','sad','normal']
          const index = Math.floor(Math.random()*3)
          this.mood = arr[index]
        }
      }, 
    })
  </script>

</html>

```

<a name="aLAEW"></a>
### [对象语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#对象语法)

:::info
我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：
:::
```html
<div v-bind:class="{ active: isActive }"></div>

```
上面的语法表示 `active` 这个 class 存在与否将取决于数据 property `isActive` 的 [truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

你可以在对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class attribute 共存。当有如下模板：
```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

```
和如下 data：
```javascript
data: {
  isActive: true,
  hasError: false
}
```
结果渲染为：
```html
<div class="static active"></div>

```

当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，class 列表将变为 `"static active text-danger"`<br />绑定的数据对象不必内联定义在模板里：
```html
<div v-bind:class="classObject"></div>

```
```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://v2.cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：
```html
<div v-bind:class="classObject"></div>

```
```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

<a name="vo5yi"></a>
### [数组语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#数组语法)

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：
```html
<div v-bind:class="[activeClass, errorClass]"></div>

```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
渲染为：
```html
<div class="active text-danger"></div>

```

如果你也想根据条件切换列表中的 class，可以用三元表达式：
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

```
这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy[[1]](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#footnote-1) 时才添加 `activeClass`。不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：
```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

```

<a name="cZtX4"></a>
### [用在组件上](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#用在组件上)

当在一个自定义组件上使用 `class` property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。<br />例如，如果你声明了这个组件：
```javascript
Vue.component('my-component', { 

 template: '<p class="foo bar">Hi</p>'
 
 })
```
然后在使用它的时候添加一些 class：
```javascript
<my-component class="baz boo"></my-component>

```
HTML 将被渲染为：
```javascript
<p class="foo bar baz boo">Hi</p>

```
对于带数据绑定 class 也同样适用：
```javascript
<my-component v-bind:class="{ active: isActive }"></my-component>

```
当 `isActive` 为 truthy[[1]](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#footnote-1) 时，HTML 将被渲染成为：
```javascript
<p class="foo bar active">Hi</p>

```

<a name="d2yiu"></a>
## [绑定内联样式](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#绑定内联样式)

> 📌样式对象的key不能瞎写

```html
<title>绑定样式</title>

    <style>
      .basic{
        width: 400px;
        height: 100px;
        border: 1px solid black;
      }
    

      .happy{
        border: 4px solid red;;
        background-color: rgba(255, 255, 0, 0.644);
        background: linear-gradient(30deg,yellow,pink,orange,yellow);
      }
      .sad{
        border: 4px dashed rgb(2, 197, 2);
        background-color: gray;
      }
      .normal{
        background-color: skyblue;
      }

      .atguigu1{
        background-color: yellowgreen;
      }
      .atguigu2{
        font-size: 30px;
        text-shadow:2px 2px 10px red;
      }
      .atguigu3{
        border-radius: 20px;
      }
    </style>

    <script type="text/javascript" src="../js/vue.js"></script>

  </head>

  <body>
    <!-- 准备好一个容器-->
       <!-- 绑定style样式--对象写法 -->
      <div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
      <!-- 绑定style样式--数组写法 -->
      <div class="basic" :style="styleArr">{{name}}</div> 
    </div>

  </body>


  <script type="text/javascript">
    Vue.config.productionTip = false
  

    const vm = new Vue({
      el:'#root',
      data:{
        name:'zhaoxinkun',
         styleObj:{
          fontSize: '40px',
          color:'red',
        },
        styleObj2:{
          backgroundColor:'orange'
        },
        styleArr:[
          {
            fontSize: '40px',
            color:'blue',
          },
          {
            backgroundColor:'gray'
          }
        ]
      },
     })
  </script>



</html>

```

<a name="fIRzd"></a>
### [对象语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1)

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

```
```javascript
data: {

  activeColor: 'red',

  fontSize: 30
}
```
直接绑定到一个样式对象通常更好，这会让模板更清晰：
```html
<div v-bind:style="styleObject"></div>

```
```javascript
data: {

styleObject: { 
   color: 'red',

   fontSize: '13px'

   }
 }
```
同样的，对象语法常常结合返回对象的计算属性使用。

<a name="dlBXl"></a>
### [数组语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#数组语法-1)

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：
```javascript
<div v-bind:style="[baseStyles, overridingStyles]"></div>

```

<a name="qy1iL"></a>
### [自动添加前缀](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#自动添加前缀)

当 `v-bind:style` 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS property 时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

<a name="QR0hH"></a>
### [多重值](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#多重值)

> 2.3.0+

从 2.3.0 起你可以为 `style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。
