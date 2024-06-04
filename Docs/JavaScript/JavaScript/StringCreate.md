# String

<!-- ## 目录

- [字面量方式](#字面量方式)
- [构造函数方式](#构造函数方式)
- [区别](#区别)
  - [等号判断](#等号判断)
  - [添加属性](#添加属性)
- [转义字符](#转义字符)
- [Property](#Property)
  - [constructor](#constructor)
  - [length](#length)
- [Templates](#Templates)
  - [后勾语法](#后勾语法)
  - [插值语法](#插值语法)
  - [标签模板字符串](#标签模板字符串) -->

> 📌JavaScript字符串用于存储和操作文本。

JavaScript字符串是写在引号内的零个或多个字符。

```javascript
let text = "John Doe";
```

您可以使用单引号或双引号：

```javascript
let carName1 = "Volvo XC60";  // Double quotes
let carName2 = 'Volvo XC60';  // Single quotes
```

> 您可以在字符串中使用引号，只要它们与字符串周围的引号不匹配：

```javascript
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';
```

## 字面量方式

> 直接创建

```javascript
//字面量方式
let str = "akun"
console.log(str);//akun
console.log(typeof str); //string
```

## 构造函数方式

> 构造函数方式

> 📌使用构造函数返回,本质是把其他类型转化为字符串

```javascript
//构造函数方式
let str02 = new String("hello world")
console.log(str02); //[String: 'hello world']
console.log(typeof str02)  //object

```

## 区别

### 等号判断

在 JavaScript 中，使用 `==` 进行比较时，会发生类型转换，然后再比较值。而字面量方式创建的字符串和构造函数方式创建的字符串在内存中虽然都表示相同的字符串值，但它们的类型是不同的。

具体来说，字面量方式创建的字符串是原始类型的字符串，而构造函数方式创建的字符串是对象类型（String 对象）。虽然它们表示的值相同，但是它们的数据类型不同。

在使用 `==` 进行比较时，JavaScript 引擎会首先将对象类型的字符串转换为原始类型的字符串，然后再进行比较。而原始类型的字符串和对象类型的字符串在进行类型转换时，会被转换为不同的类型，因此最终比较的结果为 `false`。

```javascript
//字面量方式
let str = "akun"
console.log(str);//akun
console.log(typeof str); //string


//构造函数方式
let str02 = new String("hello world")
console.log(str02); //[String: 'hello world']
console.log(typeof str02)  //object

//区别
// 首先是两个等号的判断

console.log(str == str02) //false
console.log(str === str02) //false
```

### 添加属性

> 两种创建方式的区别：创建的时候，使用的原型不一样；字面量方式无法添加属性

```javascript
//添加属性
let str03 = "hello world ";
let str04 = new String("hello world");

str03.say = function () {
    console.log("你猜行不行")
}
str03.say(); //error

str04.say = function () {
    console.log("这个可以吧")
}
str04.say(); //这个可以吧
```

## 转义字符

> 因为字符串必须写在引号内，JavaScript会误解这个字符串：

```javascript
let text = "We are the so-called "Vikings" from the north.";
```

该字符串将被截断为“我们是所谓的”。避免此问题的解决方案是使用反斜杠转义字符。`反斜杠（ ` ）转义符将特殊字符转换为字符串字符：

| Code | Result | Description  |
| ---- | ------ | ------------ |
| \\'  | '      | Single quote |
| \\"  | "      | Double quote |
| \\\\ | \\     | Backslash    |

序列 `\"` 在字符串中插入一个双引号：

```javascript
let text = "We are the so-called \"Vikings\" from the north.";
```

序列 `\'` 在字符串中插入一个单引号：

```javascript
let text= 'It\'s alright.';
```

序列 `\` 在字符串中插入一个反斜杠：

```javascript
let text = "The character \\ is called backslash.";
```

其他六个转义序列在JavaScript中是有效的：

| Code | Result               |
| ---- | -------------------- |
| \b   | Backspace            |
| \f   | Form Feed            |
| \n   | New Line             |
| \r   | Carriage Return      |
| \t   | Horizontal Tabulator |
| \v   | Vertical Tabulator   |

> 📌上面的6个转义字符最初是用来控制打字机、电传打字机和传真机的。它们在HTML中没有任何意义。

## Property

> 📌字符串属性

### **constructor**

> **属性演示：返回创建字符串对象的原型函数**

```javascript
let str05 = "hello world";
console.log(str05.constructor) //[Function: String]
```

### length

> 要查找字符串的长度，请使用内置的 `length` 属性：

```javascript
let str05 = "hello world";
console.log(str05.length)  //11
```

## Templates

> 📌字符模板

### 后勾语法

> `模板文字使用反勾（``）`而不是引号（""）来定义字符串：

```javascript
let text =  Hello World! ;
```

使用模板文字，您可以在字符串中使用单引号和双引号：

```javascript
let text =  He's often called "Johnny" ;
```

模板文字允许多行字符串：

```javascript
let text =
`The quick
brown fox
jumps over
the lazy dog`;
```

### 插值语法

> 📌模板文字提供了一种将变量和表达式插值到字符串中的简单方法。该方法称为字符串插值。其语法为：

```javascript
${...}
```

模板文字允许字符串中的变量：

```javascript
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```

> 📌用真实的值自动替换变量称为字符串插值。

模板文字允许字符串中的表达式：

```javascript
let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
```

### 标签模板字符串

> 📌标签模板字符串是一种特殊的语法，它允许你在模板字符串前面放置一个函数，并且将该模板字符串作为参数传递给这个函数。这个函数被称为模板字符串的标签函数，它可以对模板字符串进行处理，并返回处理后的结果。

```javascript
function links(strings, ...values) {
    console.log(strings); // 输出模板字符串的所有静态部分[ 'Name: ', ', Age: ', '' ]
    console.log(values); // 输出模板字符串中插入[ 'John', 30 ]值的数组
    return "Processed result";
}

const name = "John";
const age = 30;

const result = links`Name: ${name}, Age: ${age}`;
console.log(result); // 输出：Processed result

```

在这个示例中，`links` 函数是一个标签函数，它接受模板字符串的所有静态部分和插入值的数组作为参数。你可以在这个函数中对模板字符串进行任何处理，然后返回处理后的结果。
