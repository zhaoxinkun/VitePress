# any类型

<!-- ## 目录

- [any类型](#any类型)
  - [目录](#目录)
  - [污染问题](#污染问题) -->



> 📌**使用 any 指包含所有值的顶部类型，所以 any 不进行类型检查，等于关闭了 TS 对该变量的严格类型校验，TypeScript 有两个“顶层类型”（****`any`****和****`unknown`****）**

- 使用 any 类型等同于使用纯 JavaScript 的开发方式，除非你是因为你的项目是旧版本的js
- 从集合论的角度看，`any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。TypeScript 将这种类型称为“顶层类型”（top type），意为涵盖了所有下层。
- 使用 any 类型将失去 typescript 静态类型的强制检测
- 只有在描述一个根本不知道的类型时使用 any，**会造成其他污染**

可以将 any 视为所有类型的组合表示

```typescript
var anyakun: string | boolean | number;
anyakun = "akun";
anyakun = true;
anyakun = 100;

```

下面是设置基本 any 的示例

```typescript
let anyakun02: any;
//以下赋值不会报错
anyakun02 = "akun";
anyakun02 = 1999;
anyakun02 = true;
anyakun02 = [];
anyakun02 = {};
anyakun02 = class {};
```

在数组中使用 any 类型，可以设置任意类型的值

```typescript
let anyakun03: any[] = ["akun.com", "akun", 2010, true];
```

也可以使用泛型的方式设置 any 类型数组

```typescript
let anyakun04: Array<any> = ["akun.com", "akun", 2010, true];

```

为对象属性设置类型

```typescript
// 对象
let anyakun05: {
  name: any;
  year: any;
};
//以下设置都不会报错
anyakun05 = { name: "akun", year: 2010 };
anyakun05 = { name: 2010, year: "akun" };
```

any 太过宽泛所以不建议使用，他会丢失 TS 的严格类型校验，比如下面的示例并不会报错

```typescript
// //添加或使用不存的属性或者方法
let anyakun06: any;
anyakun06.get(); //不会报错
```

下面再来看一下对象的使用 any 类型造成的问题

```typescript
// 示例
class anyakun07 {
  constructor() {}
  get = () => "akun";
}

const obj: any = new anyakun07();
console.log(obj.get()); //akun
```

所以上例需要指定正确的 akun类型，而不是使用 any

```typescript
...
const obj:akun = new anyakun07 ;
...
```

> 能过设置 tsconfig.json 的 `noImplicitAny=true` 配置项，可以禁止隐含的 any 类型。以下代码会在编译时报错

```bash
$ tsc --noImplicitAny XXX.ts
```

```typescript
function sum(a, b) {
  return a + b
}

```

> 📌这里有一个特殊情况，即使打开了`noImplicitAny`，使用`let`和`var`命令声明变量，但不赋值也不指定类型，是不会报错的。

```typescript
//这种没有赋值的情况是不会报错的
var x; // 不报错
let y; // 不报错
```

上面示例中，变量`x`和`y`声明时没有赋值，也没有指定类型，TypeScript 会推断它们的类型为`any`。这时即使打开了`noImplicitAny`，也不会报错。

```typescript
let x;

x = 123;
x = { foo: 'hello' };
```

上面示例中，变量`x`的类型推断为`any`，但是不报错，可以顺利通过编译。

由于这个原因，建议使用`let`和`var`声明变量时，如果不赋值，就一定要显式声明类型，否则可能存在安全隐患。

`const`命令没有这个问题，因为 JavaScript 语言规定`const`声明变量时，必须同时进行初始化（赋值）。

```typescript
const x; // 报错
```

上面示例中，const命令声明的x是不能改变值的，声明时必须同时赋值，否则报错，所以它不存在类型推断为any的问题。

## 污染问题

> 📌`any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。

```typescript
let x:any = 'hello';
let y:number;

y = x; // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```

上面示例中，变量`x`的类型是`any`，实际的值是一个字符串。变量`y`的类型是`number`，表示这是一个数值变量，但是它被赋值为`x`，这时并不会报错。然后，变量`y`继续进行各种数值运算，TypeScript 也检查不出错误，问题就这样留到运行时才会暴露。

污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因。
