# Let(ES6)

<!-- ## 目录

- [无法重新声明](#无法重新声明)
- [块级作用域机制](#块级作用域机制)
- [暂时性死区（TDZ机制）](#暂时性死区TDZ机制)
- [重新声明变量](#重新声明变量) -->

> 📌Let关键字

## 无法重新声明

> 📌使用 `let` 定义的变量不能重新声明。

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

## 块级作用域机制

> 📌在ES6（2015）之前，JavaScript有全局作用域和函数作用域。ES6引入了两个重要的新JavaScript关键字： `let` 和 `const` 。这两个关键字提供了JavaScript中的块作用域。

在{ }块内声明的变量不能从块外访问：

```javascript
{
  let x = 2;
}
// x can NOT be used here
```

用 `var` 关键字声明的变量不能有块作用域。在{ }块内声明的变量可以从块外访问。

```javascript
{
  var x = 2;
}
// x CAN be used here
```

## 暂时性死区（TDZ机制）

> 📌使用 `var` 定义的变量被提升到顶部，可以随时初始化。含义：你可以在声明变量之前使用它：

```javascript
This is OK：
carName = "Volvo";
var carName;
```

> 📌用 `let` 定义的变量也被提升到块的顶部，但不初始化。含义：在声明之前使用 `let` 变量将导致 `ReferenceError` ：

```javascript
carName = "Saab";
let carName = "Volvo";
```

## 重新声明变量

> 使用 `var` 关键字重新声明变量可能会带来问题。在块内重新声明变量也会在块外重新声明变量：

```javascript
var x = 10;
// Here x is 10

{
var x = 2;
// Here x is 2
}

// Here x is 2
```

> 使用 `let` 关键字重新声明变量可以解决这个问题。在块内重新声明变量不会在块外重新声明该变量：

```javascript
let x = 10;
// Here x is 10

{
let x = 2;
// Here x is 2
}

// Here x is 10
```
