# data

<!-- ## 目录

- [data](#data)
  - [目录](#目录)
  - [**类型**介绍](#类型介绍)
  - [关键原理](#关键原理)
  - [编译过程](#编译过程)
    - [Vue2](#vue2)
    - [Vue3](#vue3) -->

> 📌`Vue.js `中的 `data`（Obj/Function）属性是 `Vue `实例的一个配置选项

## **类型**介绍

- **对象式**

  对于根实例或者非复用组件，通常直接提供一个对象字面量作为 `data` 的值。在对象式中，`data`属性是一个普通的对象，并且直接作为组件实例的一个属性
  ```javascript
  // 对象形式 (适用于根实例或非复用组件)
  new Vue({
    data: {
      message: 'Hello, Vue!',
      count: 0,
      user: {
        name: 'John Doe',
        age: 30
      }
    },
    // 其他选项...
  })

  ```
  - 区别：`data` 是一个普通的对象，通过对象属性初始化数据
  - 优点：
    - 语法简洁，直观易懂。可以通过对象字面量的方式一次性定义多个属性，方便管理多个数据。
  - 缺点：
    - 数据共享风险：所有组件实例共享同一个数据对象，如果 `data` **仍然是一个纯粹的对象，当多个组件修改同一个属性时，则所有的实例将共享引用同一个数据对象！可能会造成意外的数据污染，不方便追踪数据的变化来源。**
- 在**函数式**中，`data`属性是一个返回一个对象的函数。对于复用型组件（如.vue文件），推荐使用函数形式来返回一个**新对象实例**
  ```javascript
  // 函数形式 (适用于复用组件)
  Vue.component('my-component', {
    data() {
      return {
        localMessage: 'Hello from Component!'
  //此处的this是Vue实例对象，data函数不能写成箭头函数，不然this会指向window
      };
      }
    },
    // 其他选项...
  })

  ```
  - 区别：`data` 是一个返回包含数据对象的函数
  - 优点：
    - 数据独立性：**每个组件实例都有独立的数据对象，避免了数据共享风险**
    - 可以在函数中进行复杂的数据处理或计算，对数据进行响应式处理
  - 缺点：
    - 代码略显繁琐，\*\*需要使用 \*\*`return` **关键字返回数据对象**
    - 不如对象式写法直观，特别是当需要定义多个属性时，需要书写更多的代码
- **限制：** 组件的定义只接受 `function`
- **访问与更新**：

  在模板中，可以通过 `Mustache `语法 (`{{ }}`) 来显示 `data` 中的数据。同时，`Vue `提供了响应式系统，任何通过`Vue`实例方法或计算属性对 `data` 的更改都会触发相应的视图更新
- **注意事项**：
  - 由`Vue`管理的函数，一定不要写箭头函数，一旦写了箭头函数，`this`就不再是`Vue`实例了。用来定义要在当前`vue`实例中使用的数据

## 关键原理

1. `Vue`实例的数据对象。`Vue`将会递归将`data`的 `property` 转换为 `getter`/`setter`，从而让 `data`的 `property`能够响应数据变化（后续添加的不会有变化，除非使用Vue.\$set）。浏览器 `API`创建的原生对象，原型上的 `property`会被忽略。`vue`对于数组也有特殊的变更检测机制(仅仅是修改数组的几个方法，`vue`进行了重写)
2. 实例创建之后，可以通过 `vm.$data` 访问原始数据对象。`Vue `实例代理了 `data `对象上的所有属性，因此通过 `vm.a` 访问等同于 `vm.$data.a`
3. 以 `_` 或 `$` 开头的 `property`**不会**被 `Vue `实例代理，因为它们可能和 `Vue `内置的 `property`、`API `方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 `property`
4. 通过提供 `data `函数，每次创建一个新实例后，能够调用 `data `函数，以便返回一个全新副本的初始数据对象。如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 来获得原始数据对象的深拷贝

## 编译过程

> 📌Vue.js 中的 `data` 是 `Vue `实例的核心配置选项之一，它用于定义组件或实例的状态（数据）。在`Vue`中，数据与视图是双向绑定的，这意味着当 `data` 中的数据发生变化时，依赖这些数据的`DOM`元素会自动更新；反之，用户对视图中的表单元素进行交互，也会相应地更新 `data` 中的数据

### Vue2

1\. Vue 实例初始化

在创建 Vue 实例时，会调用 `_init` 方法，该方法会初始化各种选项，包括 `data`。

```javascript
Vue.prototype._init = function (options) {
  const vm = this;
  vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {});
  initState(vm);
  // ...
};
```

2\. 初始化状态

`initState` 方法会根据组件选项初始化 `props`、`methods`、`data`、`computed` 和 `watch`。

```javascript
function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  // ...
}
```

3\. 初始化数据

`initData` 方法负责初始化 `data` 选项并将其转换为响应式数据。

```javascript
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm, vm) : data || {};
  for (const key in data) {
    proxy(vm, `_data`, key);
  }
  observe(data, true /* asRootData */);
}
```

4\. 数据代理

`proxy` 方法将 `data` 对象上的属性代理到 Vue 实例上，使得可以通过 `this.property` 直接访问 `data` 中的数据。

```javascript
function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    }
  });
}
```

5\. 数据观察（响应式）

`observe` 方法将数据对象转换为响应式对象，使用 `Observer` 类来实现。

```javascript
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
```

6\. 定义响应式属性

`defineReactive` 方法将对象的每个属性转换为响应式，通过 `Object.defineProperty` 实现。

```javascript
function defineReactive(obj, key, val, customSetter, shallow) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
```

7\. 依赖收集和变化通知

`Dep` 类用于依赖收集和变化通知。

```javascript
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
```

8\. Watcher

`Watcher` 类用于更新视图，当数据变化时调用更新函数。

```javascript
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    this.getter = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    const value = this.get();
    if (value !== this.value) {
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
}
```

以下是一个简单的实现示例：

```javascript
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data();
    this.init();
  }

  init() {
    initState(this);
  }
}

function initState(vm) {
  let data = vm._data;
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  observe(data);
}

function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    }
  });
}

function observe(value) {
  if (!isObject(value)) return;
  new Observer(value);
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    const value = this.get();
    if (value !== this.value) {
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
}

const vm = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    };
  }
});

new Watcher(vm, function () {
  console.log(`Message is: ${this.message}`);
}, (newVal, oldVal) => {
  console.log(`Updated message from ${oldVal} to ${newVal}`);
});

vm.message = 'Hello World!';
```

这个示例展示了 Vue 2 中 `data` 选项的底层实现逻辑，包括响应式系统的核心原理。

### Vue3

Vue 的 `data` 选项底层逻辑主要涉及响应式系统的实现，它包括数据初始化、数据代理、依赖收集和变化通知等。以下是详细的实现过程：

1\. 数据初始化

在 Vue 实例初始化时，会调用 `_init` 方法，其中会初始化组件的 `data` 选项。

```javascript
Vue.prototype._init = function (options) {
  const vm = this;
  // 合并选项
  vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {});
  // 初始化数据
  initState(vm);
  // ...
};
```

2\. 初始化状态

`initState` 方法会根据组件选项初始化 `props`、`methods`、`data`、`computed` 和 `watch`。

```javascript
function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  // ...
}
```

3\. 初始化数据

`initData` 方法负责初始化 `data` 选项并将其转换为响应式数据。

```javascript
function initData(vm) {
  let data = vm.$options.data;
  // 支持函数形式的 data
  data = vm._data = typeof data === 'function' ? data.call(vm, vm) : data || {};
  // 将 data 代理到 vm 上
  for (const key in data) {
    proxy(vm, `_data`, key);
  }
  // 观察数据，转换为响应式
  observe(data, true);
}
```

4\. 数据代理

`proxy` 方法将 `data` 对象上的属性代理到 Vue 实例上，使得可以通过 `this.property` 直接访问 `data` 中的数据。

```javascript
function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    }
  });
}
```

5\. 数据观察（响应式）

`observe` 方法将数据对象转换为响应式对象，使用 `Observer` 类来实现。

```javascript
function observe(value, asRootData) {
  if (!isObject(value)) return;
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      // 处理数组
      protoAugment(value, arrayMethods);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    for (const key in obj) {
      defineReactive(obj, key);
    }
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
```

6\. 定义响应式属性

`defineReactive` 方法将对象的每个属性转换为响应式，通过 `Object.defineProperty` 实现。

```javascript
function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) return;
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}
```

7\. 依赖收集和变化通知

`Dep` 类用于依赖收集和变化通知。

```javascript
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
```

8\. Watcher

`Watcher` 类用于更新视图，当数据变化时调用更新函数。

```javascript
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    this.getter = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    const value = this.get();
    if (value !== this.value) {
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
}
```

以下是一个简单的实现示例：

```javascript
// 模拟 Vue
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data();
    this.init();
  }

  init() {
    initState(this);
  }
}

function initState(vm) {
  let data = vm._data;
  // 代理
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  // 观察数据
  observe(data);
}

function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    }
  });
}

function observe(value) {
  if (!isObject(value)) return;
  new Observer(value);
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      // 处理数组
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    const value = this.get();
    if (value !== this.value) {
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
}

// 使用示例
const vm = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    };
  }
});

new Watcher(vm, function () {
  console.log(`Message is: ${this.message}`);
}, (newVal, oldVal) => {
  console.log(`Updated message from ${oldVal} to ${newVal}`);
});

vm.message = 'Hello World!';
```
