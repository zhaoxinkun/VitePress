
`Promise` 对象有三种状态：

1. `**Pending**`**（待定）**: 初始状态，既不是成功也不是失败。
2. `**resolved**`** / **`**fullfilled**`** （已完成）**: 表示操作成功完成。
3. `**Rejected**`**（已失败）**: 表示操作失败。

且一个 `promise `对象只能改变一次 <br />无论变为成功还是失败, 都会有一个结果数据 <br />成功的结果数据一般称为 `value`, 失败的结果数据一般称为 `reason`，`Promise` 对象有三种状态，每种状态对应一个值，这些状态和值的变化机制是理解 `Promise` 的关键。

<a name="Tk6ln"></a>
## Promise 的状态[PromiseState]

<a name="DrUE5"></a>
###  Pending（待定） 

   -  初始状态，既不是成功也不是失败。 
   -  此时，`Promise` 对象的值是未确定的，通常表示还没有产生任何结果。 
```javascript
let promise = new Promise((resolve, reject) => {
  // promise 初始状态是 pending
});
```
 
<a name="szd25"></a>
###  Fulfilled（已完成/已成功） 

   -  表示操作成功完成。 
   -  `Promise` 对象的值是操作成功的结果。 
   -  一旦状态变为 `fulfilled`，它就不能再变为其他状态，并且其值也不会再改变。 
```javascript
let promise = new Promise((resolve, reject) => {
  resolve('成功的结果');
});

promise.then((value) => {
  console.log(value); // 输出: 成功的结果
});
```
 
<a name="ZQR1p"></a>
###  Rejected（已失败） 

   -  表示操作失败。 
   -  `Promise` 对象的值是操作失败的原因（通常是一个错误对象）。 
   -  一旦状态变为 `rejected`，它就不能再变为其他状态，并且其值也不会再改变。 
```javascript
let promise = new Promise((resolve, reject) => {
  reject('失败的原因');
});

promise.catch((reason) => {
  console.log(reason); // 输出: 失败的原因
});
```
 

<a name="iwfxl"></a>
## 状态的改变机制

`Promise` 的状态可以从 `pending` 变为 `fulfilled` 或 `rejected`，但一旦变为 `fulfilled` 或 `rejected`，就不能再变为其他状态。这种状态的不可变性确保了 `Promise` 的一致性和可靠性。

<a name="Qyy3Y"></a>
###  状态从 pending 变为 fulfilled

   -  当执行函数调用 `resolve` 时，`Promise` 的状态从 `pending` 变为 `fulfilled`。 
   -  `resolve` 可以接受一个参数，作为 `Promise` 成功的值。 
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的结果');
  }, 1000);
});

promise.then((value) => {
  console.log(value); // 1秒后输出: 成功的结果
});
```
 
<a name="zH1jR"></a>
###  状态从 pending 变为 rejected

   -  当执行函数调用 `reject` 时，`Promise` 的状态从 `pending` 变为 `rejected`。 
   -  `reject` 可以接受一个参数，作为 `Promise` 失败的原因。 
   -  其实抛出`throw`也是可以的
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败的原因');
  }, 1000);
});

promise.catch((reason) => {
  console.log(reason); // 1秒后输出: 失败的原因
});
```
```javascript
let promise = new Promise((resolve, reject) => {
 throw '出问题了';
});

promise.catch((reason) => {
  console.log(reason); //rejected
}); 
```

<a name="Z3X0M"></a>
## 使用 Promise 进行状态管理的示例

下面是一个更复杂的示例，展示了如何使用 `Promise` 来处理异步操作，并处理各种状态变化。

```javascript
function asyncOperation() {
  return new Promise((resolve, reject) => {
    let success = Math.random() > 0.5; // 随机决定成功或失败
    setTimeout(() => {
      if (success) {
        resolve('操作成功');
      } else {
        reject('操作失败');
      }
    }, 1000);
  });
}

let promise = asyncOperation();

promise
  .then((value) => {
    console.log(value); // 如果成功，输出操作成功
  })
  .catch((reason) => {
    console.error(reason); // 如果失败，输出操作失败
  })
  .finally(() => {
    console.log('操作完成'); // 无论成功或失败，都会输出
  });
```

<a name="nfLIF"></a>
## 总结

`Promise` 对象的状态和值是异步编程中重要的概念。理解这些状态（`pending`、`fulfilled`、`rejected`）及其变化机制（通过 `resolve` 和 `reject`）是正确使用 Promise 的关键。Promise 的状态一旦变为 `fulfilled` 或 `rejected`，就不会再改变，这确保了代码的可靠性和可预测性。通过链式调用 `then`、`catch` 和 `finally`，可以有效管理异步操作的结果和错误处理。
