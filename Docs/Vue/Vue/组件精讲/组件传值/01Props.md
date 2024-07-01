# Props

<!-- ## 目录

- [Props](#props)
  - [目录](#目录)
  - [父传子数据](#父传子数据)
  - [子传父数据](#子传父数据)
  - [Prop 大小写 ](#prop-大小写-)
  - [Prop 类型](#prop-类型)
  - [Prop 验证](#prop-验证)
  - [传递静态或动态 Prop](#传递静态或动态-prop)
  - [单向数据流](#单向数据流)
  - [非 Prop 的 Attribute](#非-prop-的-attribute)
    - [替换/合并已有的 Attribute](#替换合并已有的-attribute)
    - [禁用 Attribute 继承](#禁用-attribute-继承) -->

> 📌可以实现父传子数据（直接props传递），也可以是实现子传父数据（父组件定义一个方法，然后传过去，子组件props接收并使用方法）

## 父传子数据

> 📌`Vue`的一个配置项,和`el`,`data`等一样,那里是儿子，哪里使用props。原理：父组件通过在子组件的自定义元素上添加属性定义数据，将数据传递给子组件。子组件通过 `props` 选项声明接收的数据

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>Parent Component</h2>
    <!-- 使用子组件，并通过 props 传递数据 -->
    <ChildComponent :message="parentMessage" :count="parentCount"></ChildComponent>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from parent!',
      parentCount: 42
    };
  }
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>Child Component</h3>
    <!-- 显示父组件传递的数据 -->
    <p>{{ message }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  // 声明需要接收的 props
  props: {
    message: String,
    count: Number
  }
};
</script>
```

在上面的例子中，`ParentComponent` 是父组件，它包含了一个子组件 `ChildComponent`。通过使用 `props`，父组件向子组件传递了两个属性：`message` 和 `count`。子组件通过在 `props` 选项中声明需要接收的属性，即可访问父组件传递过来的数据

这里需要注意的几点：

- 在父组件中，通过在子组件标签上使用 `:message="parentMessage"` 和 `:count="parentCount"` 的方式将数据传递给子组件。**一定要加**\*\*`:`\*\***号,这样才会当作表达式处理**
- 在子组件中，通过在 `props` 选项中声明需要接收的属性，例如 `props: { message: String, count: Number }`
- 子组件中可以直接使用 `{{ message }}` 和 `{{ count }}` 来显示接收到的数据

这样，通过 `props`，父子组件之间可以很方便地进行数据传递，实现了组件间的通信

> 📌`prop`的原理就是通过在子组件中声明预期的属性类型和名称，来告诉`Vue`应该从父组件中接收哪些数据。然后父组件通过`v-bind`指令将数据传递到子组件中，并在子组件中通过`props`选项来访问这些数据。

## 子传父数据

> 📌我们想要使用props给父组件传递数据，那么我们就要在父组件创建一个方法，然后`：`传递过去，在子组件使用props接收后就可以直接使用了。原理很简单，你传数据可以，传方法也行啊，都会放在子组件的实例对象VC身上

```vue
//父组件
<template>
  <div class="app">
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
  </div>
</template>

<script>
import School from './components/School'

export default {
  name: 'App',
  components: { School },
  data() {
    return {
    }
  },
  methods: {
    getSchoolName(name) {
      console.log('App收到了学校名：', name)
    }
  },
}
</script>

<style scoped>
.app {
  background-color: gray;
  padding: 5px;
}
</style>

```

```vue
//子组件
<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    //触发事件，事件中包含触发父组件的方法
    <button @click="sendSchoolName">把学校名给App</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  //接收父组件传过来的方法
  props: ['getSchoolName'],
  data() {
    return {
      name: '清华大学',
      address: '北京',
    }
  },
  methods: {
    sendSchoolName() {
    //调用父组件传过来的方法
      this.getSchoolName(this.name)
    }
  },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>
```

## [Prop 大小写 ](https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-的大小写-camelCase-vs-kebab-case "Prop 大小写 ")

`HTML` 中的 `attribute` 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 `DOM `中的模板时，`camelCase `(驼峰命名法) 的 `prop `名需要使用其等价的` kebab-case` (短横线分隔命名) 命名：

```vue
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```vue
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

> 📌重申一次，如果你使用字符串模板，那么这个限制就不存在了。

## [Prop 类型](https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-类型 "Prop 类型")

到这里，我们只看到了以字符串数组形式列出的 `prop`：

```vue
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

> 📌但是，通常你希望每个 `prop `都有指定的值类型。这时，你可以以对象形式列出 `prop`，这些 `property `的名称和值分别是 `prop `各自的名称和类型,注意这是在签收位置,也就是子组件中写的

```vue
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

这不仅为你的组件提供了文档，还会在它们遇到错误的类型时从浏览器的 `JavaScript `控制台提示用户。你会在这个页面接下来的部分看到[类型检查和其它 prop 验证](https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-验证 "类型检查和其它 prop 验证")。

## [Prop 验证](https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-验证 "Prop 验证")

> 📌我们可以为组件的 `prop `指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 `Vue `会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

```vue
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
```

当 `prop `验证失败的时候，(开发环境构建版本的) `Vue `将会产生一个控制台的警告。

> 📌注意那些 `prop `会在一个组件实例创建**之前**进行验证，所以实例的 `property `(如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。

[类型检查](https://v2.cn.vuejs.org/v2/guide/components-props.html#类型检查 "类型检查")

`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

额外的，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```vue
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```vue
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

来验证 `author` `prop `的值是否是通过 `new Person` 创建的。

## [传递静态或动态 Prop](https://v2.cn.vuejs.org/v2/guide/components-props.html#传递静态或动态-Prop "传递静态或动态 Prop")

**表达式求值**：

- 使用 `:` 号表示后面的值是一个 `JavaScript `表达式。
- 如果不使用 `:`，`Vue `会将后面的值作为一个字符串字面量处理。

```vue
<!-- 不使用 :，message 会被当作字符串 "parentMessage" 传递 -->
<child-component message="parentMessage"></child-component>

<!-- 使用 :，message 会被当作变量 parentMessage 的值传递 -->
<child-component :message="parentMessage"></child-component>

```

**动态绑定**：

- `:` 号绑定属性的值可以是动态的，根据父组件的数据变化自动更新。
- 直接传字符串是静态的，不会随着父组件数据的变化而变化。

```vue
<!-- 动态绑定，当 parentMessage 变化时，子组件会自动更新 -->
<child-component :message="parentMessage"></child-component>

<!-- 静态绑定，子组件的 message 始终是 "parentMessage" 字符串 -->
<child-component message="parentMessage"></child-component>
```

[**传入一个布尔值**](https://v2.cn.vuejs.org/v2/guide/components-props.html#传入一个布尔值 "传入一个布尔值")

- 在不使用 `:` 号的情况下，`Vue` 无法识别布尔类型的值，会将其处理为字符串。
- 使用 `:` 可以正确传递布尔值。

```vue
<!-- 布尔值传递，is-active 会被当作字符串 "true" 处理 -->
<child-component is-active="true"></child-component>

<!-- 使用 :，is-active 会被当作布尔值 true 处理 -->
<child-component :is-active="true"></child-component>
```

```vue
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

[**传入一个数字**](https://v2.cn.vuejs.org/v2/guide/components-props.html#传入一个数字 "传入一个数字")

```vue
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

[**传入一个数组**](https://v2.cn.vuejs.org/v2/guide/components-props.html#传入一个数组 "传入一个数组")

```vue
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

[**传入一个对象**](https://v2.cn.vuejs.org/v2/guide/components-props.html#传入一个对象 "传入一个对象")

```vue
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```

[**传入一个对象的所有 property**](https://v2.cn.vuejs.org/v2/guide/components-props.html#传入一个对象的所有-property "传入一个对象的所有 property")

如果你想要将一个对象的所有 `property `都作为 `prop `传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

```vue
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```vue
<blog-post v-bind="post"></blog-post>

```

等价于：

```vue
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

## [单向数据流](https://v2.cn.vuejs.org/v2/guide/components-props.html#单向数据流 "单向数据流")

> 📌所有的 `prop `都使得其父子 `prop `之间形成了一个**单向下行绑定**：父级 `prop `的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解

> 📌需要注意的是，由于`Vue`的单向数据流原则，子组件不能直接修改从父组件中接收到的`prop`值，否则会引发警告,当父组件重新渲染时，数据会被覆盖。如果需要在子组件中修改这些值，应该使用事件机制来与父组件进行通信。或者通过使用 `computed`和数据本地化(在子组件data中也定义一次)

> 📌额外的，每次父级组件发生变更时，子组件中所有的 `prop `都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 `prop`。如果你这样做了，`Vue `会在浏览器的控制台中发出警告

这里有两种常见的试图变更一个 `prop `的情形：

1. \*\*这个`prop `用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 ​`prop `数据来使用。\*\*在这种情况下，最好定义一个本地的`data property` 并将这个 `prop `用作其初始值：
   ```vue
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```
   ```vue
   <template>
     <div>
       <h1>{{ msg }}</h1>
       <h2>学生姓名：{{ name }}</h2>
       <h2>学生性别：{{ sex }}</h2>
       <h2>学生年龄：{{ myAge + 1 }}</h2>
       <button @click="updateAge">尝试修改收到的年龄</button>
     </div>
   </template>

   <script>
   export default {
     name: 'Student',
     data() {
       console.log(this)
       return {
         msg: '我是一个清华的学生',
         myAge: this.age
       }
     },
     methods: {
       updateAge() {
         this.myAge++
       }
     },
     //简单声明接收
     // props:['name','age','sex'] 

     //接收的同时对数据进行类型限制
     /* props:{
       name:String,
       age:Number,
       sex:String
     } */

     //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
     props: {
       name: {
         type: String, //name的类型是字符串
         required: true, //name是必要的
       },
       age: {
         type: Number,
         default: 99 //默认值
       },
       sex: {
         type: String,
         required: true
       }
     }
   }
   </script>
   ```
2. \*\*这个`prop `以一种原始的值传入且需要进行转换。\*\*在这种情况下，最好使用这个`prop `的值来定义一个计算属性：
   ```vue
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```

注意在 `JavaScript `中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 `prop `来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

## [非 Prop 的 Attribute](https://v2.cn.vuejs.org/v2/guide/components-props.html#非-Prop-的-Attribute "非 Prop 的 Attribute")

一个非 `prop `的 `attribute `是指传向一个组件，但是该组件并没有相应 `prop `定义的 `attribute`。

因为显式定义的 `prop `适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 `attribute`，而这些 `attribute` 会被添加到这个组件的根元素上。

例如，想象一下你通过一个 `Bootstrap `插件使用了一个第三方的 `<bootstrap-date-input>` 组件，这个插件需要在其 `<input>` 上用到一个 `data-date-picker` `attribute`。我们可以将这个 `attribute `添加到你的组件实例上：

```vue
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```

然后这个 `data-date-picker="activated"` `attribute `就会自动添加到 `<bootstrap-date-input>` 的根元素上。

### [替换/合并已有的 Attribute](https://v2.cn.vuejs.org/v2/guide/components-props.html#替换-合并已有的-Attribute "替换/合并已有的 Attribute")

想象一下 `<bootstrap-date-input>` 的模板是这样的：

```vue
<input type="date" class="form-control">
```

为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：

```vue
<bootstrap-date-input
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>
```

在这种情况下，我们定义了两个不同的 `class` 的值：

- `form-control`，这是在组件的模板内设置好的
- `date-picker-theme-dark`，这是从组件的父级传入的

> 📌对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 `type="text"` 就会替换掉 `type="date"` 并把它破坏！庆幸的是，`class` 和 `style` attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：`form-control date-picker-theme-dark`。

### [禁用 Attribute 继承](https://v2.cn.vuejs.org/v2/guide/components-props.html#禁用-Attribute-继承 "禁用 Attribute 继承")

如果你**不**希望组件的根元素继承 `attribute`，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```vue
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

这尤其适合配合实例的 `$attrs` `property `使用，该 `property `包含了传递给一个组件的 `attribute `名和 `attribute `值，例如：

```vue
{
  required: true,
  placeholder: 'Enter your username'
}
```

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 `attribute `会被赋予哪个元素。在撰写[基础组件](https://v2.cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐 "基础组件")的时候是常会用到的：

```vue
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

> 📌注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

这个模式允许你在使用基础组件的时候更像是使用原始的 `HTML `元素，而不会担心哪个元素是真正的根元素：

```vue
<base-input
  label="Username:"
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>
```
