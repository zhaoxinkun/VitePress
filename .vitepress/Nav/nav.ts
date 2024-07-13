//导入拆分出去的各部分导航栏
import DevLang from "./DevLang";
import DevFrame from "./DevFrame";
import DevMore from "./DevMore";
import DevTools from "./DevTools";

// 定义所有的一级导航类目
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
];
