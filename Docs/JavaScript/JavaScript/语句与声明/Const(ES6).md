
:::info
`const`关键字用来声明常量，其使用规则除了声明之后不能修改之外，其他特性和let一样，友情提醒，使用`const`声明的变量不会挂载到`window`对象上
:::
:::info
`const` 声明用于声明块作用域的局部变量。常量的值不能通过使用[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)重新赋值来更改，但是如果常量是一个[对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#objects)，它的属性可以被添加、更新或删除。
:::
:::info
本质上来说，`const`声明的变量并不是变量的值不能改动，而是变量指向的内存地址不得改动，简单的数据类型（数字，字符串，布尔），值就保存在变量指向的那个内存地址，因此等同于常量，但是对于复合型的数据（对象和数组），变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，至于指向的数据结构就不能控制到。<br />const 声明创建了一个对值的不可变引用。它并不意味着它所持有的值是不可变的，只是变量标识符不能被重新赋值。例如，在内容是对象的情况下，这意味着对象的内容（例如属性）是可以被修改的。你应该将 const 声明理解为“创建一个身份保持不变”的标识符（变量），而不是“保持值不变的标识符”——换言之，是“创建不可变的[绑定](https://developer.mozilla.org/zh-CN/docs/Glossary/Binding)”，而不是“不可变的值”
:::
```javascript
const name1 = value1;
const name1 = value1, name2 = value2;
const name1 = value1, name2 = value2, /* …, */ nameN = valueN;
```

<a name="qQvBl"></a>
## 无法重新分配

:::info
无法重新分配 `const` 变量：
:::
```javascript
const PI = 3.141592653589793;
PI = 3.14;      // This will give an error
PI = PI + 10;   // This will also give an error
```

<a name="USP1U"></a>
## 必须分配

:::info
JavaScript `const` 变量在声明时必须赋值：
:::
```javascript
this is ok:
const PI = 3.14159265359;


this is not ok:
const PI;
PI = 3.14159265359;

```

<a name="fxq2n"></a>
## 什么时候使用？

:::info
**当你知道一个变量的值不应该被改变时，总是用 **`const`** 声明一个变量**
:::
在声明以下内容时使用 `const` ：

- A new Array 新阵列
- A new Object 新对象
- A new Function 新功能
- A new RegExp 新的RegExp

关键字 `const` 有点误导。它不定义常数值。它定义了一个对值的常量引用。因此，您不能：

- 重新指定常数值
- 重新分配常量数组
- 重新分配常量对象

但你可以：

- 更改常量数组的元素
- 更改常量对象的属性

<a name="pxklc"></a>
## 常数数组

:::info
可以更改常量数组的元素：
:::
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

<a name="bl6g6"></a>
## 常量对象

:::info
可以更改常量对象的属性：
:::
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


<a name="undIv"></a>
## 块范围

:::info
使用 `const` 声明一个变量与 `let` 在块作用域方面类似。在这个例子中，块中声明的x与块外声明的x不同：
:::
```javascript
const x = 10;
// Here x is 10

{
  const x = 2;
  // Here x is 2
}

// Here x is 10
```

<a name="OJl4L"></a>
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

<a name="LKAdn"></a>
## 预解析

:::info
使用 `var` 定义的变量被提升到顶部，可以随时初始化。含义：你可以在声明变量之前使用它：
:::
```javascript
this is ok：

carName = "Volvo";
var carName;


```

:::info
使用 `const` 定义的变量也会提升到顶部，但不会初始化。含义：在声明之前使用 `const` 变量将导致 `ReferenceError` ：
:::
```javascript
alert (carName);
const carName = "Volvo";
```

<a name="rzFD1"></a>
## 区别点

- `const` 声明的作用域既可以是块级作用域，也可以是函数作用域
- `const `声明只有在声明的位置之后才能访问（参见[暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)）。因此，`const` 声明通常被视为[非提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)的声明方式
- 当在脚本的顶层声明时，`const `声明不会在 [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 上创建属性
- 在同一作用域中，`const `声明不能被任何其他声明[重新声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E9%87%8D%E6%96%B0%E5%A3%B0%E6%98%8E)
- `const` 是[声明而不是语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements#%E8%AF%AD%E5%8F%A5%E5%92%8C%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8C%BA%E5%88%AB)。这意味着你不能将单独的 `const` 声明用作块的主体（这是合理的，因为无法访问变量）
