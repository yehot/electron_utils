

TODO:

1、加入 Vue 用于 UI 代码
2、加入 TS 用于主进程 js
3、加入 热刷新 代码，监听文件 change，自动变异


打包成 dmg 需要签名才能正常安装(low)
- todo: 解决打出的包，mac 上报错 "将对你的电脑造成伤害。 你应该将它移到废纸篓。"

功能 TODO:
1、加入 vue router，菜单栏
2、创建钱包功能：
- 单独页面：支持输入 count，创建的钱包输出到屏幕；
- 支持输出到 txt、Excel 文件；
- 输出文件在本地的路径，点击打开文件所在目录

## 打包

生成 icon
`npm run build-icon`

打包 app
```
npm run package-app
```
