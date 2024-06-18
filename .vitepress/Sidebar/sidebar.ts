/*
 * @Author: zxk zhaoxinkun1124@gmail.com
 * @Date: 2024-05-04 17:36:36
 * @LastEditors: zxk zhaoxinkun1124@gmail.com
 * @LastEditTime: 2024-05-07 12:12:23
 * @FilePath: \VitePress\.vitepress\Sidebar\sidebar.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import JavaScriptSidebar from "./JavaScriptSidebar";
import ECMAScriptSidebar from "./ECMAScriptSidebar";
import TypeScriptSidebar from "./TypeScriptSidebar";
import Examples from "./Examples";
import VScodeSidebar from "./VScodeSidebar";
import VueSidebar from "./VueSidebar";
import windowSidebar from "./windowSidebar";

export default {
  // 拆分出去使用的语法
  // 有二级分类的
  "/JavaScript/JavaScript/": JavaScriptSidebar,
  "/JavaScript/ECMAScript/": ECMAScriptSidebar,
  "/JavaScript/TypeScript/": TypeScriptSidebar,
  "/JavaScript/window/": windowSidebar,
  "/编程软件/VScode/": VScodeSidebar,
  "/Vue/Vue": VueSidebar,
  // 没有二级分类的
  Examples: Examples,

  // 这里是以前没有拆分的时候，使用的语法
  //   {
  //     // 当用户位于 `/JavaScript/JavaScript/` 目录时，会显示此侧边栏
  //     "/JavaScript/JavaScript/": [
  //       {
  //         text: "基础知识",
  //         items: [
  //           { text: "01", link: "/JavaScript/JavaScript/01.md" },
  //           { text: "02", link: "/JavaScript/JavaScript/02.md" },
  //           { text: "03", link: "/JavaScript/JavaScript/03.md" },
  //         ],
  //       },
  //     ],
  //   },
  // "/JavaScript/ECMAScript/": [
  //   // 当用户位于 `/JavaScript/ECMAScript/` 目录时，会显示此侧边栏
  //   {
  //     text: "基础知识",
  //     items: [
  //       { text: "05", link: "/JavaScript/ECMAScript/05" },
  //       { text: "06", link: "/JavaScript/ECMAScript/06" },
  //       { text: "07", link: "/JavaScript/ECMAScript/07" },
  //     ],
  //   },
  // ],
};

// export default [
//   {
//     text: "JavaScript",
//     items: [
//       { text: "Introduction", link: "/introduction" },
//       { text: "Getting Started", link: "/getting-started" },
//     ],
//   },
// ];
