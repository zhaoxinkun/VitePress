

:::info
`rollup-plugin-node-resolve` 是 Rollup 的一个插件，用于帮助 Rollup 解析 Node.js 风格的模块导入。这是因为 Rollup 原生只支持 ES6 的模块解析机制，而在 Node.js 中，模块通常位于 `node_modules` 目录下，并使用 CommonJS 语法进行导入
:::

<a name="sJiQI"></a>
## 功能

`rollup-plugin-node-resolve` 提供了一系列功能，使 Rollup 能够更好地处理和解析模块：

1. **解析 **`node_modules`** 中的模块**：允许 Rollup 解析和打包位于 `node_modules` 目录下的第三方模块
2. **解析多种模块格式**：支持解析 ES6 模块、CommonJS 模块和 Node.js 风格的模块
3. **自定义解析文件扩展名**：默认情况下，插件会尝试解析 `.js` 和 `.json` 文件，但你可以通过配置添加其他文件扩展名，例如 `.ts`、`.jsx` 等
4. **指定模块入口文件**：某些模块在 `package.json` 中定义了多个入口文件（如 `main`、`module`、`browser` 等），插件允许你指定优先使用哪个入口文件
5. **处理自定义路径和别名**：支持通过配置自定义路径别名，使模块导入更加方便

<a name="BLSeP"></a>
## 安装

首先，你需要安装 `@rollup/plugin-node-resolve` 插件：
```bash
npm install --save-dev @rollup/plugin-node-resolve
# 或者
yarn add --dev @rollup/plugin-node-resolve
```

<a name="Ub05p"></a>
## 使用

在 Rollup 配置文件 `rollup.config.js` 中引入并使用 `@rollup/plugin-node-resolve` 插件：
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // 可以是 'esm', 'cjs', 'umd', 'iife' 等
    name: 'MyLibrary'
  },
  plugins: [
    resolve({
      // 插件选项
      mainFields: ['module', 'main'], // 优先解析 'module' 字段，然后是 'main' 字段
      extensions: ['.js', '.json'], // 解析文件扩展名
      preferBuiltins: true, // 是否优先使用 Node.js 内建模块
      browser: true // 适用于浏览器环境
    })
  ]
};
```

<a name="iU5Xs"></a>
## 插件选项

以下是 `@rollup/plugin-node-resolve` 插件的一些常用选项：

- **mainFields**：指定要使用的字段顺序来解析模块入口文件。默认是 `['module', 'main']`，即优先使用 `package.json` 中的 `module` 字段，如果没有则使用 `main` 字段
- **extensions**：定义要解析的文件扩展名。默认值是 `['.mjs', '.js', '.json', '.node']`
- **preferBuiltins**：是否优先使用 Node.js 的内建模块。默认为 `true`
- **browser**：如果设为 `true`，将优先解析适用于浏览器环境的模块。适用于需要在浏览器中运行的代码。
- **dedupe**：一个数组，包含需要消除重复的模块名称。这对处理多个副本的第三方模块很有用
- **customResolveOptions**：自定义解析选项，可以传递给 `resolve` 库以进一步定制解析行为

<a name="nGf45"></a>
## 示例

假设你的项目依赖于一个第三方库 `lodash`，并且你希望在你的项目中使用它：

1. **安装 **`lodash`：
```bash
npm install lodash-es
# 或者
yarn add lodash-es
```

2. **在你的代码中导入 **`lodash`：
```javascript
// src/index.js
import _ from 'lodash-es';

console.log(_.capitalize('hello world'));
```

3. **配置 Rollup 使用 **`@rollup/plugin-node-resolve`：
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyLibrary'
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      extensions: ['.js', '.json'],
      browser: true
    })
  ]
};
```

4. **运行 Rollup 打包**：
```bash
npx rollup -c
yarn rollup --config
```
打包完成后，你可以在浏览器中加载 `dist/bundle.js` 并看到 `hello world` 被正确地转换为 `Hello World`

<a name="oEbuF"></a>
## 总结

`@rollup/plugin-node-resolve` 是 Rollup 的一个关键插件，使得 Rollup 能够处理和解析 Node.js 风格的模块导入。它为处理第三方依赖提供了强大的功能，并通过灵活的配置选项，使得在不同环境中的模块解析变得更加方便和高效
