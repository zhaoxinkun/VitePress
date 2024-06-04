// /$$
//  $ @Author: zxk zhaoxinkun1124 @gmail.com
//  $ @Date: 2024-05-06 17: 12: 31
//  $ @LastEditors: zxk zhaoxinkun1124 @gmail.com
//  $ @LastEditTime: 2024-05-07 14: 31: 23
//  $ @FilePath: \VitePress\111.js
//  $ @Description: 
//  $ @
// $ @Copyright(c) 2024 by ${ git_name_email }, All Rights Reserved.
//     $ /
var str1 = 'hello';
var str2 = new String('hello');
// str1.say = function () {
//     console.log('6666');   //直接报错，无法运行
// }
// str1.say();
str2.say = function () {
    console.log('8888');
}
str2.say();   //可以添加并执行
