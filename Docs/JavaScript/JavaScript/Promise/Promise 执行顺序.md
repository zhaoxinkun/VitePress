

在 `JavaScript` 中，`Promise` 对象的状态改变和回调函数的执行顺序遵循一定的规则，这有助于保证异步操作的可预测性和一致性。下面详细解释这些规则及其执行顺序。<br />其实这个的话，就看你的那个回调里有异步任务了，你整个定时器在`Promise`中，那就先不执行你，先去`then`。

<a name="RNR5e"></a>
## Promise 状态改变和回调函数执行顺序

1.  **Promise 状态改变**: 
   - `Promise` 的状态一旦从 "`pending`" 改变为 "`fulfilled`" 或 "`rejected`"，这个状态就不能再改变。
   - 状态的改变是立即发生的，但回调函数的执行是在当前事件循环（`event loop`）结束后进行的。
2.  **指定回调函数**: 
   - 通过 `then`、`catch` 和 `finally` 方法可以指定回调函数。
   - 回调函数的执行是异步的，即它们会在当前的同步代码执行完之后执行。
   - 回调函数会按照它们注册的顺序依次执行。

```javascript
let promise = new Promise((resolve, reject) => {
  console.log('Promise 内部代码执行');
  setTimeout(() => {
    resolve('操作成功');
  }, 1000);
});

promise.then((value) => {
  console.log('第一个 then 回调:', value);
});

promise.then((value) => {
  console.log('第二个 then 回调:', value);
});

console.log('Promise 创建完毕');
```

1. 首先输出 `Promise 内部代码执行`，因为这是在创建 `Promise` 时同步执行的代码。
2. 然后输出 `Promise 创建完毕`，因为这也是同步代码。
3. 在 1 秒钟后，`Promise` 状态从 "`pending`" 改变为 "`fulfilled`"，然后异步执行注册的 `then` 回调。
4. 按照 `then` 回调注册的顺序，依次输出 `第一个 then 回调: 操作成功` 和 `第二个 then 回调: 操作成功`。

```
Promise 内部代码执行
Promise 创建完毕
第一个 then 回调: 操作成功
第二个 then 回调: 操作成功
```

<a name="JzW7q"></a>
## 回调函数的异步执行

为了更好地理解回调函数的异步执行，来看一个包含更多同步和异步代码的示例：

```javascript
console.log('代码开始执行');

let promise = new Promise((resolve, reject) => {
  console.log('Promise 内部代码执行');
  setTimeout(() => {
    resolve('操作成功');
  }, 1000);
});

promise.then((value) => {
  console.log('第一个 then 回调:', value);
});

promise.then((value) => {
  console.log('第二个 then 回调:', value);
});

console.log('Promise 创建完毕');

setTimeout(() => {
  console.log('setTimeout 回调');
}, 500);

console.log('代码结束执行');
```

1. `console.log('代码开始执行')` 同步执行。
2. `console.log('Promise 内部代码执行')` 同步执行。
3. `promise` 创建并注册两个 `then` 回调，但这些回调不会立即执行。
4. `console.log('Promise 创建完毕')` 同步执行。
5. `setTimeout(() => console.log('setTimeout 回调'), 500)` 注册一个 500 毫秒后的定时器回调。
6. `console.log('代码结束执行')` 同步执行。
7. 500 毫秒后，`setTimeout` 回调执行并输出 `setTimeout 回调`。
8. 1000 毫秒后，`Promise` 状态改变并异步执行两个 `then` 回调，按照注册顺序输出 `第一个 then 回调: 操作成功` 和 `第二个 then 回调: 操作成功`。

```
代码开始执行
Promise 内部代码执行
Promise 创建完毕
代码结束执行
setTimeout 回调
第一个 then 回调: 操作成功
第二个 then 回调: 操作成功
```

<a name="NKxRF"></a>
## 总结

- **同步代码**会在所有异步操作之前执行。
- **Promise 内部代码**在 `Promise` 创建时同步执行。
- **Promise 的回调函数**（通过 `then`、`catch` 和 `finally` 注册的回调）会在 `Promise` 状态改变后异步执行。
- **多个回调函数**会按照它们注册的顺序依次执行。
- **定时器回调**（如 `setTimeout`）会在相应的时间后异步执行，但它们不会打乱 `Promise` 回调的顺序。

这种执行顺序确保了代码的可预测性和一致性，有助于更好地理解和调试异步代码。
