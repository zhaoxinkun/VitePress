
在 JavaScript 中，Promise 可以指定多个回调函数，这些回调函数确实都会执行。这是通过调用 `.then()` 方法多次来实现的。每次调用 `.then()` 都会返回一个新的 Promise 对象，并且不会影响其他已经注册的回调。

下面是一个详细的解释和示例：

<a name="rsz9O"></a>
## 多个 `.then()` 回调的执行

当你为一个 Promise 指定多个 `.then()` 回调时，这些回调会按照它们注册的顺序依次执行。每个 `.then()` 方法都会返回一个新的 Promise，允许你链式调用更多的 `.then()` 或其他处理方法。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的结果');
  }, 1000);
});

// 注册第一个 .then() 回调
promise.then((value) => {
  console.log('第一个回调:', value);
});

// 注册第二个 .then() 回调
promise.then((value) => {
  console.log('第二个回调:', value);
});

// 注册第三个 .then() 回调
promise.then((value) => {
  console.log('第三个回调:', value);
});
```

```
第一个回调: 成功的结果
第二个回调: 成功的结果
第三个回调: 成功的结果
```

如你所见，所有注册的 `.then()` 回调都会被执行，并且它们都接收到相同的 resolved 值。

<a name="NnWTR"></a>
## 链式调用

每次调用 `.then()` 或 `.catch()` 方法都会返回一个新的 Promise。这使得你可以链式调用多个处理函数，这些处理函数可以对上一个处理函数的结果进行操作。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promise
  .then((value) => {
    console.log('第一个回调:', value);
    return value * 2;
  })
  .then((value) => {
    console.log('第二个回调:', value);
    return value * 2;
  })
  .then((value) => {
    console.log('第三个回调:', value);
  });
```

```
第一个回调: 1
第二个回调: 2
第三个回调: 4
```

在这个示例中，每个 `.then()` 回调都接收上一个回调返回的值，并对其进行处理，然后传递给下一个回调。

<a name="fiVGF"></a>
## 错误处理

如果 Promise 失败（rejected），可以使用 `.catch()` 方法来处理错误。每个 `.then()` 回调之后可以跟一个 `.catch()` 方法来处理可能的错误。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('发生错误');
  }, 1000);
});

promise
  .then((value) => {
    console.log('第一个回调:', value);
  })
  .catch((reason) => {
    console.error('捕获的错误:', reason);
  });

promise
  .then((value) => {
    console.log('第二个回调:', value);
  })
  .catch((reason) => {
    console.error('第二个捕获的错误:', reason);
  });
```

```
捕获的错误: 发生错误
第二个捕获的错误: 发生错误
```

每个 `.catch()` 回调都会处理 `Promise` 被拒绝的情况。

<a name="Tx9FE"></a>
## 总结

1. 为同一个 Promise 对象指定多个 `.then()` 回调，这些回调都会按顺序执行。
2. 每个 `.then()` 方法都会返回一个新的 Promise，使得链式调用成为可能。
3. 错误可以通过 `.catch()` 方法来处理，每个 `.catch()` 方法也可以单独处理错误。

这种机制使得 Promise 能够以一种更可读和结构化的方式来管理异步操作。
