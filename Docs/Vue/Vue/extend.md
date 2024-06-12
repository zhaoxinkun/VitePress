# extend

<!-- ## 目录

- [extend](#extend)
  - [目录](#目录)
  - [动态使用](#动态使用)
  - [全局使用](#全局使用)
  - [组件传值`propsData` ](#组件传值propsdata-) -->

> 📌`Vue.extend` 是一个方法，用于创建一个扩展实例构造器，而不是一个实例。通过调用 `Vue.extend`，你可以创建一个可复用的 `Vue `组件构造函数。这个构造函数可以像普通的 `Vue `构造函数一样，通过 `new` 关键字创建实例。返回的都是一个全新的`VueComponent`！！！！

1. **调用 ****`Vue.extend`**** 方法**：将选项对象传递给 `Vue.extend` 方法，返回一个组件构造函数。
2. **定义组件选项对象**：创建一个包含组件配置的选项对象，类似于创建 `Vue `实例时的配置。
3. **注册组件**：将创建的组件构造函数注册为全局组件或局部组件。
4. **使用组件**：在模板中使用定义好的组件。
5. \*\*当需要创建一个复杂的组件，特别是需要在运行时动态生成组件实例时，可以使用 \*\*`Vue.extend`。
6. **组件内容属性需要继承时一定要使用**`extend`
7. 使用`Vue.extend(options)`创建，其中`options`和`new Vue(options)`时传入的那个`options`几乎一样，但也有点区别；
   - &#x20;`el`不要写，为什么？ ——— 最终所有的组件都要经过一个`vm`的管理，由`vm`中的`el`决定服务哪个容器。&#x20;
   - `data`必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。 备注：使用`template`可以配置组件结构。
8. **什么时候使用extend关键字，其实我们可以不使用的，但是动态创建（想在哪里使用就哪里使用）或者使用组件（****想什么时候用就什么时候使用，不拘泥****），或者对于组件的继承和大量的生成组件的时候使用，就相当于创建了一个构造函数供你使用**

```javascript
// 使用 Vue.extend 创建一个新的组件类
const MyComponent = Vue.extend({
  template: '<div>Hello, {{ name }}!</div>',
  data() {
    return {
      name: 'Vue'
    };
  }
});

// 创建 Vue 实例，并将 MyComponent 注册为局部组件
new Vue({
  el: '#app',
  components: {
    'my-component': MyComponent
  },
  template: `
    <div>
      <h1>Hello from Parent Component!</h1>
      <my-component></my-component>
    </div>
  `
});

-------------------------------------------------------

//或者 扩展组件
const MyComponentOptions = {
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    greet() {
      alert(this.message);
    }
  }
};

const MyComponent = Vue.extend(MyComponentOptions);

```

## 动态使用

> 📌创建后，随时随地创建组件实例，`extend`创建的可以理解为一个组件的构造函数

```javascript
// 创建一个组件构造函数,并在不同的时候使用它
const MyComponent = Vue.extend({
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello from MyComponent!'
    };
  }
});

// 创建组件实例
const componentInstance = new MyComponent().$mount();
document.body.appendChild(componentInstance.$el);
```

```javascript
//动态创建组件实例
const MyComponent = Vue.extend({
  template: '<div>Hello, {{ name }}!</div>',
  data() {
    return {
      name: 'Dynamic Vue'
    };
  }
});

// 创建 Vue 实例
const app = new Vue({
  el: '#app',
  template: '<div><button @click="createComponent">Create Component</button><div ref="container"></div></div>',
  methods: {
    createComponent() {
      // 动态创建 MyComponent 实例，并挂载到 DOM 中
      const componentInstance = new MyComponent();
      componentInstance.$mount();
      this.$refs.container.appendChild(componentInstance.$el);
    }
  }
});
```

## 全局使用

```javascript
// 创建一个组件构造函数
const MyComponent = Vue.extend({
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello from MyComponent!'
    };
  }
});

// 注册全局组件
Vue.component('my-component', MyComponent);

new Vue({
  el: '#app',
  template: '<my-component></my-component>'
});

```

## 组件传值`propsData`&#x20;

在 `Vue `中，组件之间的数据传递主要通过 `props`（父传子）和自定义事件（子传父）来实现。对于通过 `Vue.extend` 创建的组件实例，你可以使用 `propsData` 选项来传递初始化数据。

以下是一个简单的示例，演示了如何通过 `propsData` 传递数据给动态创建的组件实例：

- **限制**：`propsData` 只用于 `new` 创建的实例中。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Dynamic Component</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
</head>
<body>

<div id="app"></div>

<script>
 // 创建组件构造函数
const MyComponentConstructor = Vue.extend({
  template: '<div>{{ message }}</div>',
  props: ['message']
}); 

 // 创建组件实例，并传递初始化数据
const dynamicComponentInstance = new MyComponentConstructor({
  propsData: {
    message: 'Hello from propsData!'
  }
}); 

// 挂载到 #app 元素上
dynamicComponentInstance.$mount('#app');
</script>

</body>
</html>
```

在这个例子中，通过 `props: ['message']` 在组件构造函数中声明了一个名为 `message` 的 `prop`。然后，通过 `propsData` 选项将初始化数据传递给组件实例。

请注意，`propsData` 是在创建组件实例时传递的一个选项，用于初始化组件的 `props`。在实际应用中，你可以根据组件需要的 `prop `进行设置。
