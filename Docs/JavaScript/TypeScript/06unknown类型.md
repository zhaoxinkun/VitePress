# unknown类型



> 📌unknown 类型也是顶部类型这与 any 一样

- unknown 用于表示未知的类型
- **会进行 TS 的类型检查，any 不进行 TS 检查**
- 使用 unknown 类型时可以使用 `as` 类型断言来明确类型
- `unknown`跟`any`的相似之处，在于所有类型的值都可以分配给`unknown`类型。

> 下面是 any 与 unknown 赋值上的区别，unknown 需要明确类型后赋值，any 则不需要

```typescript
let unknownname: any = "akun";
let unknownakun: unknown = "akun001";

let unknowna: string = unknownname;
let unknownb: string = unknownakun; //报错: 'unknown'未知类型不能赋值给'string'类型

// // // unknown 类型需要使用断言明确类型后赋值
let c: string = unknownakun as string;
```

> 可以把任何值赋值给 unknown 类型，但在使用时需要指明类型

```typescript
let unknownakun02: unknown;
unknownakun02 = "akuna"; //ok
unknownakun02 = 1124; //ok

//在使用时，TS不知道是什么类型，所以需要使用类型断言进行告之
let unknownakun03 = (unknownakun02 as number) + 20;
```

> 首先，`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

```typescript
// 直接赋值
let unknownakun04: unknown = 123;
// let unknownakun05: boolean = unknownakun04; //eroor
// let unknownakun06: number = unknownakun04;//error
```

上面示例中，变量`unknownakun04`是`unknown`类型，赋值给`any`和`unknown`以外类型的变量都会报错，这就避免了污染问题，从而克服了`any`类型的一大缺点。

> 📌其次，不能直接调用`unknown`类型变量的方法和属性。

```typescript
let v1:unknown = { foo: 123 };
v1.foo  // 报错

let v2:unknown = 'hello';
v2.trim() // 报错

let v3:unknown = (n = 0) => n + 1;
v3() // 报错
```

上面示例中，直接调用`unknown`类型变量的属性和方法，或者直接当作函数执行，都会报错

使用 keyof 类型工具时 unknown 与 any 的区别

```typescript
type AKUN<T> = { [P in keyof T]: string }

//{[x: string]: string;}
type AKUNA= AKUN<any>

//结果为{}，因为 keyof unknow 是never，所以被忽略了
type KUN = AKUN<unknown>
```

```typescript
type AKUN<T> = { [P in keyof T]: string }

//{[x: string]: string;}
type AKUNA= AKUN<any>

//结果为{}，因为 keyof unknow 是never，所以被忽略了
type KUN = AKUN<unknown>
```

不同类型赋值时会报错

```typescript
let akun:string ='99'
let age:number =akun as number //报错，TS 认为字符串转数值会出现错误
```

> 这里需要使用 unknown 做个中间层转换，将其先转换为 unknown 未知类型，再转换为 string 类型

```typescript
let akun:string ='99'
let age:number =akun as unknown as number
```

> 使用 any 类型 ts 不进行类型校验，所以在编译时不会报错，但执行编译后的 js 后会显示 NaN

```typescript
function get(val: any) {
  val = val * 100;
  return val
}

console.log(get('akun'));  //NaN
```

> **使用 unknown 类型时，结合 typeof 进行类型判断，根据不同类型使用不同逻辑**，慢慢进行缩小范围

```typescript
function get(val: unknown) {
  if (typeof val === 'number') {
    return val * 100;
  }
  return 0
}
console.log(get(100));  //NaN
```
