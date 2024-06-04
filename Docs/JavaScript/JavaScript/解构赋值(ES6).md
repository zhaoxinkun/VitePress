# 解构赋值(ES6)

<!-- ## 目录

- [数组的解构 ](#数组的解构-)
  - [例1:解构Math对象中的randdom,max,min等方法,为全局函数](#例1解构Math对象中的randdommaxmin等方法为全局函数)
  - [例2:小技巧交换数据换位](#例2小技巧交换数据换位)
- [简单对象的解构 ](#简单对象的解构-)
- [复杂对象的解构](#复杂对象的解构) -->

> 📌这使得可以将**值从数组**或**属性从对象**提取到不同的变量中，当我们后期使用json的时候，后端传过来的可能有点不需要的属性，所以我们要提出需要的部分

```javascript
=> 意义: 快速从对象或者数组中获取成员
=> 解构对象
-> const { key1, key2, ... } = 对象
-> const { key1: 别名, key2: 别名, ... } = 对象
=> 解构数组
-> const [ key1, key2, ... ] = 数组
```

> 📌注意：频繁使用对象方法、数组元素，就可以使用解构赋值形式

## 数组的解构&#x20;

> 📌 let \[变量1,变量2,变量3...] = 数组 &#x20;
> 声明的变量和数组之间是位置对应关系....

```javascript
let [a, b, c, [d, e, f]] = [1, 2, 3, [3, 1, 2, 4]];
//我们同时声明了四个变量分别是 a , b , c , d ;
console.log(a, b, c, d, e, f);
// 数组解构是支持多层嵌套的;

 let [,year]=["akun","1999"]  //只想要year，那就用，占位一下就行了
console.log(year)  //1999 

//结构的时候给默认值
let [name,year]=["akun "]; 
//这里发现没有year，那就是undefined，但是可以给默认值
let [name,year=1999]=["akun "]; 

```

### 例1:解构Math对象中的randdom,max,min等方法,为全局函数

```javascript
let {min,max,random} =Math;
console.log(random());
```

### 例2:小技巧交换数据换位

```javascript
  // - 变量数据换位 ;
  [a, b] = [b, a];
  console.log(a, b);
```

## 简单对象的解构&#x20;

> 📌let {变量1,变量2,变量3,变量4....}  = 对象  声明的的变量名要和对象的属性值或者方法名保持一致....

```javascript
//对象的解构赋值
const lin = {
    name: "林志颖",
    tags: ["车手", "歌手", "小旋风", "演员"]
};
let {name, tags} = lin;
console.log(name);  //林志颖
console.log(tags);  //["车手", "歌手", "小旋风", "演员"]

```

## 复杂对象的解构

```javascript
//复杂对象的解构赋值
let wangfei = {
    name: "王菲",
    age: 18,
    songs: ["红豆", "流年", "暧昧"],
    history: [
        {name: "窦唯"},
        {name: "李亚鹏"},
        {name: "谢霆锋"}
    ]
};
let {name, age, songs: [one, two, three], history: [first, second, third]} = wangfei;
console.log(name); //王菲
console.log(age); //18
console.log(one); //红豆
console.log(two); //流年
console.log(three); //暧昧
console.log(first); //窦唯
console.log(second);  //李亚鹏
console.log(third); //谢霆锋

```
