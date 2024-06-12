# localStroage

## 目录

- [localStroage](#localstroage)
  - [目录](#目录)
  - [什么是 LocalStorage](#什么是-localstorage)
  - [LocalStorage 的特性](#localstorage-的特性)
  - [常用方法](#常用方法)
  - [应用场景](#应用场景)
  - [使用示例](#使用示例)

## 什么是 LocalStorage

> 📌`LocalStorage` 是一种 HTML5 提供的 Web 存储机制，它允许在**客户端浏览器**中存储键值对数据。这种存储是持久的，**即使用户关闭浏览器，数据也不会丢失**，除非主动清除或用户手动删除。在使用时需要注意其容量限制和安全性问题，合理选择存储策略，确保用户数据的安全和隐私。

对象提供对特定网站的本地存储的访问。它允许您存储、读取、添加、修改和删除该域的数据项。数据存储没有过期日期，并且在浏览器关闭时不会被删除。数据将持续数天、数周和数年。

## LocalStorage 的特性

- **存放地：客户端**
- **持久性****：数据不会因为浏览器关闭而丢失。** ​
- **同源性****：数据仅在同源 (同协议、同域名、同端口) 下可访问。** ​**不同网站之间不可共享.**
- **存储大小****：通常每个源 (origin) 的存储上限是 5MB，但具体大小取决于浏览器。** ​
- **数据类型**\*\*：只能存储字符串类型的数据，如果需要存储对象等复杂类型，需要序列化 (如使用 ****`JSON.stringify`****)。\*\*
- **隐私安全**：由于 LocalStorage 数据是以纯文本形式存储的，敏感信息（如密码、个人身份信息）不应该直接存储在 LocalStorage 中。
- **容量限制**：存储的数据大小有限，超过限制会抛出 `QuotaExceededError` 异常。
- **跨域限制**：数据仅在同源策略下访问，不同域名间不能共享数据。

## 常用方法

- **`setItem(key, value)`**：将指定的键值对存储到 LocalStorage 中。
- **`getItem(key)`**：获取指定键对应的值。
- **`removeItem(key)`**：移除指定键及其对应的值。
- **`clear()`**：清空所有存储的数据。
- **`key(index)`**：获取指定索引位置的键名。
- **`length`**：返回 LocalStorage 中存储的键值对数量。

## 应用场景

- **用户偏好设置**：如主题选择、语言设置等。
- **会话信息存储**：如用户登录状态、购物车信息等。
- **表单数据保存**：如自动保存用户填写的表单内容，防止页面刷新或关闭时数据丢失。

## 使用示例

以下是一些 LocalStorage 使用的基本示例：

```javascript
// 将数据存储到 LocalStorage 中
localStorage.setItem('username', 'JohnDoe');

// 获取存储的数据
const username = localStorage.getItem('username');
console.log(username); // 输出：JohnDoe

// 存储复杂数据（对象）
const user = {
    name: 'John Doe',
    age: 30
};
localStorage.setItem('user', JSON.stringify(user));

// 获取复杂数据（对象）
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 输出：John Doe
console.log(storedUser.age);  // 输出：30

// 移除指定的数据
localStorage.removeItem('username');

// 清空所有存储的数据
localStorage.clear();
```

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>localStorage</title>
</head>

<body>
  <h2>localStorage</h2>
  <button onclick="saveData()">点我保存一个数据</button>
  <button onclick="readData()">点我读取一个数据</button>
  <button onclick="deleteData()">点我删除一个数据</button>
  <button onclick="deleteAllData()">点我清空一个数据</button>

  <script type="text/javascript">
    let p = { name: '张三', age: 18 }

    function saveData() {
      localStorage.setItem('msg', 'hello!!!')
      localStorage.setItem('msg2', 666)
      localStorage.setItem('person', JSON.stringify(p))
    }
    function readData() {
      console.log(localStorage.getItem('msg'))
      console.log(localStorage.getItem('msg2'))

      const result = localStorage.getItem('person')
      console.log(JSON.parse(result))

      // console.log(localStorage.getItem('msg3'))
    }
    function deleteData() {
      localStorage.removeItem('msg2')
    }
    function deleteAllData() {
      localStorage.clear()
    }
  </script>
</body>

</html>
```
