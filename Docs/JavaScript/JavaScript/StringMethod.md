# StringMethod

<!-- ## 目录

- [根据字符查索引](#根据字符查索引)
- [根据索引找字符](#根据索引找字符)
- [Unicode ](#Unicode-)
- [截取分割](#截取分割)
- [转换方法](#转换方法)
- [替换方法](#替换方法)
- [去除空格](#去除空格)
- [首尾判断](#首尾判断)
- [拼接方法](#拼接方法)
- [填充方法(ES2017)](#填充方法ES2017)
- [比较方法](#比较方法)
- [重复方法](#重复方法)
- [获取文本](#获取文本) -->

> 📌字符串方法

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

## `根据字符查索引`

- `String.indexOf(sub，num)`：返回字符串首次**出现的位置，如果不存在则返回 -1，参数num是查询开始的位置**

```javascript
// 根据字符串查索引
let str01 = "hello world";

// str.indexof(str,num)返回字符串首次出现的索引，没有就是-1
//如果省略了 number 参数，indexOf 方法将从字符串的开头开始搜索。
console.log(str01.indexOf("o"));  //4
console.log(str01.indexOf("I"));  //-1
//如果指定了 number 参数，indexOf 方法将从指定的位置开始搜索。
console.log(str01.indexOf("o", 2));  //4
//如果 number 参数是负数，indexOf 方法将从字符串末尾的指定位置开始向前搜索。
console.log(str01.indexOf("o", -2));  //4
//如果 number 参数大于或等于字符串的长度，indexOf 方法将返回 -1，表示未找到指定子字符串。
console.log(str01.indexOf("o", 20));  //-1
//如果 number 参数是小数，indexOf 方法会将其向下取整为最接近的整数。
console.log(str01.indexOf("o", 0.5));  //4
```

- `String.lastIndexOf(sub，num)`：返回字符串**最后一次出现的位置，如果不存在则返回 -1，参数num是查询开始的位置**

```javascript
let str02 = "hello world";
// str.lastindexof(str,num)返回字符串最后出现的索引，没有就是-1
//如果省略了 number 参数，indexOf 方法将从字符串的开头开始搜索。
console.log(str02.lastIndexOf("o"))//7
console.log(str02.lastIndexOf("I"))//-1
console.log(str02.lastIndexOf("o", 7))//7
// num为小数或者负数都无法进行查找
console.log(str02.lastIndexOf("o", -7))//-1
console.log(str02.lastIndexOf("o", 0.5))//-1
```

- `String.includes(substring,number)`：判断字符串是否包含指定子字符串，\*\*返回布尔值，区分大小写  \*\***ES6新增**

```javascript
let str03 = "hello world";
console.log(str03.includes("l"));  //true
console.log(str03.includes("l", 5));  //true
// num是小数或者负数都会转化为0，然后进行查找
console.log(str03.includes("l",-5));  //true
console.log(str03.includes("l",0.5));  //true
```

- `String.search()`：在字符串中**搜索指定的字符串或正则表达式，并返回第一个匹配的索引位置。如果没有找到匹配，则返回 -1**

```javascript
let str04 = "hello world";
console.log(str04.search("o")) //4
console.log(str04.search("o", 5)) //4
// num是小数或者负数都会转化为0，然后进行查找
console.log(str04.search("o",-5)) //4
console.log(str04.search("o",0.5)) //4
```

- `String.match()`：**使用正则表达式在字符串中查找匹配项。它返回一个数组，其中包含匹配的字符串。如果未找到匹配，则返回值为 null**

```javascript
let str = 'JavaScript is a powerful language';
let matches = str.match(/a/g);
console.log(matches); // 输出 [ 'a', 'a', 'a', 'a', 'a' ]，字符串中所有匹配正则表达式 /a/g 的子字符串
```

- `String.matchAll()`：使用正则表达式在字符串中查找所有匹配项。**它****返回一个迭代器对象，可以通过循环来访问所有匹配的详细信息****。没有找到就返回空数组。ES2020**

```javascript
let str = 'JavaScript is a powerful language';
let regex = /a/g;
let matches = str.matchAll(regex);
for (let match of matches) {
  console.log(match[0]); // 输出每个匹配的子字符串
}
```

## `根据索引找字符`

- `str.charAt`是找到字符串中指定索引位置的内容返回，如果没有对应的索引，那么就会返回 空字符串（ES5）

```javascript
//根据索引找字符串
let str05 = "hello world"
console.log(str05.length)
console.log(str05.charAt(3)) //l
console.log(str05.charAt(0))//h
// 直接返回空
console.log(str05.charAt(-3)) // " "
// 取下整
console.log(str05.charAt(0.3)) //h
```

- ECMAScript 5（2009）允许属性访问字符串\[ ]

```javascript
let str06 = "hello world"
console.log(str06[3])  //l
console.log(str06[-3])  //undefined
console.log(str06[0.3])  //undefined
```

- `Str.at()`(ES2022)

```javascript
let str06 = "hello world"
console.log(str06.at(3)) //l
console.log(str06.at(-3)) //r
```

区别：

- `Str.charAt()` 返回空字符串（""）用于索引超出范围的情况，而 `at()` 返回 `undefined`
- `at()` 的索引可以是负数，而 `charAt()` 不支持负数索引

## `Unicode `

- `charCodeAt(索引)` 就是返回对应索引位置的 unicode 编码UTF-16;0 到 65535 之间的数字。【静态方法】
- `codePointAt()` 是返回大于 0xFFFF (65535) 的 Unicode 值的完整值【静态方法】

```javascript
// 获取unicode码 这个字符串中的字符在ascii表中对应的数值
var unicode = "hhhh";
var unicode2 = "𐀀"
console.log(unicode.charCodeAt(2))   //104 只能到0-65535
console.log(unicode2.codePointAt())  //65535  以上都可以
```

- `fromCharCode`  转换回去
- `fromCodePoint` 转换回去

```javascript
// 拿到Unicode码对应的数值，反转回去
var str1 = String.fromCharCode(104)   //h
var str2 = String.fromCodePoint(65536) //𐀀
console.log(str1)
console.log(str2)
```

- `decodeURIComponent` 解码
- `encodeURIComponent` 编码
- `normalize()`方法返回该字符串的 Unicode 标准化形式

```javascript
 //normalize()方法返回该字符串的 Unicode 标准化形式。 
const  name1  = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const name2 = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

console.log(`${name1}, ${name2}`);
// Expected output: "Amélie, Amélie"
console.log(name1 === name2);
// Expected output: false
console.log(name1.length === name2.length);
// Expected output: false
```

## `截取分割`

- `slice(start, end)`：返回从开始位置到结束位置之间的子字符串，**不包含 end 位置的字符。返回新的，如果end是负数，那么就会把end的值和字符串的长度相加，如果长度11  参数-4就是相当于7**

```javascript
// slice(start, end) 提取某部分，并以新的字符串返回被提取的部分
var s = "hello world";
console.log(s.slice(2));  //llo world
console.log(s.slice(2, 6));  //llo  不包含end
//当前接的参数是负数时
var s = "hello world";
console.log(s.slice(3, -4));  //它会将长度与对应的负数相加，结果为参数
//等价于
console.log(s.slice(3, 7));   //lo w
```

- `substring(start, end)`：返回指定位置之间的字符串，\*\*不包含 end 位置的字符。如果end是负数，那么就会把end的值直接转换为零，然后会进行参数的比较，较小的作为开始的位置，较大的作为结束的位置 \*\*

```javascript
// substring(start,stop) 方法用于提取字符串中介于两个指定下标之间的字符
var s = "hello world";
console.log(s.substring(2, 6)); //llo 不包含stop
console.log(s.substring(2)); //llo world
//当前接的参数是负数时
console.log(s.substring(3, -4));  //直接将负数转换为0
//console.log(s.substring(3,0));  //参数比较，较小的作为起始位置，较大的结束位置
console.log(s.substring(0, 3));
```

- `split(separator，number)`：将字符串按照**指定分隔符拆分为数组，number的含义就是最后拿到的结果的最大长度**

```javascript
// split(separator，number)将字符串按照指定分隔符拆分为数组，number的含义就是最后拿到的结果的最大长度。
var s = "hello world";
console.log(s.split(' '))  //[ 'hello', 'world' ]
console.log("hello:wor:ld".split(':'))  //[ 'hello', 'wor', 'ld' ]
console.log("hello:wor:ld".split(':', 2))  //[ 'hello', 'wor' ]
```

- `substr(start, length)`：返回从**指定位置开始指定长度****的子字符串包含end。**** 已弃用**

```javascript
 // substr(start,length) 方法可在字符串中抽取从开始下标开始的指定数目的字符 
var s = "hello world";
console.log(s.substr(2, 6)); //llo wo
console.log(s.substr(1, 4)); //
console.log(s.substr(2)); //llo world

```

## `转换方法`

- **`Str.toUpperCase()`：将字符串转为大写**
- **`Str.toLowerCase()`：将字符串转为小写**

```javascript
// 转换方法-------------------------------
// 创建字符串
const Str = "Hello world";

// 转换为小写
console.log(Str.toLowerCase()); //hello world
// 转换为大写
console.log(Str.toUpperCase()); //HELLO WORLD
```

- `Str.toLocaleLowerCase()` ：根据地区转换小写
- `Str.toLocaleUpperCase()`：根据地区转换大写
- **`Array.from(`****`Str`****`)`：转化为真数组，进行数组操作**

```javascript
// 转换为数组类型
const Arr = Array.from(Str);
console.log(Arr, typeof Arr)  //['H', 'e','l','l','o', ' ', 'w', 'o','r', 'l', 'd'] object
// 使用数组方法
Arr.push("ZXK");
console.log(Arr)  //['H', 'e', 'l','l', 'o', ' ','w', 'o', 'r','l', 'd', 'ZXK']
```

- **`Str.toString()`：将其他类型的值转为字符串**
- 最后是转为数字的一些方法

```javascript
 // 转为字符串 
const  Str2  =  Arr . toString ( );
console.log(Str2, typeof Str2)  //H,e,l,l,o, ,w,o,r,l,d,ZXK string

 // 转为数字,不更改原字符串 
const Str3 = "123.154 ";
const Num = Number(Str3);
console.log(Number(Str3)); //123.154
console.log(typeof Num); //number
console.log(Str3, typeof Str3);  //123.154  string

 // 转换为浮点数,不更改原字符串 
console.log(parseFloat(Num)); //123.154
console.log(Str3, typeof Str3); //123.154  string

 // 转换为精点数,不更改原字符串 
console.log(parseInt(Num));  //123
console.log(Str3, typeof Str3);  //123.154  string
```

## `替换方法`

- \*\*`Str.replace(oldValue, newValue)`：用新的字符串替换旧的字符串，\*\*​**并返回替换后的新字符串**
- \*\*`Str.replaceAll() `\*\***ES2021**

```javascript
// 替换方法 
const Str4 = "Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell";

 //只替换第一个,并且不更改原字符串 
console.log(Str4.replace("Hello", "Heool"));
console.log(Str4); //Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell
```

`replace()` 方法不会更改调用它的字符串。`replace()` 方法返回一个新字符串。`replace()` 方法仅替换第一个匹配项

```javascript
text = text.replaceAll("Cats","Dogs");
text = text.replaceAll("cats","dogs");
```

`replaceAll()` 方法允许您指定要替换的正则表达式而不是字符串

如果参数是正则表达式，则必须设置全局标志（g），否则会抛出TypeError

```javascript
text = text.replaceAll(/Cats/g,"Dogs");
text = text.replaceAll(/cats/g,"dogs");
```

`replaceAll()` is an [ES2021](https://www.w3schools.com/js/js_2021.asp "ES2021") feature.`replaceAll()` 是ES2021特性

`replaceAll()` does not work in Internet Explorer.`replaceAll()` 在Internet Explorer中不起作用

## `去除空格`

- \*\*`Str.trim() `\*\***去除前后的空格 (ES5)**
- \*\*`Str.trimStart()`\*\***去除前面的空格(ES2019)**
- \*\*`Str.trimEnd() `\*\***去除后面的空格(ES2019)**

```javascript
// 去除空格--------------------------- 
const Str5 = "   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell   ";
 // 去掉前后 
console.log(Str5.trim()); //Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell

 // 去掉前面,不改变原字符串 
console.log(Str5.trimStart());
//Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell   
console.log(Str5); //   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell

 // 去掉后面,不改变原字符串 
console.log(Str5.trimEnd());//   Hello world, Hello world, Hello world, Hello world, Hello world, Hello world, Hell
```

## `首尾判断`

- `Str.startsWith(substring)`：判断字符串是否以指定子字符串开头，从第几个开始监测，返回布尔值。 ES6新增
- `Str.endsWith(substring)`：判断字符串是否以指定子字符串结尾，从第几个开始监测，返回布尔值。 ES6新增

```javascript
// 首尾判断
 const Str6 = "Hello world";

 // 判断首位(监测的字符，从哪里开始) 
console.log(Str6.startsWith("Hello")); //true
console.log(Str6.startsWith("world", 11)) //false

 // 判断尾部(监测的字符，从哪里开始) 
console.log(Str6.endsWith("world")) //true
console.log(Str6.startsWith("world", 11)) //false
```

## `拼接方法`

- **`  Str.concat(拼接的字符，拼接的内容)  `**\*\* 字符串的拼接\*\*  返回新字符串

```javascript
// 拼接方法---------------------
// 不改变原字符
const Str7 = "Hello world";
console.log(Str7.concat("ZXK")); //Hello worldZXK
console.log(Str7.concat("ZXK", "ZXK")); //Hello worldZXKZXK
console.log(Str7); //Hello world
const str1 = 'Hello';
const str2 = 'World';

console.log(str1.concat(' ', str2));
// Expected output: "Hello World"

console.log(str2.concat(', ', str1));
// Expected output: "World, Hello"
```

- `${str}` 拼接字符串方法

```javascript
 //模板字符串 
const  name  =  'John';
const age = 25;
console.log(`My name is ${name} and I am ${age} years old.`); // 输出: "My name is John and I am 25 years old."
// 模板字符串
const Str8 = "Hello";
const Str9 = "world";
console.log(`${Str8}` + `${Str9}`) //Hello world
```

## `填充方法(ES2017)`

- `Str.padStart(填充到多长，用什么填充) `支持在字符串的开头填充
- `Str.padEnd(填充到多长，用什么填充)` 支持在字符串的结尾填充

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
let padded = text.padStart(4,"0");
```

`padEnd()` 方法从末尾填充字符串。它用另一个字符串（多次）填充字符串，直到达到给定的长度

```javascript
let text = "5";
let padded = text.padEnd(4,"0"); //5000

let text = "5";
let padded = text.padEnd(4,"x"); //5xxx
```

`padEnd()` 方法是字符串方法。要填充数字，请先将数字转换为字符串

```javascript
let numb = 5;
let text = numb.toString();
let padded = text.padEnd(4,"0");
```

## `比较方法`

- `localeCompare()`: 比较两个字符串，并返回一个指示它们在排序顺序上的关系的数字

```vue
var str1 = "zxk "
var str2 = "zxk2"
const cmp = str1.localeCompare(str2);
const cmp2 = str2.localeCompare(str1);
console.log(cmp) //-1
console.log(cmp2) //1

```

## `重复方法`

- 该`repeat()`方法返回一个新字符串。该`repeat()`方法不会改变原始字符串

```javascript
let text = "Hello world!";
let result = text.repeat(2);
console.log(result)  //Hello world!Hello world!
```

## `获取文本`

- 该`valueOf()`方法返回字符串的原始值。不会改变原始字符串。可用于将字符串对象转换为字符串

```javascript
let x = 123;
console.log(x.valueOf()) // 123
console.log((123).valueOf()) // 123
console.log((100 + 23).valueOf()) // 123
```
