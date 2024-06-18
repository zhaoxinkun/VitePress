# String

<!-- ## 目录

- [字面量方式](#字面量方式)
- [构造函数方式](#构造函数方式)
- [区别](#区别)
  - [等号判断](#等号判断)
  - [添加属性](#添加属性)
- [Property](#Property)
  - [constructor](#constructor)
  - [length](#length)
- [Templates](#Templates)
  - [后勾语法](#后勾语法)
  - [插值语法](#插值语法)
  - [标签模板字符串](#标签模板字符串) -->

> 📌JavaScript字符串是用于存储和操作文本的一种数据类型。

`JavaScript`字符串是写在引号内的零个或多个字符。

```javascript
let text = "John Doe";
```

您可以使用单引号或双引号创建（字面量方式）：

```javascript
let carName1 = "Volvo XC60";  // Double quotes
let carName2 = 'Volvo XC60';  // Single quotes
```

> 也可以在字符串中使用引号，只要它们与字符串周围的引号不匹配

```javascript
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';
```

## 字面量方式

> 直接使用""创建，这里就体现出来了为什么JS是弱类型语言了，因为他在创建的时候并没有直接声明类型，或者强制规定，后续我还可以直接修改（var可以，let不行）。建议参考TypeScript。

```javascript
//字面量方式
var str = "akun"
console.log(str);//akun
console.log(typeof str); //string
// 弱类型说明
var str = 18  //不报错
console.log(str)
console.log(typeof str);
```

## 构造函数方式

> 📌使用构造函数返回,本质是把其他类型转化为字符串极度不推荐使用

```javascript
//构造函数方式
let str02 = new String("akun")
console.log(str02); //[String: 'akun']
console.log(typeof str02)  //object

```

## 区别

### 等号判断

> 📌在 `JavaScript `中，使用 `==` 进行比较时，会发生类型转换，然后再比较值。而字面量方式创建的字符串和构造函数方式创建的字符串在内存中虽然都表示相同的字符串值，但它们的类型是不同的。`==`号不做数据类型的区别。具体来说，字面量方式创建的字符串是原始类型的字符串，而构造函数方式创建的字符串是对象类型（`String `对象）。在使用 `===` 进行比较时，JavaScript 引擎进行数据类型的转换，因为判断的条件就有他们的数据类型。

```javascript
//区别
console.log(str == str02) //true   比较值
console.log(str === str02) //false  比较值和类型
```

### 添加属性

> 📌两种创建方式的区别：创建的时候，使用的原型不一样；字面量方式无法添加属性，但是因为构造函数的方式返回的是一个对象类型的字符串，所以可以添加属性。

```javascript
//添加属性
let str03 = "hello world ";
let str04 = new String("hello world");

str03.say = function () {
    console.log("你猜行不行")
} //error
str03.say(); //error

str04.say = function () {
    console.log("这个可以吧")
}
str04.say(); //这个可以吧
```

## Property

> 📌字符串属性

### **constructor**

> **属性演示：返回创建字符串对象的原型函数**

```javascript
let str05 = "hello world";
console.log(str05.constructor) //[Function: String]
let str06 = new String("akun");
console.log(str06.constructor)  //[Function: String]
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

> 模板文字使用反勾`（``）`而不是引号（""）来定义字符串，他会原格式输出内容

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
