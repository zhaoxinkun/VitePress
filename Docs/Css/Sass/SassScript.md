
<a name="JbXT2"></a>
## Interactive Shell

:::info
Interactive Shell 可以在命令行中测试 SassScript 的功能。在命令行中输入 sass -i，然后输入想要测试的 SassScript 查看输出结果：
:::
```shell
$ sass -i
>> "Hello, Sassy World!"
"Hello, Sassy World!"
>> 1px + 1px + 1px
3px
>> #777 + #777
#eeeeee
>> #777 + #888
white
```

<a name="kyxCn"></a>
## $ 变量

:::info
SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 CSS 属性的写法一样：
:::
```sass
// 定义变量

$primary-color:#1269b5;
$zxk:#33545b;

// 使用变量
div.box {
  background-color: $primary-color;
}

h1.page-header {
  border: 1xp solid $zxk;
}

// 深层次变量
$primary-border:1px solid $primary-color;

// 使用变量
h2.page-header{
  border: $primary-border;
}


//如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中
　$side : left;

　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}

```

:::info
变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 !global 声明：
:::
```sass
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}

//  编译为：
#main {
  width: 5em;
}

#sidebar {
  width: 5em;
}
```

<a name="Z9Anj"></a>
## 数据类型

SassScript 支持 6 种主要的数据类型：

- 数字，1, 2, 13, 10px
- 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
- 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
- 布尔型，true, false
- 空值，null
- 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
- maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 !important 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串

<a name="YWM84"></a>
### 数组

数组 (lists) 指 Sass 如何处理 CSS 中 margin: 10px 15px 0 0 或者 font-face: Helvetica, Arial, sans-serif 这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组

数组本身没有太多功能，但 [Sass list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 赋予了数组更多新功能：nth 函数可以直接访问数组中的某一项；join 函数可以将多个数组连接在一起；append 函数可以在数组中添加新值；而 @each 指令能够遍历数组中的每一项

数组中可以包含子数组，比如 1px 2px, 5px 6px 是包含 1px 2px 与 5px 6px 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 (1px 2px) (5px 6px)。变化是，之前的 1px 2px, 5px 6px 使用逗号分割了两个子数组 (comma-separated)，而 (1px 2px) (5px 6px) 则使用空格分割(space-separated)

当数组被编译为 CSS 时，Sass 不会添加任何圆括号（CSS 中没有这种写法），所以 (1px 2px) (5px 6px) 与 1px 2px, 5px 6px 在编译后的 CSS 文件中是完全一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个数组的数组，而后者是包含四个值的数组

用 () 表示不包含任何值的空数组（在 Sass 3.3 版之后也视为空的 map）。空数组不可以直接编译成 CSS，比如编译 font-family: () Sass 将会报错。如果数组中包含空数组或空值，编译时将被清除，比如 1px 2px () 3px 或 1px 2px null 3px

基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。例如 (1,) 表示只包含 1 的数组，而 (1 2 3,) 表示包含 1 2 3 这个以空格分隔的数组的数组在 Sass（Syntactically Awesome Stylesheets）中，数组通常被称为列表（List）。列表是一种可以包含多个值的复合数据类型，值可以是任意类型，如数字、字符串、颜色等。Sass 列表可以用空格或逗号分隔，并且支持嵌套。以下是对 Sass 中列表的详细介绍

<a name="UcjMU"></a>
#### 创建列表

在 Sass 中，有两种主要方式创建列表：

1. **空格分隔列表**：
```sass
$list: 1 2 3 4 5;
```

2. **逗号分隔列表**：
```sass
$list: 1, 2, 3, 4, 5;
```

<a name="gu64Q"></a>
#### 列表操作函数

Sass 提供了一组内置函数来操作列表：

1. `length($list)`: 返回列表的长度
```sass
$list: 1, 2, 3;
$length: length($list); // 3
```

2. `append($list, $val, $separator: auto)`: 将一个值追加到列表的末尾
```sass
$list: 1, 2, 3;
$new-list: append($list, 4); // 结果：1, 2, 3, 4
```

3. `join($list1, $list2, $separator: auto)`: 将两个列表连接成一个列表
```sass
$list1: 1, 2;
$list2: 3, 4;
$joined-list: join($list1, $list2); // 结果：1, 2, 3, 4
```

4. `nth($list, $n)`: 返回列表中第 `n` 个元素
```sass
$list: 1, 2, 3;
$second: nth($list, 2); // 2
```

5. `set-nth($list, $n, $value)`: 设置列表中第 `n` 个元素的值
```sass
$list: 1, 2, 3;
$new-list: set-nth($list, 2, 10); // 结果：1, 10, 3
```

6. `index($list, $value)`: 返回列表中第一个匹配值的索引
```sass
$list: 1, 2, 3;
$index: index($list, 2); // 2
```

7. `list-separator($list)`: 返回列表的分隔符（逗号或空格）
```sass
$comma-list: 1, 2, 3;
$space-list: 1 2 3;

$comma-separator: list-separator($comma-list); // comma
$space-separator: list-separator($space-list); // space
```

<a name="TQGEV"></a>
#### 嵌套列表

列表可以嵌套，即列表中的元素可以是另一个列表
```sass
$nested-list: (1, 2, 3), (4, 5, 6);
```

<a name="Gwk9f"></a>
#### 迭代列表

使用 `@each` 指令可以迭代列表中的元素
```sass
$colors: red, green, blue;

@each $color in $colors {
  .#{$color} {
    color: $color;
  }
}

// 编译为：
.red {
  color: red;
}

.green {
  color: green;
}

.blue {
  color: blue;
}
```

<a name="hkDCY"></a>
### 字符串

:::info
SassScript 支持 CSS 的两种字符串类型：有引号字符串 (quoted strings)，如 "Lucida Grande" 'http://sass-lang.com'；与无引号字符串 (unquoted strings)，如 sans-serif bold，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 #{} (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：
:::
```sass
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");

// 编译为
body.firefox .header:before {
  content: "Hi, Firefox users!"; }

```

<a name="DBexB"></a>
### Maps

:::info
Sass 中的映射（maps）是一种数据结构，类似于 JavaScript 中的对象（objects）或 Python 中的字典（dictionaries），它由键值对组成。映射在 Sass 中非常有用，可以用来组织和存储复杂的数据结构，并且可以通过键来快速访问对应的值
:::

<a name="Kfw4i"></a>
#### 定义映射

Sass 中的映射使用 `(key: value, key: value, ...)` 的语法来定义。键和值可以是任意有效的 Sass 值
```sass
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  accent: #e74c3c
);
```

<a name="dq2PK"></a>
#### 访问映射中的值

使用 `map-get` 函数来访问映射中的值
```sass
$primary-color: map-get($colors, primary);

body {
  background-color: $primary-color; // #3498db
}
```

<a name="RMtlM"></a>
#### 合并映射
使用 `map-merge` 函数来合并两个映射
```sass
$more-colors: (
  warning: #f39c12,
  info: #8e44ad
);

$all-colors: map-merge($colors, $more-colors);

// Now $all-colors contains all the key-value pairs from $colors and $more-colors
```

<a name="tj9VL"></a>
#### 移除映射中的键

使用 `map-remove` 函数来从映射中移除一个或多个键
```sass
$updated-colors: map-remove($all-colors, accent, warning);

// Now $updated-colors does not contain 'accent' and 'warning' keys
```

<a name="dZ9EJ"></a>
#### 获取映射中的所有键或值

使用 `map-keys` 函数获取映射中的所有键，使用 `map-values` 函数获取映射中的所有值
```sass
$keys: map-keys($all-colors);
$values: map-values($all-colors);

// $keys will contain primary, secondary, accent, warning, info
// $values will contain #3498db, #2ecc71, #e74c3c, #f39c12, #8e44ad
```

<a name="rRBnH"></a>
#### 检查映射中是否包含某个键

使用 `map-has-key` 函数来检查映射中是否包含某个键
```sass
$has-primary: map-has-key($all-colors, primary); // true
$has-danger: map-has-key($all-colors, danger); // false
```

<a name="jRcYN"></a>
#### 迭代映射

使用 `@each` 语句来迭代映射中的每个键值对
```sass
@each $key, $value in $all-colors {
  .text-#{$key} {
    color: $value;
  }
}

// This will generate classes like:
// .text-primary { color: #3498db; }
// .text-secondary { color: #2ecc71; }
// .text-accent { color: #e74c3c; }
// .text-warning { color: #f39c12; }
// .text-info { color: #8e44ad; }
```

<a name="nAxMZ"></a>
#### 嵌套映射

映射可以嵌套在其他映射中，形成多层次的数据结构
```sass
$theme: (
  colors: (
    primary: #3498db,
    secondary: #2ecc71
  ),
  fonts: (
    main: 'Helvetica, sans-serif',
    code: 'Courier, monospace'
  )
);

$primary-color: map-get(map-get($theme, colors), primary);
$main-font: map-get(map-get($theme, fonts), main);

body {
  background-color: $primary-color;
  font-family: $main-font;
}
```

<a name="HbNsG"></a>
#### 示例：用映射管理主题

一个实际的例子，使用映射来管理一个网站的主题颜色和字体
```sass
$theme: (
  colors: (
    primary: #3498db,
    secondary: #2ecc71,
    background: #ecf0f1,
    text: #2c3e50
  ),
  fonts: (
    body: 'Helvetica, sans-serif',
    heading: 'Georgia, serif'
  )
);

body {
  background-color: map-get(map-get($theme, colors), background);
  color: map-get(map-get($theme, colors), text);
  font-family: map-get(map-get($theme, fonts), body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: map-get(map-get($theme, fonts), heading);
}
```

:::info
Sass 中的映射是一种强大的数据结构，可以用来组织和管理复杂的样式数据。通过映射，可以更清晰地定义主题、颜色、字体等配置，提高代码的可读性和可维护性。结合 Sass 提供的各种映射操作函数，可以方便地操作和处理这些数据
:::

<a name="u51D7"></a>
### 颜色

:::info
暂时不做介绍
:::

<a name="Ffj59"></a>
## 计算功能

Sass（Syntactically Awesome Stylesheets）是一种强大的 CSS 扩展语言，提供了许多 CSS 所没有的功能，其中之一就是其计算功能。Sass 允许在样式中进行数学运算，使得编写和维护 CSS 变得更加简洁和灵活

Sass 支持多种数学运算符，用于数值、颜色、长度等值的计算。以下是 Sass 中常见的数学运算和使用示例：
<a name="vc7zA"></a>
### 数字运算

加法（Addition）
```sass
$width: 100px;
$padding: 20px;
$total-width: $width + $padding;

div {
  width: $total-width; // 120px
}
```

减法（Subtraction）
```sass
$full-width: 200px;
$padding: 30px;
$content-width: $full-width - $padding;

div {
  width: $content-width; // 170px
}
```

乘法（Multiplication）
```sass
$font-size: 16px;
$line-height: 1.5;
$computed-line-height: $font-size * $line-height;

p {
  line-height: $computed-line-height; // 24px
}
```

除法（Division）
:::info
在 Sass 中，除法有些特殊。当 `/` 两侧的值都是数字时，Sass 将其视为数学运算符；否则，它会被视为 CSS 的分隔符。因此，建议使用 `math.div` 函数来避免歧义
:::
```sass
@use 'sass:math';

$total-width: 400px;
$columns: 4;
$column-width: math.div($total-width, $columns);

div {
  width: $column-width; // 100px
}
```

取余（Modulo）
```sass
$items: 5;
$columns: 3;
$remainder: $items % $columns;

div {
  content: $remainder; // 2
}
```

<a name="Lx9gZ"></a>
### 颜色运算

:::info
Sass 也支持对颜色值进行运算，可以通过加减改变颜色的亮度、饱和度等属性
:::
颜色加法和减法
```sass
$base-color: #333;
$lightened-color: $base-color + #555;
$darkened-color: $base-color - #111;

div {
  background-color: $lightened-color; // #888
  color: $darkened-color; // #222
}

// 案例
p {
  color: #010203 + #040506;
}
// 计算 01 + 04 = 05 02 + 05 = 07 03 + 06 = 09，然后编译为
p {
  color: #050709; }

// 案例
p {
  color: #010203 * 2;
}
// 计算 01 * 2 = 02 02 * 2 = 04 03 * 2 = 06，然后编译为
p {
  color: #020406; }
```

:::info
需要注意的是，如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值
:::
```sass
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}

// 编译为
p {
  color: rgba(255, 255, 0, 0.75); }

```

:::info
颜色值的 alpha channel 可以通过 [opacify](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#opacify-instance_method) 或 [transparentize](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#transparentize-instance_method) 两个函数进行调整
:::
```sass
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}
// 编译为
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25); }
```

:::info
IE 滤镜要求所有的颜色值包含 alpha 层，而且格式必须固定 #AABBCCDD，使用 ie_hex_str 函数可以很容易地将颜色转化为 IE 滤镜要求的格式
:::
```sass
$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}

// 编译为：
$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}
```

<a name="jxHEY"></a>
### 连接语句

:::info
+ 可用于连接字符串
:::
```sass
p {
  cursor: e + -resize;
}

编译为：
p {
  cursor: e-resize; }
```

:::info
注意，如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号
:::
```sass
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
// 编译为：
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

:::info
运算表达式与其他值连用时，用空格做连接符：
:::
```sass
p {
  margin: 3px + 4px auto;
}

// 编译为
p {
  margin: 7px auto; }

```


<a name="Ha8xW"></a>
### 插值语句

:::info
可以将变量动态插值到字符串中
:::
```sass
$size: 100px;

div {
  width: #{$size}; // 100px
}
```

```sass
$base-padding: 10px;
$multiplier: 2;
$font-size: 16px;
$line-height: 1.5;

@mixin box-sizing {
  box-sizing: border-box;
}

.container {
  @include box-sizing;
  padding: $base-padding * $multiplier; // 20px
  font-size: $font-size;
  line-height: $font-size * $line-height; // 24px
}
```

<a name="L10J1"></a>
### 注意事项

- **单位一致性**：进行数学运算时，确保参与运算的值具有相同的单位，否则会导致错误
- **使用**`math.div`**函数**：Sass 中的 `/` 运算符可能导致歧义，建议使用 `math.div` 函数进行除法运算
- **Sass 版本**：部分新功能可能需要较新的 Sass 版本，请确保你的环境是最新的

<a name="YdDhD"></a>
## 变量定义 !default 

:::info
可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。
:::
```sass
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
// 编译为
#main {
  content: "First content";
  new-content: "First time reference"; }
```

:::info
变量是 null 空值时将视为未被 !default 赋值
:::
```sass
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}
// 编译为：
#main {
  content: "Non-null content"; }
```
