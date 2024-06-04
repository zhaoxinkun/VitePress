# Number

<!-- ## 目录

- [Create](#Create)
  - [整数精度](#整数精度)
  - [浮动精度](#浮动精度)
  - [指数表示](#指数表示)
  - [NaN  非数字](#NaN--非数字)
  - [Infinity 非有限](#Infinity-非有限)
  - [Hexadecimal  十六进制](#Hexadecimal--十六进制)
- [Property](#Property)
  - [EPSILON:（ES6）](#EPSILONES6)
  - [MIN\_SAFE\_INTEGER:（ES6）](#MIN_SAFE_INTEGERES6)
  - [MAX\_SAFE\_INTEGER:（ES6）](#MAX_SAFE_INTEGERES6)
- [Methods](#Methods)
  - [静态方法](#静态方法)
    - [isFinite()（ES6）](#isFiniteES6)
    - [isInteger() （ES6）](#isInteger-ES6)
    - [isNaN()（ES6）](#isNaNES6)
    - [isSafeInteger()（ES6）](#isSafeIntegerES6)
    - [parseFloat() ](#parseFloat-)
    - [parseInt() ](#parseInt-)
  - [实例方法](#实例方法)
    - [toFixed() ](#toFixed-)
    - [toLocaleString() ](#toLocaleString-)
    - [toPrecision() ](#toPrecision-)
    - [toExponential()](#toExponential)
    - [toString() ](#toString-)
    - [Number()](#Number) -->

## Create

### 整数精度

整数（没有句点或指数符号的数字）最多可精确到15位。

```javascript
let x = 999999999999999;   // x will be 999999999999999
let y = 9999999999999999;  // y will be 10000000000000000
```

最大小数位数为17。

### 浮动精度

浮点运算并不总是100%准确：

```javascript
let x = 0.2 + 0.1;
```

为了解决上面的问题，它有助于乘法和除法：

```javascript
let x = (0.2 * 10 + 0.1 * 10) / 10;
```

### 指数表示

特大号或特大号可以用科学（指数）符号表示：

```javascript
let y = 123e5;    // 12300000
let z = 123e-5;   // 0.00123
```

> 📌大多数编程语言都有许多数字类型：

> 📌整数（整数）：  byte（8位）、short（16位）、int（32位）、long（64位）

> 📌真实的（浮点）：  float（32位）、double（64位）。

> 📌**数字总是一种类型：double (64-bit floating point).double（64位浮点）。**

### NaN  非数字

> 📌`NaN` 是JavaScript保留字，表示数字不是法律的数字。

尝试使用非数字字符串进行算术运算将导致 `NaN` （不是数字）：

```javascript
let x = 100 / "Apple";
```

但是，如果字符串是数字，则结果将是一个数字：

```javascript
let x = 100 / "10";
```

你可以使用全局JavaScript函数 `isNaN()` 来找出一个值是否是一个不是一个数字：

```javascript
let x = 100 / "Apple";
isNaN(x);
```

小心 `NaN` 如果在数学运算中使用 `NaN` ，结果也将是 `NaN` ：

```javascript
let x = NaN;
let y = 5;
let z = x + y;
```

或者结果可能是像NaN5那样的级联：

```javascript
let x = NaN;
let y = "5";
let z = x + y;
```

> 📌`NaN` 是一个数字： `typeof NaN` 返回 `number`&#x20;

```javascript
typeof NaN;
```

### Infinity 非有限

`Infinity` （或 `-Infinity` ）是JavaScript返回的值，如果你计算的数字超出了最大可能的数字。

```javascript
let myNumber = 2;
// Execute until Infinity
while (myNumber != Infinity) {
  myNumber = myNumber * myNumber;
}
```

除以0（零）也会生成 `Infinity` ：

```javascript
let x =  2 / 0;
let y = -2 / 0;
```

`Infinity` 是一个数字： `typeof Infinity` 返回 `number`

```javascript
typeof Infinity;
```

### Hexadecimal  十六进制

如果数值常量前面有0x，JavaScript将其解释为十六进制。

```javascript
let x = 0xFF;
```

> 📌永远不要写一个带前导零的数字（比如07）。  有些JavaScript版本将数字解释为八进制，如果它们是用前导零编写的。

默认情况下，JavaScript将数字显示为以10为基数的小数。但是你可以使用 `toString()` 方法输出从2到36的基数。十六进制是十六进制。十进制的基数是10。八进制是8进制。二进制是基数2。

```javascript
let myNumber = 32;
myNumber.toString(32);
myNumber.toString(16);
myNumber.toString(12);
myNumber.toString(10);
myNumber.toString(8);
myNumber.toString(2);
```

## Property

> 📌数字属性

参考链接：[https://www.w3schools.com/js/js\_number\_properties.asp](https://www.w3schools.com/js/js_number_properties.asp "https://www.w3schools.com/js/js_number_properties.asp")

| Property           | Description                                           |
| ------------------ | ----------------------------------------------------- |
| EPSILON            | The difference between 1 and the smallest number > 1. |
| MAX\_VALUE         | The largest number possible in JavaScript             |
| MIN\_VALUE         | The smallest number possible in JavaScript            |
| MAX\_SAFE\_INTEGER | The maximum safe integer (253 - 1)                    |
| MIN\_SAFE\_INTEGER | The minimum safe integer -(253 - 1)                   |
| POSITIVE\_INFINITY | Infinity (returned on overflow)                       |
| NEGATIVE\_INFINITY | Negative infinity (returned on overflow)              |
| NaN                | A "Not-a-Number" value                                |

### `EPSILON`:（ES6）

- `EPSILON` 是一个非常小的数值，表示 JavaScript 中可接受的最小精度。
- 它主要用于比较浮点数是否相等时，解决浮点数运算时的精度问题。
- 由于浮点数运算的精度有限，可能会出现微小的误差。使用 `EPSILON` 可以确保两个浮点数在一定精度范围内被视为相等。
- 注意：`EPSILON` 并不适用于所有情况，例如判断较大的浮点数是否相等时，应该选择更合适的精度判断方法。

示例：

```javascript
const a = 0.1 + 0.2;
const b = 0.3;

if (Math.abs(a - b) < Number.EPSILON) {
  console.log('a 和 b 在 EPSILON 的精度范围内相等');
} else {
  console.log('a 和 b 不相等');
}
```

### `MIN_SAFE_INTEGER`:（ES6）

- `MIN_SAFE_INTEGER` 是 JavaScript 中能够安全表示的最小整数值。
- 它是 `-9007199254740991`，即 `-2^53 + 1`。
- 在进行整数计算时，当涉及到超过 `MIN_SAFE_INTEGER` 的值时，可能会出现精度丢失的问题，因此需要注意。

示例：

```javascript
const num = Number.MIN_SAFE_INTEGER;
console.log(num);  // 输出: -9007199254740991

const sum = num + 1;
console.log(sum);  // 输出: -9007199254740990
```

### `MAX_SAFE_INTEGER`:（ES6）

- `MAX_SAFE_INTEGER` 是 JavaScript 中能够安全表示的最大整数值。
- 它是 `9007199254740991`，即 `2^53 - 1`。
- 当进行整数计算时，超过 `MAX_SAFE_INTEGER` 的值可能会导致精度丢失的问题，需要注意。

示例：

```javascript
const num = Number.MAX_SAFE_INTEGER;
console.log(num);  // 输出: 9007199254740991

const sum = num + 1;
console.log(sum);  // 输出: 9007199254740992 (超过 MAX_SAFE_INTEGER)
```

这些数值属性在处理浮点数精度和整数范围时非常有用。但要记住，它们并不适用于所有情况，并且在超出其限制范围时可能会导致精度丢失。在进行数值比较、运算或表示整数范围时，应根据具体情况选择合适的方法和数据类型。

## Methods

> 📌数字方法

### 静态方法

#### **`isFinite()`**（ES6）

- 检查一个值是否是有限的数字。

```vue
isFinite(42); // true
isFinite(Infinity); // false
```

#### `isInteger()` （ES6）

- **如果参数是整数，则该**\*\*`Number.isInteger()`****方法返回。****`true`\*\*

```javascript
Number.isInteger(10);
Number.isInteger(10.5);
```

#### **`isNaN()`**（ES6）

- 检查一个值是否为 NaN。

```vue
isNaN(NaN); // true
isNaN("Hello"); // true
```

#### `isSafeInteger()`（ES6）

- 安全整数是可以精确表示为双精度数的整数。
- 如果参数是安全整数，则该`Number.isSafeInteger()`方法返回。`true`

安全整数是从 -(2 53 - 1) 到 +(2 53 - 1) 的所有整数。 &#x20;
这是安全的：9007199254740991。这是不安全的：9007199254740992。

```javascript
Number.isSafeInteger(10);
Number.isSafeInteger(12345678901234567890);
```

#### `parseFloat()`&#x20;

- 将字符串解析为浮点数。

```vue
    // parseFloat() 方法
    console.log(parseFloat("10.57834"));   //10.57834
    console.log(typeof parseFloat("10.57834") )  //number
```

#### `parseInt()`&#x20;

- 将字符串解析为整数

```vue
   // parseInt() 方法
    var n1= 10;
    var n2 = "10";
    console.log(n1+parseInt(n2));   //20
    console.log(parseInt(10.57834));   //10
    console.log(parseInt("10 20 30"));   //10
    console.log(parseInt("10 years"));   //10
    console.log(parseInt("hello"));   //NaN

```

### 实例方法

#### `toFixed()`&#x20;

- 作用：将数字四舍五入为指定小数位数的字符串表示。
- 适用场景：格式化数字以显示固定小数位数。

```vue
// toFixed() 返回字符串值，它包含了指定位数小数的数字
var n = 10.57834;
console.log(n.toFixed(2));  //10.58
console.log(n.toFixed(0)); //11
console.log(n.toFixed());  //11
console.log(n.toFixed(6));  //10.578340

```

#### `toLocaleString()`&#x20;

- `toLocaleString()`使用本地语言格式返回一个字符串形式的数字。

```javascript
let num = 1000000;
let text = num.toLocaleString("fi-FI");

let num = 1000000;
let text = num.toLocaleString("en-US", {style:"currency", currency:"USD"});

```

#### `toPrecision()`&#x20;

- 作用：将数字格式化为指定的有效位数的字符串表示。
- 适用场景：格式化数字以显示指定的有效位数。

```vue
// toPrecision() 返回字符串值，它包含了指定长度的数字
var n = 10.57834;
console.log(n.toPrecision(2));  //11
console.log(n.toPrecision(3));  //10.6
console.log(typeof n.toPrecision(3) )  //string
```

#### `toExponential()`

- toExponential() 返回一个字符串，其中的数字是四舍五入的，并使用指数表示法写入。

```vue
let x = 9.656;
x.toExponential(2);
x.toExponential(4);
x.toExponential(6);
```

#### `toString() `

- 作用：将数字转换为字符串。
- 适用场景：将数字转换为字符串以便于拼接或显示。

```vue
// toString(x)使用x为基数，把数字转换为字符串
var n = 10.57834;
console.log(typeof n )  //number
console.log(typeof n.toString() )  //string

var n1= 10;
var n2 = "10";
console.log(n1+n2);   //1010

```

#### `Number()`

```vue
// Number() 方法
console.log(Number("10.57834"));  //10.57834
console.log(typeof Number("10.57834") )  //number
 console.log(Number(true));  //1
console.log(Number(false));  //0
console.log(Number("hello world"));  //NaN
console.log(Number(null));  //0
console.log(Number(undefined));  //NaN
```
