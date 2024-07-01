
:::info
预解析（Hoisting）是 JavaScript 中的一种特性，它是在代码执行之前，JavaScript 引擎对变量和函数声明的处理过程。预解析将变量和函数的声明提升到作用域的顶部，但是变量的赋值操作不会提升。（后端成为“变态机制”或“变态解析”）
:::

在预解析的过程中，JavaScript 引擎会进行以下操作：

1. 变量声明提升：将变量的声明移动到作用域的顶部。例如，使用`var`关键字声明的变量会被提升到所在函数或全局作用域的顶部
2. 函数声明提升：将函数的声明移动到作用域的顶部。这意味着可以在函数声明之前调用函数。这种特性被称为函数提升（Function Hoisting）

需要注意的是，预解析只是将变量和函数的声明提升到作用域的顶部，并不会将变量的赋值操作提升。因此，在预解析阶段，变量被声明但尚未赋值时，其值为 `undefined`<br />提升是JavaScript的默认行为，即将声明移到顶部<br />当变量和函数同名时：只留下函数的值，不管谁前谁后，所以函数优先级更高；

<a name="Jmw1v"></a>
## 声明被提升

在JavaScript中，变量可以在使用后声明。换句话说变量可以在声明之前使用。实施例1给出与实施例2相同的结果：<br />Example 1
```javascript
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```

Example 2
```javascript
var x; // Declare x
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element
```
要理解这一点，你必须理解术语“提升”。提升是JavaScript的默认行为，将所有声明移动到当前范围的顶部（移动到当前脚本或当前函数的顶部）

<a name="nqtjr"></a>
## let和const

:::info
使用 `let` 和 `const` 定义的变量被提升到块的顶部，但不初始化。意思：代码块知道变量，但在声明它之前不能使用。在声明之前使用 `let` 变量将导致 `ReferenceError` 。变量从块的开始到被声明都处于“时间死区”：
:::
```javascript
This will result in a ReferenceError:

carName = "Volvo";
let carName;
```

在声明之前使用 `const` 变量是一个语法错误，因此代码不会运行。
```javascript
This code will not run.

  carName = "Volvo";
const carName;
```

:::info
在 JavaScript 中，`let` 和 `const` 声明也会进行预解析，但与 `var` 声明不同的是，它们存在于块级作用域中（例如，`if` 语句、`for` 循环、函数内部的花括号等）。这种作用域称为词法环境
:::
:::info
当使用 `let` 或 `const` 声明变量时，变量的声明会在词法环境中被提升到块级作用域的顶部。但与 `var` 不同的是，`let` 和 `const` 声明的变量在提升阶段不会被赋予初始值，而是留在暂时性死区（Temporal Dead Zone，TDZ）
:::
:::info
在暂时性死区内，如果访问还未被初始化的 `let` 或 `const` 变量，将会抛出一个 `ReferenceError`。只有在变量声明后的代码行开始执行时，变量才会被初始化，之后方可访问和使用
:::
例如，以下示例中的变量 `x` 将会处于暂时性死区：
```javascript
console.log(x); // ReferenceError: x is not defined
let x = 10;
```

因此，在使用 `let` 和 `const` 声明变量时，需要遵循先声明后使用的原则，以避免访问变量的错误

总结起来，虽然 `let` 和 `const` 的声明也会被预解析，但是它们存在暂时性死区，需要在声明后才能访问和使用

---

<a name="ZObTs"></a>
## 初始化未被提升

JavaScript只提升声明，而不是初始化。实施例1没有给予与实施例2相同的结果：

Example 1
```javascript
var x = 5; // Initialize x
var y = 7; // Initialize y

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x + " " + y;           // Display x and y
```

Example 2
```javascript
var x = 5; // Initialize x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x + " " + y;           // Display x and y

var y = 7; // Initialize y
```

在最后一个例子中，y未定义有意义吗？这是因为只有声明（var y），而不是初始化（=7）被提升到顶部。由于提升，y在使用之前已经声明，但由于初始化没有提升，所以y的值是未定义的<br />示例2与写作相同：
```javascript
var x = 5; // Initialize x
var y;     // Declare y

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x + " " + y;           // Display x and y

y = 7;    // Assign 7 to y
```


<a name="wvXx0"></a>
## 在顶部声明你的变量！

:::info
提升是（对许多开发人员来说）一种未知或被忽视的JavaScript行为。如果开发人员不理解提升，程序可能包含bug（错误）。为了避免错误，总是在每个作用域的开始声明所有变量。因为这是JavaScript解释代码的方式，所以它总是一个好规则。
:::
```javascript
JavaScript in strict mode does not allow variables to be used if they are not declared.
严格模式下的JavaScript不允许使用未声明的变量。
```

<a name="FTaaa"></a>
## Code

:::info
预解析过程中，当变量和函数同名时：只留下函数的值，不管谁前谁后，所以函数优先级更高；
:::
```javascript
window.onload = function(){
  //第一步，会预先解析关键字var、function等
  console.log(a);  //undefined
  var a = 100;

  //解析过程
  var a; //预解析
  //逐行解析
  console.log(a);
  a = 100;

  console.log(c);  //   function c(){console.log("c")};
  function c(){
    console.log("c")
  };

  //当变量和函数同名时：只留下函数的值，不管谁前谁后，所以函数优先级更高；
  console.log(f);
  function f(){
    console.log(333)
  };
  var f = 111;
  //解析过程
  //预解析
  function f(){console.log(333)};
  var f;
  //逐行解析
  console.log(f);  //function f(){console.log(333)};
  f = 111;


  //实例
  var x = 99;
  function x(){
    console.log(100)
  };
  console.log(x); //99
  //解析过程
  //预解析
  var x;
  function x(){console.log(100)};
  //逐行解析
  x = 99;
  console.log(x);



  //扩展练习题一
  console.log(a,b,c,d,e);
  var a = 10;
  var b;
  c = 100;
  function d(){
    console.log('d')
  };
  var e = function(){
    console.log('e')
  };

  //解析过程
  //预解析
  var a;
  var b;
  function d(){console.log('d')};
  var e;
  //逐行解析
  console.log(a,b,c,d,e);  //a=>undefined  b=>undefined  c=>报错  d=>function d(){console.log('d')}; e=>undefined 
  a = 10;
  c = 100;
  e = function(){
    console.log('e')
  };



  //扩展练习题二
  console.log(a) 
  var a=1;    

  function a(){console.log(2)}

  console.log(a) 
  var a=3;     

  console.log(a) 
  function a(){console.log(4)} 
  console.log(a)
  //解析过程
  //预解析
  var a;
  function a(){console.log(2)} ;
  function a(){console.log(4)} ;
  //逐行解析
  console.log(a);   //===>function a(){console.log(4)} ;
  a = 1;
  console.log(a)  //1
  a = 3;
  console.log(a)   //3
  console.log(a)   //3


  //经典预解析面试题
  function fun ( n ) {
    console.log( n );
    var n = 456;
    console.log( n );
  }
  var n = 123;
  fun( n );  //解析的过程及结果
}

//结果
undefined
456 

/*这是因为 JavaScript 中的变量声明和函数声明会提升到作用域的顶部，但是变量赋值不会提升。在以上代码中，先进行函数的声明提升，然后按照代码的顺序进行变量赋值和函数内部的操作。

步骤解析如下：

1. 执行 `fun(n)` 时，传入的参数 `n` 是全局变量 `n`，其值为 `123`。
2. 在函数 `fun()` 内部的第一行代码中，执行 `console.log(n)`。由于函数内部有变量 `n` 的声明，但是尚未被赋值，因此其值为 `undefined`。输出结果为 `undefined`。
3. 在函数 `fun()` 内部的第三行代码中，变量 `n` 被重新赋值为 `456`。
4. 执行 `console.log(n)`，输出结果为 `456`。

总结起来，在函数 `fun()` 内部，变量 `n` 经历了声明提升，并在后续的代码中被重新赋值，因此最后输出结果为 `undefined` 和 `456`。*/
```
