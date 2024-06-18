
<a name="QwLg5"></a>
## 怎么修改Promise的状态

在 `JavaScript` 中，`Promise` 的状态只能通过执行器函数内部的 `resolve` 和 `reject` 函数来改变。`Promise` 对象一旦创建，它的状态会初始化为 "`pending`"（待定）。通过调用 `resolve` 可以将状态从 "`pending`" 改为 "`fulfilled`"（已完成），而调用 `reject` 则可以将状态从 "`pending`" 改为 "`rejected`"（已拒绝）。一旦 `Promise` 的状态改变，就不能再次更改。

```javascript
let promise = new Promise((resolve, reject) => {
  // 异步操作，如网络请求或定时器
  setTimeout(() => {
    let success = true; // 这里可以是异步操作的结果

    if (success) {
      resolve('操作成功'); // 将状态改为 fulfilled
    } else {
      reject('操作失败'); // 将状态改为 rejected
    }
  }, 1000);
});

promise
  .then((value) => {
    console.log(value); // 输出: 操作成功（如果成功）
  })
  .catch((reason) => {
    console.log(reason); // 输出: 操作失败（如果失败）
  });
```

在上述示例中，`new Promise` 创建了一个 `Promise` 对象，并传入一个执行器函数（`executor`）。该执行器函数接受两个参数 `resolve` 和 `reject`，分别用于将 `Promise` 状态从 "`pending`" 改为 "`fulfilled`" 和 "`rejected`"。

<a name="HFpHW"></a>
## 修改态的详细步骤

1.  **创建 Promise 对象**: 
```javascript
let promise = new Promise((resolve, reject) => {
  // 在此处执行异步操作
});
```
 

2.  **使用 **`**resolve**`** 改变状态为 "**`**fulfilled**`**"**: 
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('操作成功'); // 成功，改变状态为 fulfilled
  }, 1000);
});

promise.then((value) => {
  console.log(value); // 输出: 操作成功
});
```
 

3.  **使用 **`**reject**`** 改变状态为 "**`**rejected**`**"**: 
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('操作失败'); // 失败，改变状态为 rejected
  }, 1000);
});

promise.catch((reason) => {
  console.log(reason); // 输出: 操作失败
});
```
 

<a name="g6wgS"></a>
## 状态不可变性

一旦 `Promise` 的状态从 "`pending`" 改变为 "`fulfilled`" 或 "`rejected`"，它就不能再改变。这意味着调用 `resolve` 或 `reject` 后，后续的 `resolve` 或 `reject` 调用将被忽略。<br />示例：状态不可变性

```javascript
let promise = new Promise((resolve, reject) => {
  resolve('第一次调用 resolve');
  reject('第二次调用 reject'); // 将被忽略
  resolve('第三次调用 resolve'); // 将被忽略
});

promise
  .then((value) => {
    console.log(value); // 输出: 第一次调用 resolve
  })
  .catch((reason) => {
    console.log(reason); // 不会执行
  });
```

<a name="M8T5G"></a>
## 使用异步函数模拟复杂情况

在实际开发中，异步操作通常比简单的定时器更复杂，可能涉及网络请求、文件读取等。以下是一个使用异步函数模拟复杂情况的示例：

```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    // 模拟一个异步操作（如网络请求）
    setTimeout(() => {
      const success = Math.random() > 0.5; // 随机决定成功或失败

      if (success) {
        resolve(`从 ${url} 获取数据成功`);
      } else {
        reject(`从 ${url} 获取数据失败`);
      }
    }, 1000);
  });
}

let promise = fetchData('https://example.com');

promise
  .then((data) => {
    console.log(data); // 输出: 从 https://example.com 获取数据成功（如果成功）
  })
  .catch((error) => {
    console.error(error); // 输出: 从 https://example.com 获取数据失败（如果失败）
  });
```

<a name="pZL5F"></a>
## 总结

- **创建 Promise**: 使用 `new Promise` 并传入一个执行器函数，该函数接受 `resolve` 和 `reject` 两个参数。
- **修改状态**: 在执行器函数内部，调用 `resolve` 将状态改为 "`fulfilled`"，调用 `reject` 将状态改为 "`rejected`"。
- **状态不可变**: 一旦状态改变，就不能再次修改。
- **使用异步函数**: 通过异步操作（如网络请求、定时器）来模拟实际开发中的复杂情况。



<a name="acd95cf0"></a>
### 
