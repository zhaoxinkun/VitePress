const fs = require("fs")
const path = require("path")

// 定义要读取的文件夹
const navDir = "../Nav"

// 初始化一整个导航数组,待会使用
let navItems = [];

// 编写读取函数
// 递归函数
function getAllFiles(dirPath, Array) {
    const result = fs.readdirSync(dirPath).forEach(fileName => {
        // 查看文件状态
        const fileStat = fs.statSync(fileName);

        // 判断是否为文件夹
        if (fileStat.isDirectory()) {
            // 如果是文件夹，则递归调用 getAllFiles
            getAllFiles(fileName, Array);
        } else if (fileName.endsWith(".ts") && fileName != "nav.ts" && fileName != "generateNav.js") {
            // 如果是文件，则将文件路径添加到数组中
            Array.push(fileName);
        }
        return Array
    })
}

getAllFiles(navDir, navItems)