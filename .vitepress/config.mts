/*
 * @Author: zxk zhaoxinkun1124@gmail.com
 * @Date: 2024-05-04 16:14:52
 * @LastEditors: zxk zhaoxinkun1124@gmail.com
 * @LastEditTime: 2024-05-15 10:07:28
 * @FilePath: \VitePress\.vitepress\config.mts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { defineConfig } from "vitepress";
//导入导航栏
import nav from "./Nav/nav";
//导入侧边栏
import sidebar from "./Sidebar/sidebar";
// https://vitepress.dev/reference/site-config
//进行配置
export default defineConfig({
  title: "XiaoXinDoc", //更改标题
  description: "Doc my life in code", // 更改描述
  srcDir: "./Docs", //更改相关文档位置，用于系统识别
  // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  lastUpdated: true, // string | boolean
  // head: [
  //   // 添加一个 link 标签，指定网站图标
  //   ["link", { rel: "icon", href: "/Docs/public/favicon.ico" }],
  // ],
  // 配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/icon.png", //更改logo
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    //导航栏
    nav,
    //侧边栏
    sidebar,
    //社交链接
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/zhaoxinkun",
      },
      {
        icon: "twitter",
        link: "https://twitter.com/jack_one24",
      },
      {
        icon: "facebook",
        link: "https://www.facebook.com/JackOnexk",
      },
      {
        icon: "youtube",
        link: "https://www.youtube.com/channel/UCgDuFEuO65rzO9oa9pjH7Qg",
      },
      {
        icon: "discord",
        link: "https://discord.com/accessibility",
      },
    ],
    footer: {
      message: "豫ICP备2024068699号",
      copyright: "Copyright © 2018-2022 xxincloud ",
    },
    lastUpdatedText: "最后更新", // string
  },
});
