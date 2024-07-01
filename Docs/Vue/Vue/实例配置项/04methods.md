# methods

<!-- ## 目录

- [methods](#methods)
  - [目录](#目录)
  - [基本原理](#基本原理)
  - [传递参数](#传递参数) -->

> 📌`Vue.js` 中的 `Methods`（Objrct）属性是 `Vue `实例的一个配置选项。只要数据更新就会调用

> 📌在`Vue.js`中，`methods` 是组件选项之一，它用于定义一组可复用的函数（方法），这些方法可以包含任意`JavaScript`逻辑，并且可以在模板、计算属性、生命周期钩子和其他方法内部调用，主要用于处理用户的交互操作和事件处理。`Vue`实例或组件实例中的 `methods` 属性是一个对象，其属性名是方法名，值是对应回调函数。没有进行数据代理

> 📌 `methods `将被混入到 `Vue `实例中。`Vue.js` 中的方法内的 `this` 关键字指向当前`Vue`实例，因此可以通过 `this` 访问组件的 `data`、`computed`、`methods` 等属性和方法。可以直接通过 `VM `实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 `Vue` 实例。注意，不应该使用箭头函数来定义 `method `函数 (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 `undefined`

```javascript
// 在Vue实例或组件中定义methods
var vm = new Vue({
  data: {
    message: 'Hello'
  },
  methods: {
    // 定义一个方法
    greet: function(name) {
      return this.message + ', ' + name;
    },
    // 另一个方法
    changeMessage: function(newMessage) {
      this.message = newMessage; // 这里可以直接通过this访问data属性
    }
    //es6写法
     plus() {
      this.message
    },
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});

// 调用方法
console.log(vm.greet('World')); // 输出 "Hello, World"
vm.changeMessage('Hi'); // 更新message数据，视图也会相应地更新
```

> 📌在模板中，你可以使用表达式或者`v-on`指令来调用这些方法：（可以使用事件绑定或指令调用方式）

```html
<!-- 在模板中调用methods -->
<button v-on:click="changeMessage('New Message')">Change Message</button>
<p>{{ greet('User') }}</p>

//事件绑定方式：
<button @click="increment">增加</button>
<button @click="decrement">减少</button>

//指令调用方式
<button v-on:click="increment">增加</button>
<button v-on:click="decrement">减少</button>

```

当点击按钮时，`changeMessage` 方法会被调用，从而改变 `data` 中的 `message` 值；同时，在渲染输出中，`greet` 方法会根据传入的参数动态生成问候语句

> 📌在方法中访问组件实例的数据和其他方法，可以使用 `this` 关键字。因为我们数据存在Vue这个模型中

```javascript
methods: {
  increment() {
    this.count++; // 访问组件的 count 数据
    this.someOtherMethod(); // 调用其他方法
  },
  someOtherMethod() {
    // 执行其他逻辑
  }
}
```

通过 `methods` 可以将常见的操作逻辑封装为组件内的方法，并在模板中调用这些方法来实现相应的功能。可以访问组件的数据属性和其他方法，以及执行其他必要的操作。

## 基本原理

> 📌在`Vue.js`中，`methods`是通过Vue实例的`_init`方法在初始化过程中添加到实例中的。`methods`对象中的每个属性都是一个函数，这些函数被添加到`Vue`实例中，成为实例的方法

以下是简化的实现原理：

- 实例化过程： 当创建`Vue`实例时，`Vue`会调用其构造函数，构造函数中会调用`this._init(options)`来进行初始化
- 初始化过程： 在`_init`方法中，`Vue`会处理配置项，其中包括`methods`
- `methods`处理： `Vue`会遍历`methods`对象，将每个属性名和对应的函数绑定到`Vue`实例上。这样，`methods`中的每个方法都成为了`Vue`实例的一个成员方法

以下是一个简化的伪代码示例，演示了`methods`是如何在Vue实例中实现的：

```javascript
function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function(options) {
  // 其他初始化步骤...

  // 处理 methods
  if (options.methods) {
    initMethods(this, options.methods);
  }

  // 其他初始化步骤...
};

function initMethods(vm, methods) {
  // 遍历 methods 对象
  for (const key in methods) {
    if (methods.hasOwnProperty(key)) {
      // 将每个方法绑定到 Vue 实例上
      vm[key] = methods[key];
    }
  }
}

// 示例
const vm = new Vue({
  methods: {
    greet() {
      console.log('Hello, Vue!');
    }
  }
});

// 可以调用方法
vm.greet(); // 输出 'Hello, Vue!'
```

这是一个简单的实现，真实的Vue.js源码包含更多的细节和处理，但上述伪代码演示了`methods`是如何在Vue实例中添加和实现的。

## 传递参数

> 📌在 `methods` 中，你可以定义一个方法，然后在模板中调用该方法，并传递参数。例如：

```vue
<template>
  <div>
    <button @click="multiply(2, 3)">Multiply</button>
  </div>
</template>

<script>
export default {
  methods: {
    multiply(a, b) {
      console.log(a * b);
    }
  }
};
</script>

```

上面的例子中，`multiply` 方法接受两个参数 `a` 和 `b`，并在点击按钮时进行相乘操作。
