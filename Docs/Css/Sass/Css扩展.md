
<a name="KUGUp"></a>
## 嵌套规则

:::info
Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，例如
:::
```sass
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}

// 编译为：
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }
```

<a name="hIRHC"></a>
## 父选择器

:::info
在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器
:::
```sass
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}

//编译为
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```

:::info
编译后的 CSS 文件中 & 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：
:::
```sass
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
// 编译为
#main {
  color: black; }
  #main a {
    font-weight: bold; }
    #main a:hover {
      color: red; }
```

:::info
& 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如
:::
```sass
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}

//编译为
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```

<a name="lDx5V"></a>
## 属性嵌套

:::info
有些 CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：
:::
```sass
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
// 编译为
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

命名空间也可以包含自己的属性值，例如：
```sass
.funky {
  font: 20px/24px {
    family: fantasy;
    weight: bold;
  }
}

// 编译为
.funky {
  font: 20px/24px;
    font-family: fantasy;
    font-weight: bold; }

```

<a name="vCE4E"></a>
## 占位符

:::info
Sass 额外提供了一种特殊类型的选择器：占位符选择器 (placeholder selector)。与常用的 id 与 class 选择器写法相似，只是 # 或 . 替换成了 %。必须通过 [@extend](https://www.sass.hk/docs/#t7-3) 指令调用，更多介绍请查阅 [@extend-Only Selectors](https://www.sass.hk/docs/#t7-3-6)。
:::
当占位符选择器单独使用时（未通过 @extend 调用），不会编译到 CSS 文件中。
