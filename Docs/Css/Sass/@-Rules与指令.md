
<a name="w7WOM"></a>
## @import 导入

:::info
Sass 拓展了 @import 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用
:::

Sass 在当前地址，或 Rack, Rails, Merb 的 Sass 文件地址寻找 Sass 文件，如果需要设定其他地址，可以用 :load_paths 选项，或者在命令行中输入 --load-path 命令

通常，@import 寻找 Sass 文件并将其导入，但在以下情况下，@import 仅作为普通的 CSS 语句，不会导入任何 Sass 文件

- 文件拓展名是 .css
- 文件名以 http:// 开头
- 文件名是 url()
- @import 包含 media queries

如果不在上述情况内，文件的拓展名是 .scss 或 .sass，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 .scss 或 .sass 的文件并将其导入
```sass
//base.scss
bady{
  padding: 0;
  margin: 0;
}

//
@import "base" ;
// 定义
.alert {
  padding: 15px;
}

// 然后继承
.alert-info {
  @extend .alert;
  background-color: #fff;
}

// 扩展,也会被继承走
.alert a {
  font-weight: bold;
}
```

:::info
导入文件也可以使用 #{ } 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 url() 导入方式：
:::
```sass
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=\#{$family}");
// 编译为：
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

<a name="gkXQM"></a>
## Partials 分音

:::info
如果需要导入 SCSS 或者 Sass 文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线
:::
例如，将文件命名为 _colors.scss，便不会编译 _colours.css 文件
```sass
@import "colors";
```
上面的例子，导入的其实是 _colors.scss 文件<br />注意，不可以同时存在添加下划线与未添加下划线的同名文件，添加下划线的文件将会被忽略。

<a name="pM02g"></a>
## 嵌套@import

:::info
大多数情况下，一般在文件的最外层（不在嵌套规则内）使用 @import，其实，也可以将 @import 嵌套进 CSS 样式或者 @media 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中
:::
假设 example.scss 文件包含以下样式：
```sass
.example {
  color: red;
}
```

然后导入到 #main 样式内
```sass
#main {
  @import "example";
}

// 编译为：
#main .example {
  color: red;
}
```

:::info
不可以在混合指令 (mixin) 或控制指令 (control directives) 中嵌套 @import。
:::

<a name="OnjPi"></a>
## @media

:::info
Sass 中 @media 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 @media 嵌套在 CSS 规则内，编译时，@media 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 @media 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程
:::
```sass
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
// 编译为：
.sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .sidebar {
      width: 500px; } }

```

:::info
@media 的 queries 允许互相嵌套使用，编译时，Sass 自动添加 and
:::
```sass
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}

// 编译为：
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; } }
```

:::info
@media 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值：
:::
```sass
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
// 编译为
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px; } }
```

<a name="XLgff"></a>
## @extend 继承

:::info
在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式
:::
```sass
// 定义
.alert {
  padding: 15px;
}

// 然后继承
.alert-info {
  @extend .alert;
  background-color: #fff;
}

// 扩展,也会被继承走
.alert a {
  font-weight: bold;
}
```

:::info
在指令中使用 @extend 时（比如在 @media 中）有一些限制：Sass 不可以将 @media 层外的 CSS 规则延伸给指令层内的 CSS，这样会生成大量的无用代码。也就是说，如果在 @media （或者其他 CSS 指令）中使用 @extend，必须延伸给相同指令层中的选择器
:::
```sass
可以：
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}

不可以：
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```

更多待续。。。

<a name="fGzOT"></a>
## !optional 声明

如果 @extend 失败会收到错误提示，比如，这样写 a.important {@extend .notice}，当没有 .notice 选择器时，将会报错，只有 h1.notice 包含 .notice 时也会报错，因为 h1 与 a 冲突，会生成新的选择器。<br />如果要求 @extend 不生成新选择器，可以通过 !optional 声明达到这个目的，例如：
```sass
a.important {
  @extend .notice !optional;
}
```

<a name="Rhpgu"></a>
## @at-root

更多待续。。。

<a name="GluPQ"></a>
## @debug

更多待续。。。

<a name="VGr41"></a>
## @warn

更多待续。。。

