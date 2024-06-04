# Const(ES6)

<!-- ## 目录

- [无法重新分配](#无法重新分配)
- [必须分配](#必须分配)
- [什么时候使用const？](#什么时候使用const)
- [常数数组](#常数数组)
- [常量对象](#常量对象)
- [块范围](#块范围)
- [重新声明](#重新声明)
- [预解析](#预解析) -->

> 📌Const常量

> 📌 const关键字用来声明常量，其使用规则除了声明之后不能修改之外，其他特性和let一样，友情提醒，使用const声明的变量不会挂载到window对象上。

> 📌本质上来说，const声明的变量并不是变量的值不能改动，而是变量指向的内存地址不得改动，简单的数据类型（数字，字符串，布尔），值就保存在变量指向的那个内存地址，因此等同于常量，但是对于复合型的数据（对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于指向的数据结构就不能控制到.

## 无法重新分配

> 无法重新分配 `const` 变量：

```javascript
const PI = 3.141592653589793;
PI = 3.14;      // This will give an error
PI = PI + 10;   // This will also give an error
```

## 必须分配

> JavaScript `const` 变量在声明时必须赋值：

```javascript
this is ok:
const PI = 3.14159265359;


this is not ok:
const PI;
PI = 3.14159265359;

```

## 什么时候使用const？

**当你知道一个变量的值不应该被改变时，总是用 ****`const`**** 声明一个变量。**

在声明以下内容时使用 `const` ：

- A new Array 新阵列
- A new Object 新对象
- A new Function 新功能
- A new RegExp 新的RegExp

关键字 `const` 有点误导。它不定义常数值。它定义了一个对值的常量引用。因此，您不能：

- 重新指定常数值
- 重新分配常量数组
- &#x20;重新分配常量对象

但你可以：

- 更改常量数组的元素
- 更改常量对象的属性

## 常数数组

> 可以更改常量数组的元素：

```javascript
// You can create a constant array:
const cars = ["Saab", "Volvo", "BMW"];

// You can change an element:
cars[0] = "Toyota";

// You can add an element:
cars.push("Audi");
```

但您不能重新分配阵列：

```javascript
const cars = ["Saab", "Volvo", "BMW"];

cars = ["Toyota", "Volvo", "Audi"];    // ERROR
```

## 常量对象

> 可以更改常量对象的属性：

```javascript
// You can create a const object:
const car = {type:"Fiat", model:"500", color:"white"};

// You can change a property:
car.color = "red";

// You can add a property:
car.owner = "Johnson";
```

但您不能重新分配对象：

```javascript
const car = {type:"Fiat", model:"500", color:"white"};

car = {type:"Volvo", model:"EX60", color:"red"};    // ERROR
```

## 块范围

使用 `const` 声明一个变量与 `let` 在块作用域方面类似。在这个例子中，块中声明的x与块外声明的x不同：

```javascript
const x = 10;
// Here x is 10

{
const x = 2;
// Here x is 2
}

// Here x is 10
```

## 重新声明

允许在程序中的任何地方重新声明JavaScript `var` 变量：

```javascript
var x = 2;     // Allowed
var x = 3;     // Allowed
x = 4;         // Allowed
```

不允许在同一作用域中将现有的 `var` 或 `let` 变量重新声明为 `const` ：

```javascript
var x = 2;     // Allowed
const x = 2;   // Not allowed

{
let x = 2;     // Allowed
const x = 2;   // Not allowed
}

{
const x = 2;   // Allowed
const x = 2;   // Not allowed
}
```

不允许在同一作用域中重新分配现有的 `const` 变量：

```javascript
const x = 2;     // Allowed
x = 2;           // Not allowed
var x = 2;       // Not allowed
let x = 2;       // Not allowed
const x = 2;     // Not allowed

{
  const x = 2;   // Allowed
  x = 2;         // Not allowed
  var x = 2;     // Not allowed
  let x = 2;     // Not allowed
  const x = 2;   // Not allowed
}
```

允许在另一个作用域或另一个块中使用 `const` 重新声明变量：

```javascript
const x = 2;       // Allowed

{
  const x = 3;   // Allowed
}

{
  const x = 4;   // Allowed
}
```

## 预解析

> 使用 `var` 定义的变量被提升到顶部，可以随时初始化。含义：你可以在声明变量之前使用它：

```javascript
this is ok：

carName = "Volvo";
var carName;


```

> 使用 `const` 定义的变量也会提升到顶部，但不会初始化。含义：在声明之前使用 `const` 变量将导致 `ReferenceError` ：

```javascript
alert (carName);
const carName = "Volvo";
```
