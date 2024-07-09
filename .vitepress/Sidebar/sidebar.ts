// 导入侧边导航设置
// html相关侧边导航
import HtmlSidebar from "./HTMLSidebar/HtmlSidebar";

// CSS相关导航
import SassSidebar from "./CssSidebar/SassSidebar";
// JS相关导航设置
import JavaScriptSidebar from "./JavaScriptSidebar/JavaScriptSidebar";
import ECMAScriptSidebar from "./JavaScriptSidebar/ECMAScriptSidebar";
import TypeScriptSidebar from "./JavaScriptSidebar/TypeScriptSidebar";
import windowSidebar from "./JavaScriptSidebar/windowSidebar";

// Vue导航设置
import VueSidebar from "./VueSidebar/VueSidebar";

// 其他导入设置
import Examples from "./Examples";
import VScodeSidebar from "./VScodeSidebar";

export default {
	// 有二级分类的
	// HTML专栏相关侧边导航
	"/HTML/HTML": HtmlSidebar,

	// CSS专栏下的侧边导航
	"/Css/Sass": SassSidebar,
	// 拆分出去使用的语法
	// JS专栏下的侧边导航
	"/JavaScript/JavaScript/": JavaScriptSidebar,
	"/JavaScript/ECMAScript/": ECMAScriptSidebar,
	"/JavaScript/TypeScript/": TypeScriptSidebar,
	"/JavaScript/window/": windowSidebar,

	// Vue专栏下的侧边导航
	"/Vue/Vue": VueSidebar,

	"/编程软件/VScode/": VScodeSidebar,

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
