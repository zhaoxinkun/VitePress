
:::info
`rollup-plugin-commonjs` 是 Rollup 的一个插件，用于将 CommonJS 模块转换为 ES6 模块。这对于处理使用 CommonJS 语法的库和模块非常有用，因为 Rollup 原生只支持 ES6 模块。通过使用这个插件，你可以在 Rollup 项目中无缝地使用大量现有的 CommonJS 模块
:::

<a name="ZpJ7q"></a>
## 功能

`rollup-plugin-commonjs` 的主要功能是将 CommonJS 模块转换为 ES6 模块，使它们可以被 Rollup 处理和打包。以下是其主要功能：

1. **转换 CommonJS 模块**：将使用 `require` 和 `module.exports` 语法的 CommonJS 模块转换为使用 `import` 和 `export` 语法的 ES6 模块
2. **处理动态 **`require`：支持处理动态 `require` 调用，即在代码运行时动态确定模块路径的情况
3. **解析顶层 **`this`：将顶层的 `this` 关键字转换为 `undefined`，以符合 ES6 模块的行为
4. **处理多种模块格式**：除了 CommonJS，还支持一些混合使用 CommonJS 和 ES6 模块语法的模块

<a name="nrCHf"></a>
## 安装

首先，你需要安装 `@rollup/plugin-commonjs` 插件：
```bash
npm install --save-dev @rollup/plugin-commonjs
# 或者
yarn add --dev @rollup/plugin-commonjs
```

<a name="Ffiz3"></a>
## 使用

在 Rollup 配置文件 `rollup.config.js` 中引入并使用 `@rollup/plugin-commonjs` 插件：
```javascript
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // 可以是 'esm', 'cjs', 'umd', 'iife' 等
    name: 'MyLibrary'
  },
  plugins: [
    commonjs()
  ]
};
```

假设你需要更加复杂的配置，例如只转换某些特定的 CommonJS 模块，并且需要处理混合使用 CommonJS 和 ES6 模块语法的情况：
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyLibrary'
  },
  plugins: [
    resolve(), // 解析 node_modules 中的模块
    commonjs({
      include: 'node_modules/**', // 只转换 node_modules 中的模块
      exclude: 'node_modules/some-es6-only-module/**', // 排除特定模块
      extensions: ['.js', '.cjs'], // 处理 .js 和 .cjs 文件
      ignoreGlobal: false, // 不忽略全局变量 `global`
      sourceMap: true, // 生成源映射文件
      transformMixedEsModules: true // 处理混合使用 CommonJS 和 ES6 模块语法的情况
    })
  ]
};
```

<a name="dVm3S"></a>
## 插件选项

`rollup-plugin-commonjs` 提供了一些配置选项来定制插件的行为：

- **include**：指定要转换的模块。可以是字符串或字符串数组，支持通配符。默认值是 `['node_modules/**']`
- **exclude**：指定不转换的模块。可以是字符串或字符串数组，支持通配符。默认值是 `[]`
- **extensions**：指定要解析的文件扩展名。默认值是 `['.js']`
- **ignoreGlobal**：忽略对全局变量 `global` 的处理。默认值是 `false`
- **sourceMap**：生成源映射文件。默认值是 `true`
- **transformMixedEsModules**：处理混合使用 CommonJS 和 ES6 模块语法的模块。默认值是 `false`。

<a name="pTArX"></a>
## 示例

假设你的项目依赖于一个使用 CommonJS 模块语法的库，例如 `moment`，并且你希望在你的项目中使用它：

1. **安装 **`moment`：
```bash
npm install moment
# 或者
yarn add moment
```

2. **在你的代码中导入 **`moment`：
```javascript
// src/index.js
import moment from 'moment';

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
```

3. **配置 Rollup 使用 **`@rollup/plugin-commonjs`：
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyLibrary'
  },
  plugins: [
    resolve(), // 解析 node_modules 中的模块
    commonjs() // 将 CommonJS 模块转换为 ES6 模块
  ]
};
```

4. **运行 Rollup 打包**：
```bash
npx rollup -c
```
打包完成后，你可以在浏览器中加载 `dist/bundle.js` 并看到 `moment` 库正确地工作

<a name="ZiAOo"></a>
## 总结

`rollup-plugin-commonjs` 是 Rollup 的一个重要插件，使得开发者能够在 Rollup 项目中无缝地使用大量现有的 CommonJS 模块。通过将 CommonJS 模块转换为 ES6 模块，它扩展了 Rollup 的能力，使其能够处理更多样化的代码库和模块格式。在配置和使用 `rollup-plugin-commonjs` 时，可以根据项目的具体需求进行定制，从而实现最佳的打包效果
