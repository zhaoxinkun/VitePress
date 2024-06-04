# Boolean

<!-- ## 目录

- [隐式转换](#隐式转换)
- [显示转换](#显示转换) -->

> 📌Boolean类型

> 布尔值只能有两个值： `true` 或 `false` 。0是flase，1是true，其他的都是flase

```javascript
let x = 5;
let y = 5;
let z = 6;
(x == y)       // Returns true
(x == z)       // Returns false


const boolean=new Boolean(true);
console.log(typeof boolean)  //object

let number =99;
console.log(number  == true ); //false

let hdr="11";
console.log(Boolean(hdr))//ture
if(hdr)console.log("hdr")  //输出
```

> 📌布尔值经常用于条件测试。 数值型和boolean型比较的时候，boolean会转化为数值型，进行比较

## 隐式转换

在 JavaScript 中，除了以下几个特定的值被视为假（false）外，其他所有的值都被视为真（true）：

1. **`false`：布尔值 false**
2. **`0`：数字 0**
3. **`-0`：负零**
4. **`0n`： BigInt 0**
5. **`""`：空字符串**
6. **`null`**
7. **`undefined`**
8. **`NaN`：非数字值**

> 📌除了上述这些值外，JavaScript 中的所有其他值都被视为真（true）。**这意味着非零的数字（包括负数和小数）、非空字符串（包括空格字符）、对象、数组、函数、Symbol、Map、Set、Date 等等，都会被视为真。**

例如：

```javascript
if (100) {
    console.log("This will be printed"); // 输出：This will be printed
}

if ("hello") {
    console.log("This will also be printed"); // 输出：This will also be printed
}

if ({}) {
    console.log("This will be printed too"); // 输出：This will be printed too
}
```

所以，除了上述列出的特定值之外，在 JavaScript 中其他所有值都被视为真。

## 显示转换

- 使用双重逻辑非运算符 `!!` 进行强制转换：

```javascript
console.log(!!"hello"); // 输出：true
console.log(!!0); // 输出：false
```

- 使用 `Boolean()` 函数进行转换：

```javascript
console.log(Boolean("hello")); // 输出：true
console.log(Boolean(0)); // 输出：false
```
