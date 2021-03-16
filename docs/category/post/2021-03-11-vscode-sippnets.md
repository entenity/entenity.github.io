# 代码补全插件

## 介绍

代码片段，也叫 snippets，相信大家都不陌生，就是输入一个很简单的单词然后一回车带出来很多代码。平时大家也可以直接在 vscode 中创建属于自己的 snippets

---

**请看下面动态图**

<img :src="$withBase('/images/vscode/two.gif')" alt="mixureSecure">

**当然也可以用本地创建好的 Json 文件**

<img :src="$withBase('/images/vscode/one.jpg')" alt="mixureSecure">

## 搭建环境

根据官方文档搭建环境，[官方地址](https://code.visualstudio.com/api/get-started/your-first-extension)

```bash

npm install -g yo generator-code

```

<img :src="$withBase('/images/vscode/three.jpg')" alt="mixureSecure">

**初始化项目**

```bash

yo code

```

选择插件类型，其实这里可以随便选，脚手架都是从仓库拉的模板而已，这里我们选择 TypeScript

<img :src="$withBase('/images/vscode/four.jpg')" alt="mixureSecure">

选择完成后会出现脚手架使用[inquirer](https://www.npmjs.com/package/inquirer)包普遍的询问过程，反正回车回车就是了，最后会主动的把所需要的包全部安装好，结构目录不做分析了

<img :src="$withBase('/images/vscode/five.jpg')" alt="mixureSecure">

## package.json

开发插件必须了解package.json
[package.json官方地址](https://code.visualstudio.com/api/references/extension-manifest) 

```json
{
  name: "vscode-plugin-demo",   //插件的名字，应全部小写，不能有空格 
  displayName: "VSCode插件demo",  //插件的友好显示名称，用于显示在应用市场，支持中文 
  description: "VSCode插件demo集锦",   //描述 
  keywords: ["vscode", "plugin", "demo"],   //关键字，用于应用市场搜索 
  version: "1.0.0",   //版本号 
  publisher: "entenity",   //发布者，如果要发布到应用市场的话，这个名字必须与发布者一致 
  engines: { vscode: "^1.27.0" },   //表示插件最低支持的vscode版本 
  //插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs] 
  categories: ["Other"],
  icon: "images/icon.png",   //插件图标，至少128x128像素 
  activationEvents: ["onCommand:extension.sayHello"],   //扩展的激活事件数组，可以被哪些事件激活扩展，详情看官方API 
  main: "./src/extension", //插件的主入口  
  contributes: {   /贡献点，整个插件最重要最多的配置项 
    configuration: {
      type: "object",  //插件配置项 
      title: "vscode-plugin-demo",  //配置项标题，会显示在vscode的设置页  
      properties: {         
        vscodePluginDemo.yourName: {  // 这里我随便写了2个设置，配置你的昵称
          type: "string",
          default: "guest",
          description: "你的名字"
        },
        vscodePluginDemo.showTip: {  // 是否在启动时显示提示
          type: "boolean",
          default: true,
          description: "是否在每次启动时显示欢迎提示！"
        }
      }
    },
    commands: [  // 命令
      {
        command: "extension.sayHello", // vscode ctrl+shift+p 命令行中输入hello world执行当前命令
        title: "Hello World"
      }
    ],
    keybindings: [     // 快捷键绑定
      {
        command: "extension.sayHello",
        key: "ctrl+f10",
        mac: "cmd+f10",
        when: "editorTextFocus"
      }
    ],
    menus: {     // 菜单
      "editor/context": [  // 编辑器右键菜单
        {
          when: "editorFocus", // 表示只有编辑器具有焦点时才会在菜单中出现
          command: "extension.sayHello",
          group: "navigation@6"  // navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
        },
        {
          when: "editorFocus", 
          command: "extension.demo.getCurrentFilePath",
          group: "navigation@5"
        },
        {
          when: "editorFocus && resourceLangId == javascript",  // 只有编辑器具有焦点，并且打开的是JS文件才会出现
          command: "extension.demo.testMenuShow",
          group: "z_commands"
        },
        {
          command: "extension.demo.openWebview",
          group: "navigation"
        }
      ],
      "editor/title": [  // 编辑器右上角图标，不配置图片就显示文字
        {
          when: "editorFocus && resourceLangId == javascript",
          command: "extension.demo.testMenuShow",
          group: "navigation"
        }
      ],
      "editor/title/context": [  // 编辑器标题右键菜单
        {
          when: "resourceLangId == javascript",
          command: "extension.demo.testMenuShow",
          group: "navigation"
        }
      ],
      "explorer/context": [ // 资源管理器右键菜单
        {
          command: "extension.demo.getCurrentFilePath",
          group: "navigation"
        },
        {
          command: "extension.demo.openWebview",
          group: "navigation"
        }
      ]
    },
    snippets: [     // 代码片段
      {
        language: "javascript",
        path: "./snippets/javascript.json"
      },
      {
        language: "html",
        path: "./snippets/html.json"
      }
    ],
    viewsContainers: {  // 自定义新的activitybar图标，也就是左侧侧边栏大的图标
      activitybar: [
        {
          id: "beautifulGirl",
          title: "美女",
          icon: "images"
        }
      ]
    },
    views: { // 自定义侧边栏内view的实现
      beautifulGirl: [
        {
          id: "beautifulGirl1",
          name: "国内美女"
        },
        {
          id: "beautifulGirl2",
          name: "国外美女"
        },
        {
          id: "beautifulGirl3",
          name: "人妖"
        }
      ]
    },
    iconThemes: [ // 图标主题
      {
        id: "testIconTheme",
        label: "测试图标主题",
        path: "./theme/icon-theme.json"
      }
    ]
  },
  // 同 npm scripts
  scripts: {
    postinstall: "node ./node_modules/vscode/bin/install",
    test: "node ./node_modules/vscode/bin/test"
  },
  // 开发依赖
  devDependencies: {
    "typescript": "^2.6.1",
    "vscode": "^1.1.6",
    "eslint": "^4.11.0",
    "@types/node": "^7.0.43",
    "@types/mocha": "^2.2.42"
  },
  // 后面这几个应该不用介绍了
  license: "SEE LICENSE IN LICENSE.txt",
  bugs: {
    "url": "https://github.com/sxei/vscode-plugin-demo/issues"
  },
  repository: {
    "type": "git",
    "url": "https://github.com/sxei/vscode-plugin-demo"
  },
  // 主页
  homepage: "https://github.com/sxei/vscode-plugin-demo/blob/master/README.md"
}
```

## sippnets插件

所在我们在package.json文件的contributes中配置自己的snippets，language支持可查看[官方地址](https://code.visualstudio.com/docs/languages/identifiers)

```json

snippets: [
    {
        language: "javascript", // 表示在哪种语言下可以用改代码片段
        path: "./snippets/javascript.json" // 代码片段路径
    },
    {
        language: "html",
        path: "./snippets/html.json"
    }
],

```

**如何书写自定义片段**

```json

{
    "ajax": {
        "prefix": "ajax",
        "body": [
            "$.ajax({",
            "    url: '$1',",
            "    method: '${2:POST}',",
            "    datatype: 'json',",
            "    success: data => {",
            "        $3;",
            "    },",
            "    error: err => {",
            "        $4;",
            "    }",
            "})"
        ],
        "description": "ajax模块"
    }
}

```

- ajax：snippets的名字
- prefix：输入什么单词触发代码片段
- body：一个数组，存放代码片段的内容，每一行一个字符串
- description：片段的描述
- ${1:xxx}占位符，数字表示光标聚焦的顺序，1表示默认光标落在这里，按下回车或者tab跳到2的位置，以此类推，xxx表示此位置的默认值，可省略，比如直接写$3，更多[Variable](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

## 如何发布

**1、安装vsce**

```bash

npm install -g vsce

```

**2、[创建Microsoft账户](https://account.microsoft.com/)**

3、[用刚刚创建的账户登录Microsoft云平台管理](https://dev.azure.com/)，然后安装下面步骤拿到token

<img :src="$withBase('/images/vscode/6.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/vscode/7.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/vscode/8.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/vscode/9.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/vscode/10.jpg')" alt="mixureSecure">

**3、创建插件publisher**

这里的Name必须和刚刚创建Token的Name一致

<img :src="$withBase('/images/vscode/11.jpg')" alt="mixureSecure">

**4、登录publisher，输入你创建应用的token**

```bash

vsce login [你创建的发布者名称]

```
<img :src="$withBase('/images/vscode/12.jpg')" alt="mixureSecure">


完成以上步骤你就可以插件市场你所发布的插件中看到自己发布的插件了

<img :src="$withBase('/images/vscode/13.jpg')" alt="mixureSecure">