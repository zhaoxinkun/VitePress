# sessionStorage

<!-- ## 目录

- [sessionStorage](#sessionstorage)
  - [目录](#目录)
  - [什么是 SessionStorage？](#什么是-sessionstorage)
  - [SessionStorage 的特性](#sessionstorage-的特性)
  - [常用方法](#常用方法)
  - [实际场景](#实际场景)
  - [使用示例](#使用示例) -->

## 什么是 SessionStorage？

> 📌`SessionStorage` 是 HTML5 提供的一种 Web 存储机制，它允许在**客户端浏览器**中存储键值对数据。与 `LocalStorage` 不同，`SessionStorage` 的数据是临时的，只在当前会话期间有效,也就是它的生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。存储在sessionStorage中的数据可以跨越页面刷新而存在，同时如果浏览器支持，浏览器崩溃并重启之后依然可以使用（注意：Firefox和Weblit都支持，IE则不行）。

因为sessionStorage对象绑定于某个服务器会话，所以当文件在本地运行的时候是不可用的。存储在sessionStorage中的数据只能由最初给对象存储数据的页面访问到，所以对多页面应用有限制。

不同浏览器写入数据方法略有不同。Firefox和Webkit实现了同步写入，所以添加到存储空间中的数据是立刻被提交的。而IE的实现则是异步写入数据，所以在设置数据和将数据实际写入磁盘之间可能有一些延迟。

`SessionStorage` 提供了一种简洁的客户端会话存储方案，适合存储在当前会话期间需要的数据。与 `LocalStorage` 相比，`SessionStorage` 的生命周期更短，但在临时数据存储和页面状态管理上非常有用。在使用时需要注意其容量限制和安全性问题，合理选择存储策略，确保用户数据的安全和隐私。

## SessionStorage 的特性

- **会话范围**：数据仅在当前会话期间有效。关闭浏览器标签页或窗口后，数据会被清除。
- **同源性**：数据仅在同源（同协议、同域名、同端口）下可访问。
- **存储大小**：通常每个源（origin）的存储上限是 5MB，但具体大小取决于浏览器。
- **数据类型**：只能存储字符串类型的数据，如果需要存储对象等复杂类型，需要序列化（如使用 `JSON.stringify`）。
- **隐私安全**：由于 `SessionStorage` 数据是以纯文本形式存储的，敏感信息（如密码、个人身份信息）不应该直接存储在 `SessionStorage` 中。
- **容量限制**：存储的数据大小有限，超过限制会抛出 `QuotaExceededError` 异常。
- **同源策略**：数据仅在同源策略下访问，不同域名间不能共享数据。
- **会话结束清除**：数据在会话结束时会被清除，适合存储临时数据。

## 常用方法

- **`setItem(key, value)`**：将指定的键值对存储到 `SessionStorage` 中。
- **`getItem(key)`**：获取指定键对应的值。
- **`removeItem(key)`**：移除指定键及其对应的值。
- **`clear()`**：清空所有存储的数据。
- **`key(index)`**：获取指定索引位置的键名。
- **`length`**：返回 `SessionStorage` 中存储的键值对数量。

## 实际场景

- **临时数据存储**：如表单数据、临时登录凭证等。
- **页面状态管理**：如分页信息、临时过滤条件等。
- **防止多标签页冲突**：存储当前标签页的状态，防止多个标签页的数据混淆。

## 使用示例

以下是一些 `SessionStorage` 使用的基本示例：

```javascript
// 将数据存储到 SessionStorage 中
sessionStorage.setItem('username', 'JohnDoe');

// 获取存储的数据
const username = sessionStorage.getItem('username');
console.log(username); // 输出：JohnDoe

// 存储复杂数据（对象）
const user = {
    name: 'John Doe',
    age: 30
};
sessionStorage.setItem('user', JSON.stringify(user));

// 获取复杂数据（对象）
const storedUser = JSON.parse(sessionStorage.getItem('user'));
console.log(storedUser.name); // 输出：John Doe
console.log(storedUser.age);  // 输出：30

// 移除指定的数据
sessionStorage.removeItem('username');

// 清空所有存储的数据
sessionStorage.clear();
```

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>sessionStorage</title>
</head>

<body>
  <h2>sessionStorage</h2>
  <button onclick="saveData()">点我保存一个数据</button>
  <button onclick="readData()">点我读取一个数据</button>
  <button onclick="deleteData()">点我删除一个数据</button>
  <button onclick="deleteAllData()">点我清空一个数据</button>

  <script type="text/javascript">
    let p = { name: '张三', age: 18 }

    function saveData() {
      sessionStorage.setItem('msg', 'hello!!!')
      sessionStorage.setItem('msg2', 666)
      sessionStorage.setItem('person', JSON.stringify(p))
    }
    function readData() {
      console.log(sessionStorage.getItem('msg'))
      console.log(sessionStorage.getItem('msg2'))

      const result = sessionStorage.getItem('person')
      console.log(JSON.parse(result))

      // console.log(sessionStorage.getItem('msg3'))
    }
    function deleteData() {
      sessionStorage.removeItem('msg2')
    }
    function deleteAllData() {
      sessionStorage.clear()
    }
  </script>
</body>

</html>
```
