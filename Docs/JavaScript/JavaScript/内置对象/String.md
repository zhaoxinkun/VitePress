<a name="eUNHX"></a>

## 创建

:::info
JavaScript 字符串是用于存储和操作文本的一种数据类型。`JavaScript`字符串是写在引号内的零个或多个字符
:::

```javascript
let text = "John Doe";
```

您可以使用单引号或双引号创建（字面量方式）

```javascript
let carName1 = "Volvo XC60"; // Double quotes
let carName2 = "Volvo XC60"; // Single quotes
```

> 也可以在字符串中使用引号，只要它们与字符串周围的引号不匹配

```javascript
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';
```

<a name="WdIsB"></a>

### 字面量方式

:::info
直接使用""创建，这里就体现出来了为什么 JS 是弱类型语言了，因为他在创建的时候并没有直接声明类型，或者强制规定，后续我还可以直接修改（var 可以，let 不行）。建议参考 TypeScript
:::

- **原始类型**：字符串字面量创建的是一个**原始类型的字符串**
- **性能**：**创建字符串字面量通常比使用构造函数更高效，因为它们在内部实现上更简单**
- **自动类型转换**：字符串字面量在需要时会自动转换为字符串对象，以便调用字符串方法

```javascript
//字面量方式
var str = "akun";
console.log(str); //akun
console.log(typeof str); //string

// 弱类型说明
var str = 18; //不报错
console.log(str);
console.log(typeof str);
```

<a name="KA0ix"></a>

### 构造函数方式

:::info
使用构造函数返回,本质是把其他类型转化为字符串极度不推荐使用
:::

- **对象类型**：字符串构造函数创建的是一个字符串对象（**所以原型对象是对象），而不是原始类型的字符串**
- **原型方法**：字符串对象有与字符串字面量相同的方法，**但由于它们是对象，所以还具有对象的属性和方法**
- **性能**：使用构造函数创建字符串对象的开销更大，因为它涉及对象的创建和管理

```javascript
//构造函数方式
let str02 = new String("akun");
console.log(str02); //[String: 'akun']
console.log(typeof str02); //object
```

<a name="hgEZA"></a>

### 区别

1. **类型**：
   - 字符串字面量：原始类型`string`
   - 字符串对象：对象类型`object`

```javascript
let strLiteral = "Hello, World!";
let strObject = new String("Hello, World!");

console.log(typeof strLiteral); // 输出 "string"
console.log(typeof strObject); // 输出 "object"
```

2. **相等性比较**：
   - 字符串字面量和字符串对象在相等性比较时会有不同的结果

```javascript
let strLiteral = "Hello, World!";
let strObject = new String("Hello, World!");

console.log(strLiteral == strObject); // 输出 true（值相等）
console.log(strLiteral === strObject); // 输出 false（类型不同）
```

3. **行为和方法调用**：
   - 字符串字面量会自动转换为临时的字符串对象，以便调用方法。字符串对象可以直接调用方法

```javascript
let strLiteral = "Hello, World!";
let strObject = new String("Hello, World!");

console.log(strLiteral.toUpperCase()); // 输出 "HELLO, WORLD!"
console.log(strObject.toUpperCase()); // 输出 "HELLO, WORLD!"
```

4. **属性**：
   - 字符串对象可以拥有自定义属性，而字符串字面量不能

```javascript
let strObject = new String("Hello, World!");
strObject.customProperty = "I'm a custom property";

console.log(strObject.customProperty); // 输出 "I'm a custom property"

let strLiteral = "Hello, World!";
strLiteral.customProperty = "I'm a custom property";

console.log(strLiteral.customProperty); // 输出 undefined
```

<a name="ycEq3"></a>

### 总结

- **字符串字面量**：更简洁和高效，适用于大多数情况下创建字符串。它们是原始类型，内存和性能更优
- **字符串对象**：提供更多功能，如自定义属性，但通常不推荐在需要创建大量字符串时使用，因为性能开销较大

在实际开发中，推荐使用字符串字面量，除非有明确的需求需要使用字符串对象

<a name="ufKfp"></a>

## 属性

在 JavaScript 中，`String`类型拥有许多属性和方法，用于操作和处理字符串。以下是`String`类型的属性及其详细介绍：

<a name="Q3Uz6"></a>

### 静态属性

**静态属性**是直接定义在`String`构造函数上的属性，可以通过`String`类本身访问，而不是通过其实例访问

- **String.length**
  - 总是返回`1`，因为它表示构造函数的参数个数

```javascript
console.log(String.length); // 输出 1
```

<a name="Xlzuq"></a>

### 原型属性（实例属性）

**实例属性**是定义在`String`原型对象上的属性，可以通过字符串实例访问

- **length**
  - 返回字符串的长度，即字符串中字符的个数

```javascript
let str = "Hello, World!";
console.log(str.length); // 输出 13
```

- **constructor**
  > **属性演示：返回创建字符串对象的原型函数**

```javascript
let str05 = "hello world";
console.log(str05.constructor); //[Function: String]
let str06 = new String("akun");
console.log(str06.constructor); //[Function: String]
```

<a name="r97vZ"></a>

## 方法

```javascript
// 常见的 String 类型原型方法
String.prototype.charAt();
String.prototype.at();
String.prototype.charCodeAt();
String.prototype.charPointAt();
String.prototype.concat();
String.prototype.startsWith();
String.prototype.endsWith();
String.prototype.includes();
String.prototype.indexOf();
String.prototype.lastIndexOf();
String.prototype.match();
String.prototype.matchAll();
String.prototype.normalize();
String.prototype.padStart();
String.prototype.padEnd();
String.prototype.repeat();
String.prototype.replace();
String.prototype.replaceAll();
String.prototype.search();
String.prototype.slice();
String.prototype.split();
String.prototype.substr();
String.prototype.substring();
String.prototype.toLocaleLowerCase();
String.prototype.toLocaleUpperCase();
String.prototype.toUpperCase();
String.prototype.toLowerCase();
String.prototype.toString();
String.prototype.trim();
String.prototype.trimEnd();
String.prototype.trimStart();
String.prototype.valueOf();
```

<a name="c2GFK"></a>

### `根据字符查索引`

- `String.indexOf(sub，num)`
  - 参数：查找的字符串，开始的位置
  - 返回值：字符串**首次出现的位置，如果不存在则返回 -1，参数 num 是查询开始的位置**

```javascript
// 根据字符串查索引
let str01 = "hello world";

// str.indexof(str,num)返回字符串首次出现的索引，没有就是-1
//如果省略了 number 参数，indexOf 方法将从字符串的开头开始搜索。
console.log(str01.indexOf("o")); //4
console.log(str01.indexOf("I")); //-1
//如果指定了 number 参数，indexOf 方法将从指定的位置开始搜索。
console.log(str01.indexOf("o", 2)); //4
//如果 number 参数是负数，indexOf 方法将从字符串末尾的指定位置开始向前搜索。
console.log(str01.indexOf("o", -2)); //4
//如果 number 参数大于或等于字符串的长度，indexOf 方法将返回 -1，表示未找到指定子字符串。
console.log(str01.indexOf("o", 20)); //-1
//如果 number 参数是小数，indexOf 方法会将其向下取整为最接近的整数。
console.log(str01.indexOf("o", 0.5)); //4
```

- `String.lastIndexOf(sub，num)`
  - 参数：查找的字符串，开始的位置
  - 返回值：字符串**最后一次出现的位置，如果不存在则返回 -1，参数 num 是查询开始的位置**

```javascript
let str02 = "hello world";
// str.lastindexof(str,num)返回字符串最后出现的索引，没有就是-1
//如果省略了 number 参数，indexOf 方法将从字符串的开头开始搜索。
console.log(str02.lastIndexOf("o")); //7
console.log(str02.lastIndexOf("I")); //-1
console.log(str02.lastIndexOf("o", 7)); //7
// num为小数或者负数都无法进行查找
console.log(str02.lastIndexOf("o", -7)); //-1
console.log(str02.lastIndexOf("o", 0.5)); //-1
```

- `String.includes(substring,number)`
  - 参数：查找的字符串，开始的位置
  - **返回值：字符串是否包含指定子字符串，返回布尔值，区分大小写 ES6 新增**

```javascript
let str03 = "hello world";
console.log(str03.includes("l")); //true
console.log(str03.includes("l", 5)); //true
// num是小数或者负数都会转化为0，然后进行查找
console.log(str03.includes("l", -5)); //true
console.log(str03.includes("l", 0.5)); //true
```

- `String.search()`
  - 参数：在字符串中**搜索指定的字符串或正则表达式**
  - **返回值：返回第一个匹配的索引位置。如果没有找到匹配，则返回 -1**

```javascript
let str04 = "hello world";
console.log(str04.search("o")); //4
console.log(str04.search("o", 5)); //4
// num是小数或者负数都会转化为0，然后进行查找
console.log(str04.search("o", -5)); //4
console.log(str04.search("o", 0.5)); //4
```

- `String.match()`
  - **参数：使用正则表达式在字符串中查找匹配项。**
  - **返回值：它返回一个数组，如果有/g 则返回其中包含匹配的字符串。如果未找到匹配，则返回值为 null**

```javascript
let str = "JavaScript is a powerful language";
let matches = str.match(/a/g);
console.log(matches); // 输出 [ 'a', 'a', 'a', 'a', 'a' ]，字符串中所有匹配正则表达式 /a/g 的子字符串
```

- `String.matchAll()`
  - 参数：使用正则表达式在字符串中查找所有匹配项。
  - **返回值：没有使用/g 就报错，它返回一个迭代器对象，可以通过循环来访问所有匹配的详细信息。没有找到就返回空数组。ES2020**

```javascript
let str = "JavaScript is a powerful language";
let regex = /a/g;
let matches = str.matchAll(regex);
for (let match of matches) {
  console.log(match[0]); // 输出每个匹配的子字符串
}
```

<a name="ut0Dh"></a>

### `根据索引找字符`

- `str.charAt`
  - 是找到字符串中指定索引位置的内容返回，**如果没有对应的索引，那么就会返回空字符串（ES5）**
  - `charAt()`不支持负数索引，返回空字符串（""）用于索引超出范围的情况

```javascript
//根据索引找字符串
let str05 = "hello world";
console.log(str05.length);
console.log(str05.charAt(3)); //l
console.log(str05.charAt(0)); //h
// 直接返回空
console.log(str05.charAt(-3)); // " "
// 取下整
console.log(str05.charAt(0.3)); //h
```

- ECMAScript 5（2009）
  - 允许属性访问字符串[ ]

```javascript
let str06 = "hello world";
console.log(str06[3]); //l
console.log(str06[-3]); //undefined
console.log(str06[0.3]); //undefined
```

- `Str.at()`(ES2022)
  - `at()`的索引可以是负数，`at()`返回 `undefined`**用于处理索引越界情况**

```javascript
let str06 = "hello world";
console.log(str06.at(3)); //l
console.log(str06.at(-3)); //r
```

<a name="FvBBq"></a>

### `Unicode `

- `charCodeAt(索引)`就是返回对应索引位置的 unicode 编码 UTF-16;0 到 65535 之间的数字。【静态方法】
- `codePointAt()`是返回大于 0xFFFF (65535) 的 Unicode 值的完整值【静态方法】

```javascript
// 获取unicode码 这个字符串中的字符在ascii表中对应的数值
var unicode = "hhhh";
var unicode2 = "𐀀";
console.log(unicode.charCodeAt(2)); //104 只能到0-65535
console.log(unicode2.codePointAt()); //65535  以上都可以
```

- `fromCharCode`转换回去
- `fromCodePoint`转换回去

```javascript
// 拿到Unicode码对应的数值，反转回去
var str1 = String.fromCharCode(104); //h
var str2 = String.fromCodePoint(65536); //𐀀
console.log(str1);
console.log(str2);
```

- `decodeURIComponent`解码
- `encodeURIComponent`编码
- `normalize()`方法返回该字符串的 Unicode 标准化形式

```javascript
//normalize()方法返回该字符串的 Unicode 标准化形式。
const name1 = "\u0041\u006d\u00e9\u006c\u0069\u0065";
const name2 = "\u0041\u006d\u0065\u0301\u006c\u0069\u0065";

console.log(`${name1}, ${name2}`);
// Expected output: "Amélie, Amélie"
console.log(name1 === name2);
// Expected output: false
console.log(name1.length === name2.length);
// Expected output: false
```

<a name="qp2WB"></a>

### `截取分割`

- `slice(start, end)`
  - 返回从开始位置到结束位置之间的子字符串，**不包含 end 位置的字符**
  - **返回新的，如果 end 是负数，那么就会把 end 的值和字符串的长度相加，如果长度 11 参数-4 就是相当于 7**

```javascript
// slice(start, end) 提取某部分，并以新的字符串返回被提取的部分
var s = "hello world";
console.log(s.slice(2)); //llo world
console.log(s.slice(2, 6)); //llo  不包含end
//当前接的参数是负数时
var s = "hello world";
console.log(s.slice(3, -4)); //它会将长度与对应的负数相加，结果为参数
//等价于
console.log(s.slice(3, 7)); //lo w
```

- `substring(start, end)`
  - 返回指定位置之间的字符串，不包含 end 位置的字符。
  - 如果 end 是负数，那么就会把 end 的值直接转换为零，然后会进行参数的比较，较小的作为开始的位置，较大的作为结束的位置

```javascript
// substring(start,stop) 方法用于提取字符串中介于两个指定下标之间的字符
var s = "hello world";
console.log(s.substring(2, 6)); //llo 不包含stop
console.log(s.substring(2)); //llo world
//当前接的参数是负数时
console.log(s.substring(3, -4)); //直接将负数转换为0
//console.log(s.substring(3,0));  //参数比较，较小的作为起始位置，较大的结束位置
console.log(s.substring(0, 3));
```

- `split(separator，number)`
  - **将字符串按照指定分隔符拆分为数组，number 的含义就是最后拿到的结果的最大长度**

```javascript
// split(separator，number)将字符串按照指定分隔符拆分为数组，number的含义就是最后拿到的结果的最大长度。
var s = "hello world";
console.log(s.split(" ")); //[ 'hello', 'world' ]
console.log("hello:wor:ld".split(":")); //[ 'hello', 'wor', 'ld' ]
console.log("hello:wor:ld".split(":", 2)); //[ 'hello', 'wor' ]
```

<a name="YXvU2"></a>

### `转换方法`

- `Str.toUpperCase()`**：将字符串转为大写**
- `Str.toLowerCase()`**：将字符串转为小写**

```javascript
// 转换方法-------------------------------
// 创建字符串
const Str = "Hello world";

// 转换为小写
console.log(Str.toLowerCase()); //hello world
// 转换为大写
console.log(Str.toUpperCase()); //HELLO WORLD
```

- `Str.toLocaleLowerCase()`：根据地区转换小写
- `Str.toLocaleUpperCase()`：根据地区转换大写
- ` Array.from(``Str``) `**：转化为真数组，进行数组操作**

```javascript
// 转换为数组类型
const Arr = Array.from(Str);
console.log(Arr, typeof Arr); //['H', 'e','l','l','o', ' ', 'w', 'o','r', 'l', 'd'] object
// 使用数组方法
Arr.push("ZXK");
console.log(Arr); //['H', 'e', 'l','l', 'o', ' ','w', 'o', 'r','l', 'd', 'ZXK']
```

- `Str.toString()`**：将其他类型的值转为字符串**
- 最后是转为数字的一些方法

```javascript
// 转为字符串
const Str2 = Arr.toString();
console.log(Str2, typeof Str2); //H,e,l,l,o, ,w,o,r,l,d,ZXK string

// 转为数字,不更改原字符串
const Str3 = "123.154 ";
const Num = Number(Str3);
console.log(Number(Str3)); //123.154
console.log(typeof Num); //number
console.log(Str3, typeof Str3); //123.154  string

// 转换为浮点数,不更改原字符串
console.log(parseFloat(Num)); //123.154
console.log(Str3, typeof Str3); //123.154  string

// 转换为精点数,不更改原字符串
console.log(parseInt(Num)); //123
console.log(Str3, typeof Str3); //123.154  string
```

<a name="A6vgT"></a>

### `替换方法`

- `Str.replace(oldValue, newValue)`**：用新的字符串替换旧的字符串，并返回替换后的新字符串 ES2021**
- `Str.replaceAll() `**ES2021**

```javascript
// 替换方法
const Str4 =
  "Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell";

//只替换第一个,并且不更改原字符串
console.log(Str4.replace("Hello", "Heool"));
console.log(Str4); //Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell
```

`replace()` 方法不会更改调用它的字符串。`replace()` 方法返回一个新字符串。`replace()` 方法仅替换第一个匹配项

```javascript
text = text.replaceAll("Cats", "Dogs");
text = text.replaceAll("cats", "dogs");
```

`replaceAll()` 方法允许您指定要替换的正则表达式而不是字符串如果参数是正则表达式，则必须设置全局标志（g），否则会抛出 TypeError

```javascript
text = text.replaceAll(/Cats/g, "Dogs");
text = text.replaceAll(/cats/g, "dogs");
```

`replaceAll()` does not work in Internet Explorer.`replaceAll()` 在 Internet Explorer 中不起作用

<a name="WE2X9"></a>

### `去除空格`

- `Str.trim() `**去除前后的空格 (ES5)**
- `Str.trimStart()`**去除前面的空格(ES2019)**
- `Str.trimEnd() `**去除后面的空格(ES2019)**

```javascript
// 去除空格---------------------------
const Str5 =
  "   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell   ";
// 去掉前后
console.log(Str5.trim()); //Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell

// 去掉前面,不改变原字符串
console.log(Str5.trimStart());
//Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell

console.log(Str5); //   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell

// 去掉后面,不改变原字符串
console.log(Str5.trimEnd()); //   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell
```

<a name="FMfFz"></a>

### `首尾判断`

- `Str.startsWith(substring)`：判断字符串**是否以指定子字符串开头，从第几个开始监测，返回布尔值。 ES6 新增**
- `Str.endsWith(substring)`：判断字符串**是否以指定子字符串结尾，从第几个开始监测，返回布尔值。 ES6 新增**

```javascript
// 首尾判断
const Str6 = "Hello world";

// 判断首位(监测的字符，从哪里开始)
console.log(Str6.startsWith("Hello")); //true
console.log(Str6.startsWith("world", 11)); //false

// 判断尾部(监测的字符，从哪里开始)
console.log(Str6.endsWith("world")); //true
console.log(Str6.startsWith("world", 11)); //false
```

<a name="p7Wd8"></a>

### `拼接方法`

- `Str.concat(拼接的字符，拼接的内容)`字符串的拼接 返回新字符串

```javascript
// 拼接方法---------------------
// 不改变原字符
const Str7 = "Hello world";
console.log(Str7.concat("ZXK")); //Hello worldZXK
console.log(Str7.concat("ZXK", "ZXK")); //Hello worldZXKZXK
console.log(Str7); //Hello world
const str1 = "Hello";
const str2 = "World";

console.log(str1.concat(" ", str2));
// Expected output: "Hello World"

console.log(str2.concat(", ", str1));
// Expected output: "World, Hello"
```

- `${str}`拼接字符串方法，模板字符串中有介绍

```javascript
//模板字符串
const name = "John";
const age = 25;
console.log(`My name is ${name} and I am ${age} years old.`); // 输出: "My name is John and I am 25 years old."
// 模板字符串
const Str8 = "Hello";
const Str9 = "world";
console.log(`${Str8}` + `${Str9}`); //Hello world
```

<a name="ChDJ4"></a>

### `填充方法(ES2017)`

- `Str.padStart(填充到多长，用什么填充) `支持在字符串的开头填充
- `Str.padEnd(填充到多长，用什么填充)`支持在字符串的结尾填充

```javascript
Pad a string with "0" until it reaches the length 4:
用“0”填充一个字符串，直到它达到长度4：

let text = "5";
let padded = text.padStart(4,"0");


Pad a string with "x" until it reaches the length 4:
用“x”填充字符串，直到它达到长度4：
let text = "5";
let padded = text.padStart(4,"x");
```

`padStart()` 方法是字符串方法。要填充数字，请先将数字转换为字符串

```javascript
let numb = 5;
let text = numb.toString();
let padded = text.padStart(4, "0");
```

`padEnd()` 方法从末尾填充字符串。它用另一个字符串（多次）填充字符串，直到达到给定的长度

```javascript
let text = "5";
let padded = text.padEnd(4, "0"); //5000

let text = "5";
let padded = text.padEnd(4, "x"); //5xxx
```

`padEnd()` 方法是字符串方法。要填充数字，请先将数字转换为字符串

```javascript
let numb = 5;
let text = numb.toString();
let padded = text.padEnd(4, "0");
```

<a name="yFbmU"></a>

### `比较方法`

- `localeCompare()`: 比较两个字符串，并返回一个指示它们在排序顺序上的关系的数字

```javascript
var str1 = "zxk ";
var str2 = "zxk2";
const cmp = str1.localeCompare(str2);
const cmp2 = str2.localeCompare(str1);
console.log(cmp); //-1
console.log(cmp2); //1
```

<a name="Ziev9"></a>

### `重复方法`

- 该`repeat()`方法返回一个新字符串。该`repeat()`方法不会改变原始字符串

```javascript
let text = "Hello world!";
let result = text.repeat(2);
console.log(result); //Hello world!Hello world!
```

<a name="R322e"></a>

### `获取文本`

- 该`valueOf()`方法返回字符串的原始值。不会改变原始字符串。可用于将字符串对象转换为字符串

```javascript
let x = 123;
console.log(x.valueOf()); // 123
console.log((123).valueOf()); // 123
console.log((100 + 23).valueOf()); // 123
```

- <br />
  <a name="OdHp9"></a>

## 遍历

在 JavaScript 中，有多种方式可以遍历字符串。以下是几种常见的方式，并附带示例代码：
<a name="Ej3cM"></a>

### `for` 循环

使用传统的 `for` 循环，通过索引访问每个字符

```javascript
let str = "Hello, World!";
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

<a name="DVSJD"></a>

### `for...of` 循环

使用 `for...of` 循环，可以直接遍历字符串中的每个字符

```javascript
let str = "Hello, World!";
for (const char of str) {
  console.log(char);
}
```

<a name="YcNzO"></a>

### `for...in` 循环

使用 `for...in` 循环遍历字符串中的每个索引，然后通过索引访问字符。虽然 `for...in` 主要用于遍历对象的属性，但也可以用于遍历数组或字符串的索引

```javascript
let str = "Hello, World!";
for (const index in str) {
  console.log(str[index]);
}
```

<a name="dahCn"></a>

### `forEach` 方法（转换为数组）

将字符串转换为数组，然后使用 `forEach` 方法遍历

```javascript
let str = "Hello, World!";
Array.from(str).forEach((char) => {
  console.log(char);
});
```

<a name="UG0d9"></a>

### `split` 方法

将字符串分割成数组，然后遍历数组。

```javascript
let str = "Hello, World!";
str.split("").forEach((char) => {
  console.log(char);
});
```

<a name="WVrZs"></a>

### `map` 方法（转换为数组）

将字符串转换为数组，然后使用 `map` 方法遍历。虽然 `map` 主要用于创建新数组，但也可以用于遍历目的

```javascript
let str = "Hello, World!";
Array.from(str).map((char) => {
  console.log(char);
});
```

<a name="urvCf"></a>

### `while` 循环

使用 `while` 循环遍历字符串中的每个字符

```javascript
let str = "Hello, World!";
let i = 0;
while (i < str.length) {
  console.log(str[i]);
  i++;
}
```

<a name="dmktz"></a>

### 示例总结

以下是一个总结示例，展示所有上述方法：

```javascript
let str = "Hello, World!";

// 1. for 循环
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// 2. for...of 循环
for (const char of str) {
  console.log(char);
}

// 3. for...in 循环
for (const index in str) {
  console.log(str[index]);
}

// 4. forEach 方法（转换为数组）
Array.from(str).forEach((char) => {
  console.log(char);
});

// 5. split 方法
str.split("").forEach((char) => {
  console.log(char);
});

// 6. map 方法（转换为数组）
Array.from(str).map((char) => {
  console.log(char);
});

// 7. while 循环
let i = 0;
while (i < str.length) {
  console.log(str[i]);
  i++;
}
```

通过这些方法，可以方便地遍历字符串并对每个字符进行操作。选择哪种方法取决于具体的需求和个人的编码风格。
