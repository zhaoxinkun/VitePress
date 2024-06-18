
<a name="P2CPj"></a>
## 处理网络请求

```javascript
function fetchData(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(Error('网络错误'));
    };
    xhr.send();
  });
}

fetchData('https://api.example.com/data')
  .then(function(response) {
    console.log('数据:', response);
  })
  .catch(function(error) {
    console.log('错误:', error);
  });
```

<a name="Xocqi"></a>
## 综合使用

```javascript
function fetchData(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const success = Math.random() > 0.5;
      if (success) {
        resolve('数据');
      } else {
        reject('错误');
      }
    }, 1000);
  });
}

Promise.all([fetchData('url1'), fetchData('url2'), fetchData('url3')])
  .then(function(results) {
    console.log('所有数据:', results);
  })
  .catch(function(error) {
    console.log('发生错误:', error);
  });

Promise.race([fetchData('url1'), fetchData('url2'), fetchData('url3')])
  .then(function(result) {
    console.log('最快完成的:', result);
  })
  .catch(function(error) {
    console.log('发生错误:', error);
  });

Promise.allSettled([fetchData('url1'), fetchData('url2'), fetchData('url3')])
  .then(function(results) {
    console.log('所有结果:', results);
  });

Promise.any([fetchData('url1'), fetchData('url2'), fetchData('url3')])
  .then(function(result) {
    console.log('第一个成功的:', result);
  })
  .catch(function(error) {
    console.log('所有请求都失败:', error);
  });

```

<a name="HaIE8"></a>
## 经典抽奖

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>基本使用</title>
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">Promise 初体验</h2>
      <button class="btn btn-primary" id="btn">点击抽奖</button>
    </div>
    <script>
      //生成随机数
      function rand(m,n){
        return Math.ceil(Math.random() * (n-m+1)) + m-1;
      }
      /**
            点击按钮,  1s 后显示是否中奖(30%概率中奖)
                若中奖弹出    恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券
                若未中奖弹出  再接再厉
        */
      //获取元素对象
      const btn = document.querySelector('#btn');
      //绑定单击事件
      btn.addEventListener('click', function(){
        //定时器写法
        // setTimeout(() => {
        //     //30%  1-100  1 2 30
        //     //获取从1 - 100的一个随机数
        //     let n = rand(1, 100);
        //     //判断
        //     if(n <= 30){
        //         alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券');
        //     }else{
        //         alert('再接再厉');
        //     }
        // }, 1000);

        //Promise 形式实现
        // resolve 解决  函数类型的数据
        // reject  拒绝  函数类型的数据
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
            //30%  1-100  1 2 30
            //获取从1 - 100的一个随机数
            let n = rand(1, 100);
            //判断
            if(n <= 30){
              resolve(n); // 将 promise 对象的状态设置为 『成功』
            }else{
              reject(n); // 将 promise 对象的状态设置为 『失败』
            }
          }, 1000);
        });

        console.log(p);
        //调用 then 方法
        // value 值
        // reason 理由
        p.then((value) => {
          alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 ' + value);
        }, (reason) => {
          alert('再接再厉, 您的号码为 ' + reason);
        });

      });

    </script>
  </body>

</html>
```

<a name="ellRH"></a>
## FS模块

```javascript
//
const fs = require('fs');

//回调函数 形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错 则抛出错误
//     if(err)  throw err;
//     //输出文件内容
//     console.log(data.toString());
// });

//Promise 形式
let p = new Promise((resolve , reject) => {
    fs.readFile('./resource/content.tx', (err, data) => {
        //如果出错
        if(err) reject(err);
        //如果成功
        resolve(data);
    });
});

//调用 then 
p.then(value=>{
    console.log(value.toString());
}, reason=>{
    console.log(reason);
});

```

读取文件函数封装
```javascript
/**
* 封装一个函数 mineReadFile 读取文件内容
* 参数:  path  文件路径
* 返回:  promise 对象
*/
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    //读取文件
    require('fs').readFile(path, (err, data) => {
      //判断
      if (err) reject(err);
      //成功
      resolve(data);
    });
  });
}

mineReadFile('./resource/content.txt')
  .then(value => {
    //输出文件内容
    console.log(value.toString());
  }, reason => {
    console.log(reason);
  });

```

<a name="TR6Hv"></a>
## AJAX的封装

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promise 封装 AJAX</title>
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet">
  </head>

  <body>
    <div class="container">
      <h2 class="page-header">Promise 封装 AJAX 操作</h2>
      <button class="btn btn-primary" id="btn">点击发送 AJAX</button>
    </div>
    <script>
      //接口地址 https://api.apiopen.top/getJoke
      //获取元素对象
      const btn = document.querySelector('#btn');

      btn.addEventListener('click', function () {
        //创建 Promise
        const p = new Promise((resolve, reject) => {
          //1.创建对象
          const xhr = new XMLHttpRequest();
          //2. 初始化
          xhr.open('GET', 'https://api.apiopen.top/getJoke');
          //3. 发送
          xhr.send();
          //4. 处理响应结果
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              //判断响应状态码 2xx   
              if (xhr.status >= 200 && xhr.status < 300) {
                //控制台输出响应体
                resolve(xhr.response);
              } else {
                //控制台输出响应状态码
                reject(xhr.status);
              }
            }
          }
        });
        //调用then方法
        p.then(value => {
          console.log(value);
        }, reason => {
          console.warn(reason);
        });
      });
    </script>
  </body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promise封装AJAX操作</title>
  </head>

  <body>
    <script>
      /**
         * 封装一个函数 sendAJAX 发送 GET AJAX 请求
         * 参数   URL
         * 返回结果 Promise 对象
         */
      function sendAJAX(url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'json';
          xhr.open("GET", url);
          xhr.send();
          //处理结果
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              //判断成功
              if (xhr.status >= 200 && xhr.status < 300) {
                //成功的结果
                resolve(xhr.response);
              } else {
                reject(xhr.status);
              }
            }
          }
        });
      }

      sendAJAX('https://api.apiopen.top/getJok')
        .then(value => {
          console.log(value);
        }, reason => {
          console.warn(reason);
        });
    </script>
  </body>

</html>
```
