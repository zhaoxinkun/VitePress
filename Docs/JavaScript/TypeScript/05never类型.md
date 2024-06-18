# never类型



> 📌**never 是任何类型的子类型，可以赋值给任何类型，没有类型是 never 的子类型。“底层类型”（bottom type）。**

> 📌`never`类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

never 类型的特点

- never 没有任何子类型，所以任何类型都不可以赋值给 never
- 函数抛出异常或无限循环时返回值是 never
- 可以将每个类型理解为某类值的集合，比如 number 类型包含所有数字，但 never 类型没有任何值。

> 📌情况一，抛出错误函数。注意，只有抛出错误，才是 never 类型。如果显式用`return`语句返回一个 Error 对象，返回值就不是 never 类型。

```typescript
function neverfun02(): never {
  //抛出异常
  throw "异常了"; //合法
}

```

> 另外，由于抛出错误的情况属于`never`类型或`void`类型，所以无法从返回值类型中获知，抛出的是哪一种错误。

> 📌情况二，无限执行的函数

```typescript
function neverfun(): never {
  //  报错，因为不能有返回的终点，要么在这里抛出异常，要么直接无限循环
  // 情况一。无限循环
  while (true);
}
```

上面示例中，函数`sing()`会永远执行，不会返回，所以返回值类型是`never`。

> **never 是所有类型的子类型，可以分配给任何类型**

```typescript
function f():never {
  throw new Error('Error');
}

let v1:number = f(); // 不报错
let v2:string = f(); // 不报错
let v3:boolean = f(); // 不报错
```

上面示例中，函数`f()`会抛出错误，所以返回值类型可以写成`never`，即不可能返回任何值。各种其他类型的变量都可以赋值为`f()`的运行结果（`never`类型）。

> 📌为什么`never`类型可以赋值给任意其他类型呢？这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。

> **其他类型不可以分配给 never 类型**

```typescript
type AKUN= string extends never ? string : boolean //boolean

```

> **如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于**\*\*`never`\*\***类型。**

```typescript
function fn(x:string|number) {
  if (typeof x === 'string') {
    // ...
  } else if (typeof x === 'number') {
    // ...
  } else {
    x; // never 类型
  }
}
```

上面示例中，参数变量`x`可能是字符串，也可能是数值，判断了这两种情况后，剩下的最后那个`else`分支里面，`x`就是`never`类型了。
