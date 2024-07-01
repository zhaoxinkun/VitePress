
:::info
`var `语句用于声明一个函数作用域或全局作用域的变量，并且可以选择将其初始化为一个值
:::
```javascript
var x = 1;

if (x === 1) {
  var x = 2;

  console.log(x);
  // Expected output: 2
}

console.log(x);
// Expected output: 2

```

```javascript
var name1;
var name1 = value1;
var name1 = value1, name2 = value2;
var name1, name2 = value2;
var name1 = value1, name2, /* …, */ nameN = valueN;

```

<a name="MNuxN"></a>
## 变量提升

:::info
只有变量的声明被提升，而变量的初始化则不会被提升。直到赋值语句被执行，变量才会被初始化。在此之前，变量的值是 `undefined`（但已声明）：
:::
```javascript
function doSomething() {
  console.log(bar); // undefined
  var bar = 111;
  console.log(bar); // 111
}

```

可以隐式理解：
```javascript
function doSomething() {
  var bar;
  console.log(bar); // undefined
  bar = 111;
  console.log(bar); // 111
}

```

<a name="pXH18"></a>
## 重新声明

:::info
即使是在严格模式下，使用 var 重复声明变量不会触发错误，变量的值也不会丢失，除非新的声明有初始化器
:::
```javascript
var a = 1;
var a = 2;
console.log(a); // 2
var a;
console.log(a); // 2; not undefined

```

`var` 可以与 `function` 在同一作用域中声明同名变量。在这种情况下，`var` 声明的初始化器总是会覆盖函数的值，而无论它们的相对位置如何。这是因为函数声明会提升到作用域的顶部，而初始化器会在其后才被求值，因此会覆盖函数的值
```javascript
var a = 1;
function a() {}
console.log(a); // 1

```

`var` 不能与 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)、[const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)、[class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class) 或 [import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import) 在同一作用域中声明同名变量
```javascript
var a = 1;
let a = 2; // SyntaxError: Identifier 'a' has already been declared

```

因为 `var` 声明作用域不限于块，所以这也适用于以下情况：
```javascript
let a = 1;
{
  var a = 1; // SyntaxError: Identifier 'a' has already been declared
}

```

它不适用于以下情况，其中 `let` 位于 `var` 的子作用域中，而不是同一作用域：
```javascript
var a = 1;
{
  let a = 2;
}

```

函数体内的 `var` 声明可以与函数参数同名
```javascript
function foo(a) {
  var a = 1;
  console.log(a);
}

foo(2); // 输出 1

```
