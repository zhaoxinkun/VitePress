# Math

<!-- ## 目录

- [Math.abs(x)](#Mathabsx)
- [Math.ceil(x)](#Mathceilx)
- [Math.floor(x)](#Mathfloorx)
- [Math.round(x)](#Mathroundx)
- [Math.max(...args)](#Mathmaxargs)
- [Math.min(...args)](#Mathminargs)
- [Math.pow(x, y)](#Mathpowx-y)
- [Math.sqrt(x)](#Mathsqrtx)
- [Math.random()](#Mathrandom)
- [Math.toFixed（）](#MathtoFixed)
- [Math.PI](#MathPI)
- [Math.toPrecision()](#MathtoPrecision)
- [Math.trunc(x)(ES6)](#MathtruncxES6)
- [Math.sign()(ES6)](#MathsignES6)
- [Math.cbrt()(ES6)](#MathcbrtES6)
- [Math.log2()(ES6)](#Mathlog2ES6)
- [Math.log10()(ES6)](#Mathlog10ES6)
- [随机色块](#随机色块)
- [取值区间](#取值区间)
- [API](#API) -->

> 📌不是一种数据类型，是一个内置对象

## `Math.abs(x)`

- 返回指定数字的绝对值。

```javascript
var result = Math.abs(-10);
console.log(result); // 10
```

## `Math.ceil(x)`

- 返回大于或等于指定数字的最小整数。

```javascript
var result = Math.ceil(4.3);
console.log(result); // 5
```

## `Math.floor(x)`

- 返回小于或等于指定数字的最大整数。

```javascript
var result = Math.floor(4.9);
console.log(result); // 4
```

## `Math.round(x)`

- 返回指定数字的四舍五入值。

```javascript
var result = Math.round(4.5);
console.log(result); // 5
```

## `Math.max(...args)`

- 返回一组数字中的最大值。

```javascript
var result = Math.max(10, 5, 8);
console.log(result); // 10
```

## `Math.min(...args)`

- 返回一组数字中的最小值。

```javascript
var result = Math.min(10, 5, 8);
console.log(result); // 5
```

## `Math.pow(x, y)`

- 返回 x 的 y 次幂。

```javascript
var result = Math.pow(2, 3);
console.log(result); // 8
```

## `Math.sqrt(x)`

- 返回指定数字的平方根。

```javascript
var result = Math.sqrt(16);
console.log(result); // 4
```

## `Math.random()`

- 返回一个 0 到 1 之间的随机数。

```javascript
var result = Math.random();
console.log(result); // 0.456789123
```

## `Math.toFixed（）`

- 会变成字符串

```javascript
    // toFixed()  小数保留几位，想要留几位就在括号里面写几 
    console.log(Math.PI.toFixed(2));// '3.14' 
    console.log(typeof Math.PI.toFixed(2));
```

## `Math.PI`

- `Math.PI` 得到的是 `π` 的值，也就是 `3.1415936...`

```javascript
console.log(Math.PI) // 3.141592653589793
```

因为计算机的计算精度问题，只能得到小数点后 15 位

**使用 Math.PI 的时候，是不需要加 () 的**

## `Math.toPrecision()`

- 用于将数字转换为指定精度的字符串表示。该方法接受一个参数，指定返回字符串的总有效位数，包括整数部分和小数部分。

```css
const number = 123.456789;

console.log(number.toPrecision(5)); // 输出 "123.46"
console.log(number.toPrecision(7)); // 输出 "123.4568"
console.log(number.toPrecision(10)); // 输出 "123.456789"

```

在上述示例中，我们创建一个数字 `number`，然后使用 `toPrecision()` 方法将其转换为指定精度的字符串表示。对于每个例子，传递的参数决定了返回字符串的总有效位数。

需要注意的是，`toPrecision()` 方法会自动进行四舍五入操作，以确保返回的字符串具有指定的精度。

此外，如果传递给 `toPrecision()` 方法的参数是一个超过数字总位数的值，它将会自动添加零位到整数部分或小数部分，以达到指定的精度。

## `Math.trunc(x)`(ES6)

- `Math.trunc(x)` 是 JavaScript 中的数学函数之一，用于将一个数字的小数部分舍去，返回其整数部分。

示例：

```javascript
console.log(Math.trunc(4.9)); // 输出 4
console.log(Math.trunc(-3.2)); // 输出 -3
console.log(Math.trunc(0.8)); // 输出 0
```

在上述示例中，`Math.trunc()` 将传入的数字参数 `x` 的小数部分去除，并返回整数部分。它会对正数和负数均有效，如果值为正数，则直接向下取整；如果值为负数，则向上取整（即绝对值减小，负号保持）。

需要注意的是，`Math.trunc()` 只处理数值类型的参数，而非数值类型的参数会被转换为数值类型后再进行截断操作。如果参数无法被转换为数值类型，将返回 NaN。

示例：

```javascript
console.log(Math.trunc('3.14159')); // 输出 3，字符串被转换为数值再执行 trunc()
console.log(Math.trunc(true)); // 输出 1，布尔值 true 被转换为数值 1 再执行 trunc()
console.log(Math.trunc('hello')); // 输出 NaN，无法将字符串转换为数值
```

在实际应用中，`Math.trunc()` 常用于对浮点数进行取整操作，得到其整数部分，而忽略小数部分。

## `Math.sign()`(ES6)

## `Math.cbrt()`(ES6)

## `Math.log2()`(ES6)

## `Math.log10()`(ES6)

## 随机色块

```javascript
    // 1 编写一个函数，获得一个十六进制的随机颜色的字符串(例如：#20CD4F)(0-9a-f)
       function getColor() {
          // 思考:随机颜色->Math.random() 0-1   color:red/#ff0000/rgb(255,255,255)
          // 首先 定义一个数组，用来存储这个0-255之间的这个随机数
          var arr = [];
          // 循环遍历输出任意的三位数，放到数组中
          for (var i = 0; i < 3; i++) {
              arr.push(Math.round(Math.random() * 255));
          }
          console.log(arr);//[65, 0, 103]
          // 把上面数组中的每一项遍历，转换为16进制
          var str = '#';
          for (var i in arr) {
              // str = str + arr[i].toString(16);
              str += arr[i].toString(16);
          }
          return str;
      }
      var res = getColor();
      console.log(res);//#667788
      //给页面中的input增加随机的背景色
      inp.style.background = res; 
```

## 取值区间

```javascript
//2-5的话

//公式   ：min+Math.floor（Math.random（）*（Max-min））
//想要取到5，那就是
//公式   ：min+Math.floor（Math.random（）*（Max-min+1））

```

## API

这些都是 `Math` 对象的方法，下面为您解释每个方法的作用：

- `abs(x)`：返回指定数字的绝对值。例如，`Math.abs(-10)` 的结果是 `10`。
- `acos(x)`：返回指定数字的反余弦值（弧度）。例如，`Math.acos(0.5)` 的结果是 `1.0471975511965979`。
- `acosh(x)`：返回指定数字的反双曲余弦值。例如，`Math.acosh(2)` 的结果是 `1.3169578969248166`。
- `asin(x)`：返回指定数字的反正弦值（弧度）。例如，`Math.asin(0.5)` 的结果是 `0.5235987755982989`。
- `asinh(x)`：返回指定数字的反双曲正弦值。例如，`Math.asinh(2)` 的结果是 `1.4436354751788103`。
- `atan(x)`：返回指定数字的反正切值（弧度）。例如，`Math.atan(1)` 的结果是 `0.7853981633974483`。
- `atan2(y, x)`：返回给定的 X 坐标和 Y 坐标的反正切值（弧度）。例如，`Math.atan2(1, 1)` 的结果是 `0.7853981633974483`。
- `atanh(x)`：返回指定数字的反双曲正切值。例如，`Math.atanh(0.5)` 的结果是 `0.5493061443340549`。
- `cbrt(x)`：返回指定数字的立方根。例如，`Math.cbrt(27)` 的结果是 `3`。
- `ceil(x)`：返回大于或等于指定数字的最小整数。例如，`Math.ceil(4.3)` 的结果是 `5`。
- `clz32(x)`：返回一个数字在转为 32 位无符号整数后，前导零的个数。例如，`Math.clz32(7)` 的结果是 `29`。
- `cos(x)`：返回指定角度的余弦值。例如，`Math.cos(Math.PI)` 的结果是 `-1`。
- `cosh(x)`：返回指定数字的双曲余弦值。例如，`Math.cosh(0)` 的结果是 `1`。
- `exp(x)`：返回指定数字的指数值。例如，`Math.exp(1)` 的结果是 `2.718281828459045`。
- `expm1(x)`：返回 Math.exp(x) - 1 的值。例如，`Math.expm1(1)` 的结果是 `1.718281828459045`。
- `floor(x)`：返回小于或等于指定数字的最大整数。例如，`Math.floor(4.9)` 的结果是 `4`。
- `fround(x)`：返回指定数字的单精度浮点数表示。例如，`Math.fround(1.337)` 的结果是 `1.3370000123977661`。
- `hypot(...args)`：返回一组数字的平方和的平方根。例如，`Math.hypot(3, 4)` 的结果是 `5`。
- `imul(x, y)`：返回两个数的 32 位带符号整数乘法结果。例如，`Math.imul(2, 3)` 的结果是 `6`。
- `log(x)`：返回指定数字的自然对数（以 e 为底）。例如，`Math.log(Math.E)` 的结果是 `1`。
- `log1p(x)`：返回 Math.log(1 + x) 的值。例如，`Math.log1p(Math.E - 1)` 的结果是 `1`。
- `log2(x)`：返回以 2 为底的指定数字的对数。例如，`Math.log2(8)` 的结果是 `3`。
- `log10(x)`：返回以 10 为底的指定数字的对数。例如，`Math.log10(100)` 的结果是 `2`。
- `max(...args)`：返回一组数字中的最大值。例如，`Math.max(10, 5, 8)` 的结果是 `10`。
- `min(...args)`：返回一组数字中的最小值。例如，`Math.min(10, 5, 8)` 的结果是 `5`。
- `pow(x, y)`：返回 x 的 y 次幂。例如，`Math.pow(2, 3)` 的结果是 `8`。
- `random()`：返回一个 0 到 1 之间的随机数。例如，`Math.random()` 的结果是 `0.456789123`。
- `round(x)`：返回指定数字的四舍五入值。例如，`Math.round(4.5)` 的结果是 `5`。
- `sign(x)`：返回指定数字的符号（正、负或零）。例如，`Math.sign(-10)` 的结果是 `-1`。
- `sin(x)`：返回指定角度的正弦值。例如，`Math.sin(Math.PI / 2)` 的结果是 `1`。
- `sinh(x)`：返回指定数字的双曲正弦值。例如，`Math.sinh(0)` 的结果是 `0`。
- `sqrt(x)`：返回指定数字的平方根。例如，`Math.sqrt(16)` 的结果是 `4`。
- `tan(x)`：返回指定角度的正切值。例如，`Math.tan(0)` 的结果是 `0`。
- `tanh(x)`：返回指定数字的双曲正切值。例如，`Math.tanh(0)` 的结果是 `0`。
- `trunc(x)`：去除指定数字的小数部分，返回整数部分。例如，`Math.trunc(4.9)` 的结果是 `4`。
