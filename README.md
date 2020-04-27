## Getting Started

执行下面的命令安装依赖并启动项目，定时闹钟就开启成功了（只要电脑不关闭，系统就会定时弹出闹钟提醒）:

```bash
$ npm install
$ npm run start
```

如果只是想开启当前一天的闹钟，执行下面的命令

```bash
$ npm install
$ npm run start-runonce
```

## 打包为二进制文件

此程序可通过命令行打包为二进制文件，打包后的程序可以不依赖 nodejs 环境。打包后的目录在当前目录下的 package\timing-win-x64 目录中（也可以修改 packpage.json 中的 如下的\*\*字段自定义打包目录 ）。

```js
{
  "scripts": {
    "build-win-x64": "pkg . -t node12-win-x64 -o *这里填写自定义目录*",
  }
}
```

打包步骤如下：

```bash
$ npm run build-win-x64
```

修改 packpage.json 文件的的 bin 字段，改为"bin": "./app-runonce.js"，执行如下命令

```bash
$ npm run build-win-x64-runonce
```

把如下文件夹或批处理或脚本文件放到打包目录下

- assets
- backendStartExe.vbs
- backendStartExe-runonce.vbs
- registerandstarup.bat
- shutdown.bat
- shutdown-runonce.bat
- starup.bat
- starup-runonce.bat
- unregisterandshutdown.bat
- 桌面定时闹钟使用说明.docx

## Features

### 启动和关闭

#### 启动当天的闹钟（电脑关闭则会时效，需要重新启动）

启动当天的闹钟，电脑当天会定时提醒，直到第二天或者电脑关闭才失效了。
操作步骤为：双击打包目录下 timing-runonce.exe 或者 starup-runonce.bat 文件即可，两者的区别是前者会打开应用程序的窗口，关闭这个窗口就相当于关闭了定时闹钟。后者是启动后系统在后台运行，需要通过双击打包目录下 shutdown-runonce.bat 关闭定时闹钟。

#### 启动工作日的闹钟（电脑关闭则会时效，需要重新启动）

启动工作日的闹钟，电脑在工作日期间会定时提醒,直到电脑关闭才失效。
操作步骤为：双击打包目录下 timing.exe 或者 starup.bat 文件即可，两者的区别是前者会打开应用程序的窗口，关闭这个窗口就相当于关闭了定时闹钟。后者是启动后系统在后台运行，需要通过双击打包目录下 shutdown.bat 关闭定时闹钟。

#### 自启动工作日的闹钟（电脑重启就会自动开启定时闹钟服务）

自启动工作日的闹钟，则可以永久的让电脑在工作日期间定时提醒，注销此服务才会关闭定时提醒。
操作步骤为：双击打包目录下 registerandstarup.bat 文件即可，如果想注销此闹钟，双击打包目录下 unregisterandshutdown.bat 即可。

### 自定义提醒时间和提醒内容

打包目录下的 assets/setting.json 可以自定义提醒时间和提醒内容。规则如下：

- `dayOfWeek (0-6) 从星期天开始算，如果你想周一到周六设置工作日闹钟，则设置为: [1, 6]`
- `hour (0-23) 一天中的哪些小时需要设置提醒， 分上下午时段`
- `minute (0-59) 在第几分钟设置提醒`
- `date (1-31) 一个月中的哪些天`
- `month (0-11) 一年中的哪些月份`
- `title 提醒框的标题`
- `content 提醒框的内容`

## 参考文档

- [用纯 Node.JS 弹出 Windows 系统消息提示框(MessageBox)](http://ourjs.com/detail/5919152cf123900614961691)
- [QTP：代替 Msgbox 的方法，可以定时自动关闭](https://blog.csdn.net/jim0739/article/details/44066957)
- [How to make vbscript popup message always-on-top?](https://stackoverflow.com/questions/30515121/how-to-make-vbscript-popup-message-always-on-top)
- [批处理/vbscript 启动/关闭 exe](https://blog.csdn.net/woshiyuanlei/article/details/49762487)
- [vbs 获取当前目录的实现代码](https://www.jb51.net/article/41089.htm)
- [用批处理文件在注册表中添加开机启动项](https://blog.51cto.com/2533787/1332849)
- [怎么让 vbs 脚本开机自动启动？](https://www.zhihu.com/question/35677509)
