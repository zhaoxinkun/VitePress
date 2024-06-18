# Symbol

<!-- ## 目录

- [Symbol](#symbol)
  - [目录](#目录)
  - [自动推断](#自动推断)
  - [`symbol `](#symbol-)
  - [`unique symbol`](#unique-symbol)
  - [区别](#区别) -->

## 自动推断

- `let`命令声明的变量，推断类型为 symbol。
  ```typescript
  // let定义symbol推断为symbol
  let sym = Symbol(); //symbol
  ```
- 但是，`const`命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol。
  ```typescript
  // let声明的symbol一定是symbol,然后复制给另一个const也是symbol
  let sym03 = Symbol(); //symbol
  // 类型为 symbol
  const sym04 = sym03; // const sym04=symbol()
  ```
- `let`命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol。
  ```typescript
  // 这里推断一定是US,赋值给let也是symbol
  const sym05 = Symbol();
  // 类型为 symbol
  let sym06 = sym05;
  ```

## `symbol `

> Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。

Symbol 值通过`Symbol()`函数生成。在 TypeScript 里面，Symbol 的类型使用`symbol`表示。

```typescript
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y // false
```

上面示例中，变量`x`和`y`的类型都是`symbol`，且都用`Symbol()`生成，但是它们是不相等的。

## `unique symbol`

`symbol`类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。

但是比如，6是一个具体的数值，就用6这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 Symbol 值的那种值类型。

为了解决这个问题，TypeScript 设计了`symbol`的一个子类型`unique symbol`，它表示单个的、某个具体的 Symbol 值。

> **因为**\*\*`unique symbol`****表示单个值，所以这个类型的变量是不能修改值的，只能用****`const`****命令声明，不能用****`let`\*\***声明。**

```typescript
// 正确
const x:unique symbol = Symbol();

// 报错
let y:unique symbol = Symbol();
```

> **上面示例中，** \*\*​`let`****命令声明的变量，不能是****`unique symbol`\*\***类型，会报错。**

因为`unique symbol`表示单个值，所以这个类型的变量是不能修改值的，只能用`const`命令声明，不能用`let`声明。

```typescript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();
```

每个声明为`unique symbol`类型的变量，它们的值都是不一样的，其实属于两个值类型。

```typescript
const sym07:unique symbol = Symbol();
const sym08:unique symbol = Symbol();

sym07 === sym08 // 报错
sym08 === sym07 // 报错
```

上面示例中，变量`a`和变量`b`的类型虽然都是`unique symbol`，但其实是两个值类型。不同类型的值肯定是不相等的，所以最后一行就报错了。

> **`const`****命令为变量赋值 Symbol 值时，变量类型默认就是****`unique symbol`，所以类型可以省略不写。**

```typescript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();

```

> 不过我们知道，相同参数的`Symbol.for()`方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 unique symbol 类型的变量，等于同一个 Symbol 值的情况。

```typescript
const a:unique symbol = Symbol.for('foo');
const b:unique symbol = Symbol.for('foo');
```

> unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。

```typescript
const x:unique symbol = Symbol();
const y:symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}
```

上面示例中，变量`y`当作属性名，但是`y`的类型是 symbol，不是固定不变的值，导致报错。

`unique symbol`类型也可以用作类（class）的属性值，但只能赋值给类的`readonly static`属性。

```typescript
class C {
  static readonly foo:unique symbol = Symbol();
}
```

上面示例中，静态只读属性`foo`的类型就是`unique symbol`。注意，这时`static`和`readonly`两个限定符缺一不可，这是为了保证这个属性是固定不变的。

## 区别

在 TypeScript 中，`Symbol` 类型本身已经是唯一的标识符，这意味着每次调用 `Symbol()` 都会创建一个唯一的符号。然而，TypeScript 引入了 `unique symbol` 类型来进一步加强类型系统的能力，特别是在涉及常量和类型安全的场景中。

`Symbol` 和 `unique symbol` 的区别

- **Symbol**:
  - 每次调用 `Symbol()` 创建的符号是唯一的，但它们没有类型区分。
  - 符号本身无法用于声明独特的常量类型。
- **unique symbol**:
  - `unique symbol` 是一种具备类型层面唯一性的符号，通常与 `const` 结合使用。
  - 可以用作常量标识符，以确保唯一性，并且这种唯一性反映在类型系统中。

为什么需要 `unique symbol`？

1. **常量标识符的类型安全**:
   - `unique symbol` 允许创建具有类型唯一性的常量标识符，确保类型检查期间的唯一性。例如，在定义常量时，使用 `unique symbol` 可以确保每个常量都有一个唯一的类型。
2. **类型系统中的唯一性**:
   - 在复杂的类型系统中，尤其是涉及到映射、键值对等场景时，`unique symbol` 可以作为键，以确保类型安全和唯一性。

以下是一些示例，展示了 `unique symbol` 的使用场景及其优势：

常量标识符的类型安全

```typescript
// 使用 unique symbol 创建常量标识符
const UNIQUE_KEY: unique symbol = Symbol("unique_key");

// 定义一个包含 unique symbol 作为键的对象类型
interface MyObject {
  [UNIQUE_KEY]: string;
}

// 创建对象并赋值
const obj: MyObject = {
  [UNIQUE_KEY]: "This is a unique value"
};

// 尝试访问键值
console.log(obj[UNIQUE_KEY]); // 输出: This is a unique value
```

在上述示例中，`UNIQUE_KEY` 是一个具有唯一类型的常量标识符。这确保了在类型系统中，该键是唯一的，并且不会与其他符号混淆。

> 类型系统中的唯一性

```typescript
const KEY1: unique symbol = Symbol("key1");
const KEY2: unique symbol = Symbol("key2");

interface MyMap {
  [KEY1]: number;
  [KEY2]: string;
}

const myMap: MyMap = {
  [KEY1]: 123,
  [KEY2]: "abc"
};

console.log(myMap[KEY1]); // 输出: 123
console.log(myMap[KEY2]); // 输出: abc
```

在这个例子中，我们定义了两个 `unique symbol` 类型的键 `KEY1` 和 `KEY2`，并在 `MyMap` 接口中使用它们。这样可以确保 `KEY1` 和 `KEY2` 在类型系统中是唯一的，不会发生冲突。

> `unique symbol` 在 TypeScript 中的引入，主要是为了增强类型系统的能力，确保在常量标识符和复杂类型系统中具有唯一性和类型安全。通过使用 `unique symbol`，开发者可以创建具有唯一类型的常量标识符，确保在类型检查期间不会发生冲突。
