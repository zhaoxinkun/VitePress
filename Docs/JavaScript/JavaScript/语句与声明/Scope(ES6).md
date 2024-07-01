
:::info
作用域是当前的执行上下文，在其中的[值](https://developer.mozilla.org/zh-CN/docs/Glossary/Value)和表达式“可见”（可被访问）。如果一个[变量](https://developer.mozilla.org/zh-CN/docs/Glossary/Variable)或表达式不在当前的作用域中，那么它是不可用的。作用域也可以堆叠成层次结构，子作用域可以访问父作用域，反过来则不行
:::

JavaScript 的作用域分以下三种：

- 全局作用域：脚本模式运行所有代码的默认作用域
- 模块作用域：模块模式中运行代码的作用域
- 函数作用域：由[函数](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)创建的作用域

此外，用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 或 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 声明的变量属于额外的作用域：

- 块级作用域：用一对花括号（一个[代码块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)）创建出来的作用域

<a name="b2MbZ"></a>
## Function Scope

由于[函数](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)会创建作用域，因而在函数中定义的变量无法从该函数外部访问，也无法从其他函数内部访问，例如，下面的代码是无效的：
```javascript
function exampleFunction() {
  const x = "函数内定义"; // x 只能在 exampleFunction 函数中使用
  console.log("在函数内");
  console.log(x);
}

console.log(x); // 报错
```

:::info
JavaScript有函数作用域：每个函数创建一个新的作用域。在函数内部定义的变量不能从函数外部访问（可见）。使用 var 、 let 和 const 声明的变量在函数内部声明时非常相似。它们都具有功能范围：
:::
```javascript
function myFunction() {
  var carName = "Volvo";   // Function Scope
}

function myFunction() {
  let carName = "Volvo";   // Function Scope
}

function myFunction() {
  const carName = "Volvo";   // Function Scope
}
```

<a name="vnQPt"></a>
## Global Scope  

:::info
 全局作用域（Global Scope）：全局作用域是在整个代码中都可见和访问的范围。在全局作用域中声明的变量和函数可以被代码中的任何位置访问
:::
下面的代码是有效的，因为变量在函数外被声明，为全局变量：
```javascript
const x = "函数外定义";

exampleFunction();

function exampleFunction() {
  console.log("函数内");
  console.log(x);
}

console.log("函数外");
console.log(x);

```

:::info
全局声明的变量（在任何函数之外）具有全局作用域。全局变量可以从JavaScript程序中的任何位置访问。使用 `var` 、 `let` 和 `const` 声明的变量在块外声明时非常相似。它们都具有全局范围：
:::
```javascript
var x = 2;       // Global scope
let x = 2;       // Global scope
const x = 2;       // Global scope

let carName = "Volvo";
// code here can use carName

function myFunction() {
  // code here can also use carName
}

var globalVariable = 'I am a global variable'; // 全局变量
function globalFunction() {
  console.log('I am a global function'); // 全局函数
}
```

在函数外部声明的变量将变为GLOBAL
```javascript
let carName = "Volvo";
// code here can use carName

function myFunction() {
  // code here can also use carName
}
```

:::info
全局变量具有全局作用域：网页上的所有脚本和函数都可以访问它
:::

<a name="S0drg"></a>
##  Block Scope

:::info
在ES6（2015）之前，JavaScript只有全局作用域和函数作用域。ES6引入了两个重要的新JavaScript关键字： `let` 和 `const` 这两个关键字提供了JavaScript中的块作用域。在{ }块内声明的变量不能从块外访问：
:::
```javascript
{
  let x = 2;
}
// x can NOT be used here
```

用 `var` 关键字声明的变量不能有块作用域。在{ }块内声明的变量可以从块外访问。块级作用域只对 let 和 const 声明有效，但是对 var 声明无效
```javascript
{
  var x = 1;
}
console.log(x); // 1


{
  const x = 1;
}
console.log(x); // ReferenceError: x is not defined

```

<a name="OSVw0"></a>
## Local Scope

:::info
局部作用域（Local Scope）：局部作用域是在函数内部声明的范围。在局部作用域中声明的变量和函数只能在函数内部访问和使用，无法在函数外部访问
:::
```javascript
function localScopeExample() {
  var localVariable = 'I am a local variable'; // 局部变量
  console.log(localVariable); // 在函数内部访问局部变量
}

localScopeExample(); // 输出 'I am a local variable'
console.log(localVariable); // 报错，无法在函数外部访问局部变量
```

在JavaScript函数中声明的变量，对于函数而言，变为LOCAL
```javascript
// code here can NOT use carName

function myFunction() {
  let carName = "Volvo";
  // code here CAN use carName
}

// code here can NOT use carName
```

:::info
局部变量具有函数作用域：它们只能从函数内部访问。由于局部变量只能在其函数中被识别，因此同名的变量可以在不同的函数中使用。局部变量在函数开始时创建，并在函数完成时删除
:::

<a name="ErRbh"></a>
## Automatically Globa

:::info
如果你给一个没有声明的变量赋值，它将自动成为一个GLOBAL变量
:::
此代码示例将声明一个全局变量 carName ，即使该值是在函数内部赋值的
```javascript
myFunction();

// code here can use carName

function myFunction() {
  carName = "Volvo";
}
```


<a name="fNsJ1"></a>
## 作用域链

:::info
作用域链（Scope Chain）：JavaScript中的作用域链是指在函数被创建时，会将父级函数的作用域在创建的函数内部进行保存。这样，内部函数可以访问外部函数中的变量，一直追溯到全局作用域
:::
```javascript
function outerFunction() {
  var outerVar = 'I am an outer variable';


  function innerFunction() {
    console.log(outerVar); // 在内部函数中访问外部函数的变量
  }


  innerFunction();
}

outerFunction(); // 输出 'I am an outer variable'
```

:::info
作用域的原理是在函数被调用和执行时，JavaScript会根据作用域链来查找变量和函数的定义。它会先在当前作用域中查找，如果没有找到，就会向上层作用域查找，直到找到或者到达全局作用域。如果在任何作用域都找不到变量或函数的定义，就会抛出一个引用错误
:::
![](https://cdn.nlark.com/yuque/0/2024/png/35638872/1719754634384-0d0cfae7-9299-4e3f-81a6-6edc303167c6.png#averageHue=%23fafafa&clientId=ub14439db-018f-4&id=gDEI6&originHeight=393&originWidth=644&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7cfdc80e-119a-480e-8ba4-5aa1b63aca6)


