# NUll\&undefined

> null 与 undefined 也是变量类型，用于定义值为 null 或 undefined

- undefined 类型只包含一个值`undefined`，表示未定义（即还未给出定义，以后可能会有定义）。
  ```typescript
  // undefined
  let Sakun09: undefined = undefined;
  ```
- null 类型也只包含一个值`null`，表示为空（即此处没有值）。
  ```typescript
  // null
  let Sakun10: null = null;

  ```

> 注意，如果没有声明类型的变量，被赋值为`undefined`或`null`，在关闭编译设置`noImplicitAny`和`strictNullChecks`时，它们的类型会被推断为`any`。也可以赋值给任何类型。

```typescript
// 关闭 noImplicitAny 和 strictNullChecks

let a = undefined;   // any
const b = undefined; // any

let c = null;        // any
const d = null;      // any

let a: string = "hello";
a = null; // 合法
a = undefined; // 合法

```

> 如果希望避免这种情况，则需要打开编译选项`strictNullChecks`。

```typescript
// strictNullChecks 启用时
let a: string = "hello";
a = null; // 错误: 不能将类型“null”分配给类型“string”
a = undefined; // 错误: 不能将类型“undefined”分配给类型“string”

let b: string | null = "hello";
b = null; // 合法
b = undefined; // 错误: 不能将类型“undefined”分配给类型“string | null”

let c: string | undefined = "hello";
c = null; // 错误: 不能将类型“null”分配给类型“string | undefined”
c = undefined; // 合法

let d: string | null | undefined = "hello";
d = null; // 合法
d = undefined; // 合法

let e: void = undefined; // 合法
e = null; // 错误: 不能将类型“null”分配给类型“void”

let f: undefined = undefined; // 合法
f = null; // 错误: 不能将类型“null”分配给类型“undefined”

let g: null = null; // 合法
g = undefined; // 错误: 不能将类型“undefined”分配给类型“null”

let a: any = null; // 合法
let b: any = undefined; // 合法

let c: unknown = null; // 合法
let d: unknown = undefined; // 合法

```

> 上面示例中，打开编译设置`strictNullChecks`以后，赋值为`undefined`的变量会被推断为`undefined`类型，赋值为`null`的变量会被推断为`null`类型。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）

- **`undefined`**\*\* 只能赋值给 ****`undefined`**** 和 ****`void`****类型 \*\*。
- **`null`**\*\* 只能赋值给 ****`null`****类型 \*\*。
- **`any`**\*\* 和 ****`unknown`**** 类型\*\*可以接受 `undefined` 和 `null`。

> 下面是函数返回值的使用

```typescript
function getName():string |null{
    return null
}
console.log(getName());
```

### 他俩的特殊性

`undefined`和`null`既是值，又是类型。

作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为`undefined`或`null`。

```typescript
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

上面代码中，变量`age`的类型是`number`，但是赋值为`null`或`undefined`并不报错。

这并不是因为`undefined`和`null`包含在`number`类型里面，而是故意这样设计，任何类型的变量都可以赋值为`undefined`和`null`，以便跟 JavaScript 的行为保持一致。

JavaScript 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值。

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。

```typescript
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错
```

上面示例中，变量`obj`等于`undefined`，编译不会报错。但是，实际执行时，调用`obj.toString()`就报错了，因为`undefined`不是对象，没有这个方法。

为了避免这种情况，及早发现错误，TypeScript 提供了一个编译选项`strictNullChecks`。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

下面是 tsc 命令打开这个编译选项的例子。

```typescript
// tsc --strictNullChecks app.ts

let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```

在TS中null与undefined使用与js是有区别的，下面的代码是有问题的，因为null没有toLowerCase()方法。但默认是不报错的，在tsconfig.json配置文件中定义 `"strictNullChecks":true` 或 `"strict": true` 将会对代码进行报错提示。

```typescript
function render(content: string) {
  console.log(content.toLowerCase())
}

render(null)
```

上面示例中，打开`--strictNullChecks`以后，`number`类型的变量`age`就不能赋值为`undefined`和`null`。

这个选项在配置文件`tsconfig.json`的写法如下。

```typescript
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

打开`strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。

```typescript
// 打开 strictNullChecks

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```

上面示例中，`undefined`类型的变量赋值为`null`，或者`null`类型的变量赋值为`undefined`，都会报错。

总之，打开`strictNullChecks`以后，`undefined`和`null`只能赋值给自身，或者`any`类型和`unknown`类型的变量。

```typescript
let x:any     = undefined;
let y:unknown = null;
```
