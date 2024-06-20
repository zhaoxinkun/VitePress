
> 📌`Vue.js` 中的 `computed` （Object）属性是 `Vue`实例的一个配置选项。**只有依赖项更新才会重新调用**


<a name="b0e86cdf"></a>
## [计算属性](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

> 📌`computed` 属性的值是根据其他属性计算而来的，而且在相同的数据输入下，`**computed**`** 的输出会被缓存，避免重复计算。**`computed`的主要用途是提供一个派生的数据属性，它依赖于其他数据的变化而自动更新。**没有进行数据代理。** 不能接收额外参数：计算属性只能依赖于其他响应式数据，无法直接接收额外的参数

> 📌虽然 `computed` 没有数据代理，但是你仍然可以通过 `this.$data` 访问组件实例的数据属性，以及通过 `this.$options.computed` 访问计算属性。在大多数情况下，这种方式足够灵活，并且有助于保持性能。如果你确实需要在组件实例上动态添加属性，你可以使用 `Vue.set` 或 `this.$set` 方法


模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：
```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```
在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中的多处包含此翻转字符串时，就会更加难以处理。所以，对于任何复杂逻辑，你都应当使用计算属性
```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
   computed:  {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```
你可以打开浏览器的控制台，自行修改例子中的 vm。`vm.reversedMessage` 的值始终取决于 `vm.message` 的值
> 📌注意：原理：底层借助了`Objcet`.`defineproperty`方法提供的`getter`和`setter`。计算属性最终会出现在`vm`上（被混入到 `Vue`实例中），直接读取使用即可；但是，绝对不会出现在`_data`身上，不会为它做数据代理的。所有 `getter`和 `setter`的 this 上下文自动地绑定为 `Vue`实例。注意如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问

> 📌你可以像绑定普通 `property`一样在模板中绑定计算属性。Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 `getter`函数是没有副作用 (side effect) 的，这使它更易于测试和理解


<a name="d32ae16d"></a>
### 完整写法

```javascript
computed: {
  propertyName: {
    get() {
      // 计算属性的 getter
      // 返回计算属性的值
    },
    set(value) {
      // 计算属性的 setter
      // 在属性被赋值时执行的操作
    }
  }
}
```
> 在完整写法中，`computed` 对象中的每个属性都是一个对象，包含 `get` 和 `set` 方法。`get` 方法用于计算属性的获取值逻辑，而 `set` 方法用于计算属性的设置值逻辑


<a name="77e5bf1f"></a>
### 简写形式

```javascript
computed: {
  propertyName() {
    // 计算属性的 getter
    // 返回计算属性的值
  }
}
```
> 在简写形式中，只定义了计算属性的 `getter`，没有定义 `setter`。这种简写形式适用于只需要计算属性的 `getter`，而不需要 `setter`的情况


<a name="078e06bb"></a>
## 传递参数

> 📌在 `computed` 属性中，它们通常是不直接接受参数的，**但你可以通过定义一个包装函数，返回一个函数，并在返回的函数中进行操作。这样，你就可以在模板中像调用函数一样使用它，并传递参数**

```vue
<template>
  <div>
    <p>{{ multiplied(2, 3) }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    multiplied() {
      return (a, b) => {
        return a * b;
      };
    }
  }
};
</script>
```
在这个例子中，`multiplied` 是一个计算属性，返回一个函数，然后在模板中调用该函数并传递参数

<a name="413115d1"></a>
## [计算属性setter](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%9A%84-setter)

计算属性默认只有 `getter`，不过在需要时你也可以提供一个 `setter`：

> 📌**以_num下划线开头的属性都属于私有属性**

> 📌**计算属性，默认情况下不允许被修改，直接修改，会被`vue`警告：缺少`setter`功能，如果需要单独控制计算属性的访问器`getter`和控制器`setter`，那么需要将当前计算属性写成对象形式，对象内的`get`方法为`getter`，`set`方法为`setter`。且`set`中要引起计算时依赖的数据发生改变。当计算属性含有`Set`****的时候禁止使用简写形式**

当你使用计算属性（`computed`）时，通常你会定义一个 `getter`函数，该函数用于计算属性的值。然而，计算属性也可以同时包含一个可选的 `setter`函数，允许你在对计算属性进行赋值时执行一些操作。下面是一个例子：
```vue
<template>
  <div>
    <p>Original Message: {{ originalMessage }}</p>
    <p>Reversed Message: {{ reversedMessage }}</p>
    <input v-model="reversedMessage">
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  computed: {
    originalMessage() {
      return this.message;
    },
    reversedMessage: {
      get() {
        // 计算属性的 getter，用于获取计算后的值
        return this.message.split('').reverse().join('');
      },
      set(newValue) {
        // 计算属性的 setter，在对计算属性进行赋值时执行
        this.message = newValue.split('').reverse().join('');
      }
    }
  }
};
</script>
```
在这个例子中，有一个计算属性 `reversedMessage`，它包含了一个 `getter`和一个 `setter`。当你在输入框中修改 `reversedMessage` 时，实际上是在修改 `message`。这是因为 `setter`函数将逆转后的字符串再次逆转，最终还原为原始的字符串，然后将其赋值给 `message`<br />这个例子中的 `setter`主要用于演示计算属性的 `setter`如何工作。在实际应用中，你可以在 `setter`中执行一些自定义的逻辑，例如根据用户输入更新其他相关的数据

<a name="a308300d"></a>
## [计算属性vs 方法](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95)

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：
```javascript
<p>Reversed message: "{{ reversedMessage() }}"</p>

// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
> 📌我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。而方法在每次调用时都会执行，不会有缓存

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：
```javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数
> 📌**我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代**



在Vue.js中，`computed` 和 `methods` 是两种用于处理视图逻辑的方式，下面是它们之间的区别：

1. 响应性： 
   - `computed`：是基于依赖的响应式数据进行计算，**并缓存计算结果。只有当依赖的数据发生变化时，才会重新计算计算属性。计算属性会自动追踪依赖，当依赖发生改变时，会自动更新计算属性的值**
   - `methods`：是简单的函数，并且**不具备响应性。每当方法被调用时，都会执行其中的代码** **，** 但不会自动追踪依赖或自动更新视图
2. 缓存： 
   - `computed`：计算属性会缓存计算结果，**只有当依赖发生改变时，才会重新计算。****如果多个地方都使用了该计算属性，则只会计算一次，并复用之前的计算结果**
   - `methods`：每次调用方法时都会**重新执行其中的代码，不会缓存结果**
3. 使用方式： 
   - `computed`：通过在`Vue`实例上的 `computed`** 选项中定义计算属性，可以像读取普通属性一样在模板中使用
   - `methods`：通过在`Vue`实例上的 `methods`** 选项中定义方法，可以在模板中通过方法名调用
4. 适用场景： 
   - `computed`：**适用于需要基于已有的响应式数据进行计算和衍生的场景**。比如对数据进行过滤、排序、计数等操作
   - `methods`：**适用于需要对事件进行处理、进行复杂计算或操作非响应式数据的场景，或者需要手动触发调用的情况**

一般来说，如果需要根据已有的响应式数据进行计算或衍生，并且结果需要在多个地方复用，最好使用 `computed`。而如果需要进行异步操作、处理事件或需要手动触发调用方法，则使用 `methods` 更合适。根据具体的需求选择合适的方式可以提高代码的可读性和可维护性

<a name="c95a49ba"></a>
## [计算属性 vs 侦听属性](https://v2.cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)

> 📌两个重要的小原则：<br />1.所被`Vue`管理的函数，最好写成普通函数，这样`this`的指向才是`vm`或 组件实例对象<br />2.所有不被`Vue`所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数<br />  这样`this的`指向才是`vm`**或 组件实例对象**

> 📌`Vue`提供了一种更通用的方式来观察和响应 `Vue`实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 `AngularJS`。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```javascript
<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
上面代码是命令式且重复的。将它与计算属性的版本进行比较：
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```


在Vue.js中，`computed` 和 `watch` 是两种常用的响应式数据处理方式，它们之间的区别包括以下几个方面：

1. 用法： 
   - `computed`：通过定义计算属性，基于已有的响应式数据进行计算，并返回计算结果。计算属性是通过在Vue实例中添加一个 `computed` **对象来定义的**
   - `watch`：通过监听数据的变化来执行一些操作。可以监听单个数据的变化，或者是多个数据的变化。**监听是通过在Vue实例中添加一个 **`watch`** 对象来定义的**
2. 响应方式： 
   - `computed`：根据依赖的响应式数据动态计算结果，**并缓存计算结果。只有在依赖的响应式数据发生变化时，才会重新计算**
   - `watch`：监听指定的数据变化，**当数据发生变化时，触发相应的回调函数进行操作，可以立即执行特定的代码**
3. 适用场景： 
   - `computed`：适用于需要根据**已有数据进行复杂计算或处理的场景**。比如根据一组商品价格计算总价，或者根据用户输入的搜索关键字过滤数据等
   - `watch`：适用于需要在数据变化时**执行异步操作或执行一些开销较大的操作**的场景。比如监听输入框的变化，发送异步请求获取数据，或者监听深层对象的变化等
4. 返回值： 
   - `computed`：计算属性会**返回计算结果**，类似于普通的属性值，可以直接在模板中使用。
   - `watch`：监视属性不会直接返回结果，而是**触发回调函数执行一些操作**

总的来说，`computed` 适用于计算结果依赖响应式数据且需要被缓存的场景，而 `watch` 适用于监听数据变化并执行一些特定操作的场景
