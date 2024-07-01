
<a name="nRum3"></a>
## 无法重新声明

:::info
使用 `let` 定义的变量不能重新声明
:::
使用 `var` 重新声明JavaScript变量在程序中的任何地方都是允许的：
```javascript
var x = 2;
// Now x is 2

var x = 3;
// Now x is 3
```

你不能意外地重新声明一个用 `let` 声明的变量。使用 `let` ，不允许在同一块中重新声明变量：
```javascript
var x = 2;   // Allowed
let x = 3;   // Not allowed

{
  let x = 2;   // Allowed
  let x = 3;   // Not allowed
}

{
  let x = 2;   // Allowed
  var x = 3;   // Not allowed
}
```

在另一个块中用 `let` 重新声明一个变量，是允许的：
```javascript
let x = 2;   // Allowed

{
  let x = 3;   // Allowed
}

{
  let x = 4;    // Allowed
}

```

```javascript
let name1;
let name1 = value1;
let name1 = value1, name2 = value2;
let name1, name2 = value2;
let name1 = value1, name2, /* …, */ nameN = valueN;

```

:::info
使用 `var` 关键字重新声明变量可能会带来问题。在块内重新声明变量也会在块外重新声明变量：
:::
```javascript
var x = 10;
// Here x is 10

{
  var x = 2;
  // Here x is 2
}

// Here x is 2
```

:::info
使用 `let` 关键字重新声明变量可以解决这个问题。在块内重新声明变量不会在块外重新声明该变量：
:::
```javascript
let x = 10;
// Here x is 10

{
  let x = 2;
  // Here x is 2
}

// Here x is 10
```

<a name="kRu6v"></a>
## 块级作用域机制

:::info
在ES6（2015）之前，JavaScript有全局作用域和函数作用域。ES6引入了两个重要的新JavaScript关键字： `let` 和 `const` 。这两个关键字提供了JavaScript中的块作用域
:::
在{ }块内声明的变量不能从块外访问：
```javascript
{
  let x = 2;
}
// x can NOT be used here
```

:::info
用 `var` 关键字声明的变量不能有块作用域。在{ }块内声明的变量可以从块外访问
:::
```javascript
{
  var x = 2;
}
// x CAN be used here
```

<a name="K2pUC"></a>
## 暂时性死区（TDZ机制）

:::info
使用 `var` 定义的变量被提升到顶部，可以随时初始化。含义：你可以在声明变量之前使用它：
:::
```javascript
console.log(carName)//undifined
carName = "Volvo";

var carName;
console.log(carName) //"Volvo"
```

:::info
用 `let` 定义的变量也被提升到块的顶部，但不初始化。含义：在声明之前使用 `let` 变量将导致 `ReferenceError` ：
:::
```javascript
console.log(carName) //error
carName = "Saab";
let carName = "Volvo";
```

<a name="afHYz"></a>
## 区别点

- `let` 声明的作用域是块或函数
- `let `声明的变量只能在执行到声明所在的位置之后才能被访问（参见[暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)）。因此，`let` 声明通常被视为是[非提升的](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)
- `let `声明在脚本的顶级作用域上声明变量时不会在[全局对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)上创建属性
- `let `声明的变量不能被同一个作用域中的任何其他声明[重复声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E9%87%8D%E5%A4%8D%E5%A3%B0%E6%98%8E)
- `let` [是声明，而不是语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements#%E8%AF%AD%E5%8F%A5%E5%92%8C%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8C%BA%E5%88%AB)的开头。这意味着，你不能将单独的 `let` 声明当做块的主体使用（因为这样做会让变量无法被访问）
