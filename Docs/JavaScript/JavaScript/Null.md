# null
<!-- 
## 目录

- [typeof null 的结果是什么，为什么？  ](#typeof-null-的结果是什么为什么--)
- [null和undefined区别](#null和undefined区别) -->

函数的返回值中,可能写null。

> 📌Null表示一个空对象的指针,所以typeOf null返回object

```javascript
var car = null;
console.log(typeof car)
只要变量保存空对象,而当时又没有对象可以保存,就使用null来填充该变量.
```

当一个变量不再使用时,可以设置为null,这样浏览器的垃圾回收机制,会将其回收.（GC：垃圾回收）

NaN产生的场景 1 转化失败 2 运算失败

NaN 的类型number

任何两个NaN都不相等

空值与 `undefined` 无关。

空字符串既有法律的值又有类型。

```javascript
let car = "";    // The value is "", the typeof is "string"
```

## typeof null 的结果是什么，为什么？ &#x20;

typeof null 的结果是Object。 &#x20;

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的类型标签(1-3 bits) 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型： &#x20;

```javascript
000: object   - 当前存储的数据指向一个对象。

  1: int      - 当前存储的数据是一个 31 位的有符号整数。

010: double   - 当前存储的数据指向一个双精度的浮点数。

100: string   - 当前存储的数据指向一个字符串。

110: boolean  - 当前存储的数据是布尔值。
```

如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。 &#x20;

有两种特殊数据类型： &#x20;

●undefined的值是 (-2)30(一个超出整数范围的数字)； &#x20;

●null 的值是机器码 NULL 指针(null 指针的值全是 0) &#x20;

那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object。

## null和undefined区别

&#x20;&#x20;

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。 &#x20;

undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。 &#x20;

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。
