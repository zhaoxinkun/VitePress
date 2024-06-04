/*
 * @Author: zxk zhaoxinkun1124@gmail.com
 * @Date: 2024-05-04 17:31:33
 * @LastEditors: zxk zhaoxinkun1124@gmail.com
 * @LastEditTime: 2024-05-07 12:15:55
 * @FilePath: \VitePress\.vitepress\Nav\nav.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
//导入拆分出去的各部分导航栏
import DevLang from "./DevLang";
import DevFrame from "./DevFrame";
import DevMore from "./DevMore";
import DevTools from "./DevTools";

// 定义所有的一级导航
export default [
  {
    text: "Home",
    link: "/",
  },
  // 使用拆分出去的DevLang导航
  {
    text: "DevLang",
    items: DevLang,
  },
  // 使用拆分出去的DevFrame导航
  {
    text: "DevFrame",
    items: DevFrame,
  },
  // 使用拆分出去的DevMore导航
  {
    text: "DevMore",
    items: DevMore,
  },
  // 使用拆分出去的DevTools导航
  {
    text: "DevTools",
    items: DevTools,
  },
  { text: "Examples", link: "/Examples/01.md" },
];
