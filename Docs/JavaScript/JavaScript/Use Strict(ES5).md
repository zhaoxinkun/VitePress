# Use Strict(ES5)

<!-- ## 目录

- [启用严格模式](#启用严格模式)
- [全局严格模式](#全局严格模式)
- [函数内部严格模式](#函数内部严格模式)
- [严格模式的限制](#严格模式的限制)
  - [变量必须先声明后使用](#变量必须先声明后使用)
  - [禁止delete 变量或函数](#禁止delete-变量或函数)
  - [禁止操作只读属性](#禁止操作只读属性)
  - [函数调用的上下文](#函数调用的上下文)
  - [禁止使用八进制表示法](#禁止使用八进制表示法)
  - [命名问题](#命名问题)
- [严格模式的优缺点](#严格模式的优缺点)
  - [优点](#优点)
  - [缺点](#缺点) -->

> 📌严格模式

## 启用严格模式

> 定义JavaScript代码应该以“严格模式”执行。`"use strict"` 指令是ECMAScript版本5中的新指令。它不是一个语句，而是一个文字表达式，被早期版本的JavaScript忽略了。`"use strict"` 的目的是指示代码应该在“严格模式”下执行。

例如，在严格模式下，您不能使用未声明的变量。

所有现代浏览器都支持“use strict”，除了Internet Explorer 9和更低版本：

```javascript
"use strict";
myFunction();

function myFunction() {
  y = 3.14;   // This will also cause an error because y is not declared
}
```

## 全局严格模式

> 通过添加“use strict”来声明严格模式;到脚本或函数的开头。在脚本的开头声明，它具有全局范围（脚本中的所有代码将以严格模式执行）：

```javascript
"use strict";
x = 3.14;       // This will cause an error because x is not declared
```

## 函数内部严格模式

> 在函数内部声明，它具有局部作用域（只有函数内部的代码处于严格模式）：

```javascript
x = 3.14;       // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;   // This will cause an error
}
```

## 严格模式的限制

### 变量必须先声明后使用

> 变量必须先声明后使用：在非严格模式下，可以直接使用未声明的变量并将其视为全局变量；而在严格模式下，必须先使用 `var`、`let` 或 `const` 来声明变量，否则会报错。禁止使用未声明的变量，否则会抛出ReferenceError。不允许在未声明的情况下使用变量：

```javascript
"use strict";
x = 3.14;                // This will cause an error
```

> 📌对象也是变量。不允许在没有声明的情况下使用对象：

```javascript
"use strict";
x = {p1:10, p2:20};      // This will cause an error
```

### 禁止`delete` 变量或函数

> 禁止删除变量或函数：在严格模式下，使用 `delete` 关键字删除变量、函数或函数的参数会引发错误。删除不可删除的属性会抛出TypeError。

不允许删除变量（或对象）

```javascript
"use strict";
let x = 3.14;
delete x;       // This will cause an error
```

不允许删除函数。

```javascript
"use strict";
function x(p1, p2) {};
delete x;         // This will cause an error 

```

### 禁止操作只读属性

> 禁止对只读属性赋值：在严格模式下，无法对只读属性进行赋值操作，会抛出TypeError错误。

不允许写入只读属性：

```javascript
"use strict";
const obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;       // This will cause an error
```

不允许写入仅获取属性：

```javascript
"use strict";
const obj = {get x() {return 0} };

obj.x = 3.14;    // This will cause an error
```

不允许删除不可删除的属性：

```javascript
"use strict";
delete Object.prototype; // This will cause an error
```

### 函数调用的上下文

> 在非严格模式下，函数调用时，如果调用上下文未设置，则默认为全局对象（如浏览器环境下的 `window` 对象）；而在严格模式下，未设置调用上下文时，调用上下文将为 `undefined`。函数中的 `this` 关键字在严格模式下的行为不同。`this` 关键字引用调用函数的对象。如果没有指定对象，严格模式下的函数将返回 `undefined` ，普通模式下的函数将返回全局对象（窗口）：

```javascript
"use strict";
function myFunction() {
  alert(this); // will alert "undefined"
}
myFunction();
```

不允许使用 `with` 语句：

```javascript
"use strict";
with (Math){x = cos(2)}; // This will cause an error
```

### 禁止使用八进制表示法

> 在严格模式下，八进制字面量（以 0 开头的数字）将引发错误。禁止使用八进制字面量和转义的八进制字符。

不允许使用八进制数字：

```javascript
"use strict";
let x = 010;             // This will cause an error
```

不允许使用八进制转义字符：

```javascript
"use strict";
let x = "\010";            // This will cause an error
```

### 命名问题

不允许复制参数名：

```javascript
"use strict";
function x(p1, p1) {}; // This will cause an error
```

单词 `eval` 不能用作变量：

```javascript
"use strict";
let eval = 3.14;         // This will cause an error
```

出于安全原因，不允许 `eval()` 在调用它的作用域中创建变量。

```javascript
在严格模式下，变量在声明之前不能使用：
"use strict";
eval ("x = 2");
alert (x);      // This will cause an error
```

在严格模式下，eval（）不能使用var关键字声明变量：

```javascript
"use strict";
eval ("var x = 2");
alert (x);    // This will cause an error
```

eval（）不能使用let关键字声明变量：

```javascript
eval ("let x = 2");
alert (x);        // This will cause an error
```

单词 `arguments` 不能用作变量：

```javascript
"use strict";
let arguments = 3.14;    // This will cause an error
```

## 严格模式的优缺点

### 优点

严格模式使得编写“安全”JavaScript更容易。严格模式将以前接受的“错误语法”更改为真实的错误。

例如，在普通JavaScript中，错误输入变量名会创建一个新的全局变量。在严格模式下，这将抛出一个错误，使得不可能意外创建全局变量。在普通JavaScript中，开发人员不会收到任何将值分配给不可写属性的错误反馈。

在严格模式下，对不可写属性、仅限getter的属性、不存在的属性、不存在的变量或不存在的对象的任何赋值都将引发错误。

- 消除了一些不合理、不安全或容易混淆的语法。
- 提供更好的错误提示和错误检测，有助于找出潜在的问题。
- 强制执行更严格的JavaScript语法规则，提高代码的可读性和可维护性。
- 提高了代码的执行效率。

严格模式的原理是通过对语法解析和代码执行过程进行更严格的限制来实现的。启用严格模式后，JavaScript引擎将采用不同的执行策略，更严格地检查代码的语法和语义，以确保代码的安全性和正确性。

它的限制和优点是由ECMAScript规范确定的，不同的JavaScript引擎可能有一些细微的差异，但大体上都遵循相同的原则。

### 缺点

- 限制了一些灵活的语言特性：严格模式中禁用了一些灵活但可能有用的功能，开发者需要遵守更严格的规范，可能会在某些情况下增加编码的复杂度。
- 兼容性问题：严格模式在一些较旧的浏览器版本中可能不被支持，需要考虑兼容性问题。但在现代浏览器中已经得到广泛支持。
