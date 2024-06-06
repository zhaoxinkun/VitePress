# watch

<!-- ## 目录

- [Watch](#Watch)
- [传递参数](#传递参数)
- [\$watch](#watch)
- [两者区别](#两者区别)
- [Watcher](#Watcher) -->

> 📌Vue.js 中的 `watch`（Object）属性是 Vue 实例的一个配置选项。

> 两种写法 (1).`new Vue`时传入`watch`配置 明确知道监视谁(2).通过`vm.$watch`监视  不太清楚，后期添加

## Watch

> 📌`watch` 是 `Vue `实例的一个配置选项，用于监听`Vue `实例指定监听一个或多个数据的变化，并在数据变化时执行相应的异步或复杂操作，例如发起网络请求、执行一些计算等。`watch` 的**主要用途是在数据变化时执行一些副作用，而不直接返回一个新的值**。它是一个对象，可以包含多个属性，每个属性对应一个要监听的数据，并指定当数据变化时执行的回调函数。（`watch` 可以执行异步任务）键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。`Vue `实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个 `property`。

> 📌虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 `Vue `通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

> 📌注意，不应该使用箭头函数来定义 `watcher `函数 (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 `Vue `实例，`this.updateAutocomplete` 将是 `undefined`。

基本语法:

- 属性名: 需要监听的属性名，可以是单个属性或使用点语法来监听嵌套属性。
- 处理函数: 当被监听的属性发生变化时，会触发相应的处理函数。处理函数可以是一个普通函数或者是一个计算属性的名称。
- 深度监听: 通过设置`deep`属性为`true`来进行深度监听，即监听嵌套对象的变化。嵌套对象，对象名是`key`，内容是`value`的话，其实监视的是`value`的内存地址，所以不会去帮你监听内部的变化，所以才有了`deep`

注意事项:

1. `Vue`自身可以监测对象内部值的改变，但`Vue`提供的`watch` 默认不可以！
   - `Vue `的响应式系统能够自动追踪对象内部属性的变化，不管这些属性是嵌套的还是平级的。也就是说，如果你在 `Vue `实例的 `data` 选项中定义了一个对象，那么这个对象的内部属性发生变化时，`Vue `都能够自动监测并更新视图。
     ```html
     <div id="app">
       <p>{{ user.name }}</p>
       <p>{{ user.age }}</p>
     </div>

     <script>
     new Vue({
       el: '#app',
       data() {
         return {
           user: {
             name: 'John',
             age: 30
           }
         }
       },
       mounted() {
         // 这些变化都会自动被 Vue 监测到并更新视图
         this.user.name = 'Jane';
         this.user.age = 31;
       }
     });
     </script>
     ```
     在这个例子中，无论 `user.name` 还是 `user.age` 发生变化，`Vue `都会自动更新相应的 `DOM `元素。

     但是如果用`watch`,如果不是整体替换掉原本的对象,那么`watch`就不会触发
     ```javascript
     new Vue({
       el: '#app',
       data() {
         return {
           user: {
             name: 'John',
             age: 30
           }
         }
       },
       watch: {
         user(newVal, oldVal) {
           console.log('User changed');
         }
       },
       mounted() {
         // 这不会触发上面的 watch 回调，因为 user 的引用没有改变
         this.user.name = 'Jane';
         this.user.age = 31;

         // 这会触发上面的 watch 回调，因为 user 的引用改变了
         this.user = {
           name: 'Doe',
           age: 32
         };
       }
     });

     ```
     当你执行 `this.user.name = 'Jane';` 和 `this.user.age = 31;` 时，你只是改变了 `user` 对象的属性，而不是 `user` 对象本身的引用。此时，`user` 对象在内存中的位置没有改变，因此 Vue 的 `watch` 回调不会被触发。

     相反，当你执行 `this.user = { name: 'Doe', age: 32 };` 时，你创建了一个新的对象并将它赋值给 `this.user`。这意味着 `this.user` 现在指向了一个新的对象，旧的对象引用被替换了。这时，`user` 对象的引用发生了改变，所以 Vue 的 `watch` 回调会被触发。
     而且如果你就像监测第一及的这种对象属性的变化,就需要用到`deep`
   ```javascript
   new Vue({
     el: '#app',
     data() {
       return {
         user: {
           name: 'John',
           age: 30
         }
       }
     },
     watch: {
       user: {
         handler(newVal, oldVal) {
           console.log('User changed', newVal, oldVal);
         },
         deep: true
       }
     },
     mounted() {
       // 这会触发 watch 回调，因为 deep 选项监视到 user 对象的属性变化
       this.user.name = 'Jane';
       this.user.age = 31;

       // 这也会触发 watch 回调，因为 user 的引用改变了
       this.user = {
         name: 'Doe',
         age: 32
       };
     }
   });

   ```
2. \*\*`Vue 2.x `\*\***能够监视到对象已有属性的变化，但对对象新增的属性或删除的属性无法监视。想要观测到，后续会有**`set`**方法和**`delete`**方法**
   ```javascript
   // Vue 2.x 示例
   new Vue({
     data() {
       return {
         user: {
           name: 'John',
           age: 30
         }
       }
     },
     mounted() {
       // 使用 Vue.set 来添加属性，使其响应式
       this.$set(this.user, 'gender', 'male');
       // 或者 Vue.set
       Vue.set(this.user, 'gender', 'male');

       // 使用 Vue.delete 来删除属性
       this.$delete(this.user, 'age');
       // 或者 Vue.delete
       Vue.delete(this.user, 'age');
     }
   });

   ```
3. `Vue 3.x `使用了基于 `Proxy` 的新响应式系统，它能够完全监视嵌套对象的数据变化，包括属性的添加和删除。
4. `watch`选项可以对单个数据或计算属性进行监听，也可以监听嵌套的属性以及数组和对象的变化。
   - 示例：
     ```javascript
     // 在组件选项中使用 watch
     export default {
       data() {
         return {
           a: '初始值',
           message: '初始值',
           b: { c: '深层次值' }
         };
       },
       watch: {
      // 监听普通数据属性 
         a(newVal, oldVal) {
           console.log('a 的新值:', newVal);
           console.log('a 的旧值:', oldVal);
         },
         // 监听message属性的变化
         message(newVal, oldVal) {
           console.log('新值：', newVal);
           console.log('旧值：', oldVal);
           // 在这里执行当message发生变化时的自定义逻辑
         }
       }
      // 深度监听对象属性的变化 
         b: {
           handler(newVal, oldVal) {
             // 这里可以检测到对象内部任何层级属性的变化
           },
           deep: true // 开启深度监听
         },
         // 使用字符串形式监听深层次属性或复杂表达式结果
         'b.c': function(newVal, oldVal) {
           // 当 b.c 改变时触发
         }
       }
     };

      //监听计算属性的变化 
     computed: {
       fullName() {
         return this.firstName + ' ' + this.lastName;
       }
     },
     watch: {
       fullName(newValue, oldValue) {
         // 响应 fullName 的变化
         // 执行自定义逻辑
       }
     }

      //监听多个属性 
     watch: {
       'obj.propertyA'() {
         // 响应 obj.propertyA 的变化
         // 执行自定义逻辑
       },
       'obj.propertyB'() {
         // 响应 obj.propertyB 的变化
         // 执行自定义逻辑
       }
     }
     亦或：
     watch: {
       'inputValue, nestedObject.property': function(newValue) {
         console.log('输入值或嵌套属性发生变化：', newValue);
       }
     }
     ```
5. 深度监听/立即执行
   - `deep`属性：作用：深度监听嵌套对象或数组的变化。
   - `immediate`作用：立即触发监听函数，而不需要等待被监听的数据发生变化。
   ```vue
   new Vue({
     data: {
       user: {
         firstName: 'John',
         lastName: 'Doe'
       }
     },
     watch: {
       // 深度监听对象的变化
       user: {
         handler(newVal, oldVal) {
           // 当user对象中的任何属性发生变化时，此回调将被调用
         },
         deep: true // 开启深度监听，监听嵌套对象内部属性的变化
       },
       // 立即执行一次watcher
       anotherProperty: {
         handler(newValue) {
           // ...
         },
         immediate: true // 创建Vue实例后立即执行一次这个watcher
       }
     }
   });

    //监视多级结构中某个属性的变化 
    'numbers.a':{
     handler(){
       console.log('a被改变了')
     }
   }

    //监视多级结构中所有属性的变化 
   numbers:{
     deep:true,
     handler(){
       console.log('numbers改变了')
     }
   }
   ```

- 简写
  ```javascript
  watch:{
    //正常写法
     isHot:{
      // immediate:true, //初始化时让handler调用一下
      // deep:true,//深度监视
      handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
      }
    }, 
    
    //简写
     isHot(newValue,oldValue){
      console.log('isHot被修改了',newValue,oldValue,this)
    } 
  }
  ```

## 传递参数

在 `Vue `中，`watch` 选项是用于观察数据变化并执行相应操作的地方，它通常用于监听某个特定属性的变化。虽然 `watch` 直接在选项中定义时不能直接接受参数，但你可以采用一些其他的方式来实现参数的传递。

> 📌一种常见的方法是使用函数形式的 `watch`，该函数接受两个参数，新值和旧值，然后在函数内部处理逻辑。在这个函数内部，你可以访问组件的其他属性或方法，实现参数的传递。

```vue
<template>
  <div>
    <!-- template content -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueToWatch: 0,
      parameter: 42
    };
  },
  watch: {
    valueToWatch(newValue, oldValue) {
      // 使用 this.parameter 获取传递的参数
      this.handleValueChange(newValue, oldValue, this.parameter);
    }
  },
  methods: {
    handleValueChange(newValue, oldValue, parameter) {
      console.log(`Value changed. New value: ${newValue}, Old value: ${oldValue}, Parameter: ${parameter}`);
    }
  }
};
</script>

```

在上面的例子中，`watch` 的回调函数内部调用了 `handleValueChange` 方法，并将 `this.parameter` 作为参数传递进去。

## \$watch

> 📌`$watch` 是 `Vue `实例的方法，用于在运行时动态地监听一个表达式或函数的变化。与 `watch` 配置选项不同，`$watch` 允许在组件实例创建后动态添加新的监听器，并且可以在任何地方使用，而不仅仅局限于组件选项中。它返回一个取消观察的函数

- 是`Vue`实例的方法，需要在`Vue`实例上直接调用。可以在运行时动态添加或移除侦听器。它可以用来监视任何响应式的数据，包括计算属性的结果或者任意返回值的函数。
- 它是一个更底层的`API`，可以用来对`Vue`实例的数据进行监听。
- `$watch`**方法接收三个参数：要监听的表达式、回调函数和选项对象（可选）。**
- `$watch`**方法返回一个解除监听的函数，可以通过调用该函数来停止监听。**
- 示例：
  ```javascript
  const vm = new Vue({
    data: {
      count: 0
    }
  });

  const unwatch = vm.$watch('count', (newVal, oldVal) => {
    console.log('Count changed:', newVal);
  });

  // 取消观察
  unwatch();

  ```
  ```javascript
  export default {
    data() {
      return {
        a: '初始值'
      };
    },
    mounted() {
      // 在实例上动态添加一个监听器
      this.$watch('a', function(newVal, oldVal) {
        console.log('a 的新值:', newVal);
        console.log('a 的旧值:', oldVal);
      }, {
        // 可以传入配置项
        immediate: true // 立即执行一次
        deep: true // 开启深度监听
      });

      // 监听一个计算属性或者任意函数的结果
      this.$watch(
        () => this.a + this.b, 
        (newVal, oldVal) => {
          // 当这个组合逻辑的结果改变时触发
        }
      );
    },
    beforeDestroy() {
      // 移除监听器
      this.$watch('a', null);
    }
  };
  ```
- 简写
  ```javascript
  //正常写法
   vm.$watch('isHot',{
    immediate:true, //初始化时让handler调用一下
    deep:true,//深度监视
    handler(newValue,oldValue){
      console.log('isHot被修改了',newValue,oldValue)
    }
  }) 

  //简写
  vm.$watch('isHot',funciton(newValue,oldValue){
    console.log('isHot被修改了',newValue,oldValue,this)
    }) 
  ```

总结一下，`watch`是`Vue`提供的组件选项，用于声明式地监听数据的变化，而`$watch`是`Vue`实例的方法，用于编程式地监听数据的变化。

- `watch` 是在组件定义阶段静态声明的，适用于在整个组件生命周期内都需要监听特定属性的情况。
- `$watch` 提供了更灵活的方式，在组件的任意时刻动态地添加或移除监听器，可以用来监听复杂的逻辑结果或者是临时需要的特定数据变化。
- 两者都支持深度监听（`deep`）和立即执行（`immediate`）等可选配置项。

## 两者区别

`$watch` 和 `watch` 在 `Vue `中都用于监视数据变化，但是它们的使用方式和场景略有不同：

1. \$watch：
   - `$watch` 是 Vue 实例对象的一个方法，可以通过 `this.$watch` 或 `vm.$watch` 调用。
   - `$watch` 的第一个参数是要监视的数据或表达式，第二个参数是回调函数，用于处理数据变化时的逻辑。
   - `$watch` 还接受一个可选的选项对象，用于配置更多的参数，如 `immediate`、`deep `等。
   - `$watch` 适用于对 `Vue `实例中的数据或计算属性进行监视，是手动创建响应式 `Watcher `的一种方式。
2. watch 选项：
   - `watch` 选项是 `Vue `组件中的一个选项，用于监听组件内部数据的变化。
   - `watch` 选项的值是一个对象，对象的每个属性都是要监听的数据或表达式，属性值是对应的回调函数，用于处理数据变化时的逻辑。
   - `watch` 选项可以监听组件中任意数据的变化，包括 `data `中的数据、计算属性、`props `等。
   - `watch` 选项的使用范围局限于 `Vue `组件内部，用于监听组件内部数据的变化，并执行相应的逻辑。

总的来说，`$watch` 适用于 `Vue `实例，用于手动创建响应式 `Watcher`，而 `watch` 选项适用于 `Vue `组件，用于在组件内部监听数据的变化。通常情况下，如果你需要在 `Vue `实例外部或在全局范围内监视数据的变化，可以使用 `$watch` 方法；如果你需要在组件内部监听组件数据的变化，可以使用 `watch` 选项。

## Watcher

> 📌`Watcher` 是 `Vue `内部使用的一个类，它用于监听数据变化并执行相应的回调函数。每个组件实例都有一个 `Watcher` 实例，用于跟踪该组件与数据的关联。这个 `Watcher `实例会订阅组件实例中使用了响应式数据的表达式或计算属性，当这些数据发生变化时，`Watcher `实例就会被通知，并执行相应的更新操作。`Watcher` 的创建和管理是 Vue 内部的机制，通常不需要直接与之交互。`Watcher` 对象负责收集依赖、触发更新和视图的重新渲染等工作。`Watcher `是 `Vue `内部实现响应式的核心机制之一。

在`Vue.js`中，`Watcher`（观察者）是其核心响应式系统的一部分，用于追踪数据的变化并触发相应的更新（回调函数）。`Watcher `可以跟踪和侦听 `Vue `实例中的数据属性，并在这些属性发生改变时执行特定的逻辑。以下是三种不同类型的`Watcher`及其应用场景：

1. `计算属性的Watcher (Computed Watcher)：`
   - **计算属性的**\*\*`Watcher`\*\***负责监听依赖于响应式数据的计算结果是否发生变化。**
   - 当一个`Vue`实例或组件中有计算属性时（通过`computed`选项定义），`Vue`会为每个计算属性创建一个`Watcher`。
   - 当计算属性所依赖的数据变化时，计算属性的`Watcher`会被调用以重新计算值，并自动更新视图。
   - 示例：假设有一个复杂表达式的计算属性 `fullName`，依赖于 `firstName` 和 `lastName`，当 `firstName` 或 `lastName` 变化时，`Vue`会自动通过计算属性`Watcher`来更新 `fullName` 的值。
2. `响应式数据的Watcher (Data Watcher)：`
   - 响应式数据的`Watcher`与`Vue`实例或组件中的数据属性相关联，这些数据属性由`data`选项定义。
   - 当直接修改这些数据属性时，`Vue`会通过`Observer`机制追踪到变化，并通知所有依赖该数据属性的`Watcher`进行更新操作。
   - 示例：在一个组件中，当你改变 `message` 数据属性时，所有在模板中使用了 `{{ message }}` 进行绑定的地方都会被对应的`Watcher`捕获到这个变化，从而触发`DOM`更新。
   - `User Watcher `是由开发者通过 \$`watch `方法手动创建的 `Watcher`，用于监听任意数据的变化，并执行自定义的回调函数。它可以用于监听数据的变化，并在数据满足特定条件时执行一些操作。与 `Render Watcher `和 `Computed Watcher` 不同，User Watcher 是手动创建的，不是 `Vue `内部自动管理的。
3. `渲染 Watcher (Render Watcher)：`
   - **渲染**\*\*`Watcher`\*\***主要负责监控整个组件的渲染过程，它关注的是组件模板中的所有数据依赖项。**
   - 当任何一个影响组件渲染的数据发生变化时，渲染`Watcher`会被触发，`Vue`会根据新的数据生成新的虚拟`DOM`树，并通过`Virtual DOM Diff`算法找到需要实际更新的真实`DOM`节点。
   - 示例：组件的根元素以及内部任何包含响应式数据绑定的元素变化时，都可能导致渲染`Watcher`执行，进而更新`UI`。

总结来说，每种类型的`Watcher`都有自己的职责范围和作用时机。计算属性`Watcher`处理衍生状态的计算，响应式数据`Watcher`则追踪基础数据的变化，而渲染`Watcher`负责整体界面的更新。这三者相互协作，共同构建了Vue.js高效且灵活的响应式系统。
