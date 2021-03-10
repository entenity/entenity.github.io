const { fs, path } = require('@vuepress/shared-utils')

module.exports = {

    /** 网页标签后缀及其头部标题 */
    title: 'Entenity',

    /** 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中 */
    description: '天生我材必有用，千金散尽还复来',

    /** 额外的需要被注入到当前页面的 HTML <head> 中的标签 */
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],

    /** 提供多语言支持的语言配置 */
    // locales: {
    //     '/': {
    //         title: 'entenity',
    //         description: 'entenity blog'
    //     },
    // },

    /** 主题配置 */
    themeConfig: {

        logo: '/logo.png',

        nav: require('./nav'),

        /** 页面平滑滚动 */
        smoothScroll: true,
        
        /** github地址 */
        repo: 'entenity/entenity.vuepress.io',

        /** 启用Git 仓库和编辑链接 */
        editLinks: true,
        
        /** 链接文字 */
        editLinkText: '欢迎光临',

        sidebar: {
            '/archive/': getArchiveSidebar(),
            '/category/': getCategorySidebar(),
        }
    },

    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom'],   
    ],

    /** 指定额外的需要被监听的文件 */
    extraWatchFiles: [
        '.vuepress/nav/index.js'
    ]

}

function getArchiveSidebar() {
    const files = fs.readdirSync(path.resolve(__dirname, '../archive'))
    const fileJson = {}
    files.reduce((pre, current) => {
        const fileArr = current.split('-')
        if(fileArr.length > 3  ) {
            const yearAndMonth = `${fileArr[0]}-${fileArr[1]}`
            const obj = {
                title: yearAndMonth,
                collapsable: false,
                children: [
                    [current, fileArr[4].slice(0, -3)]
                ]
            }
            if(!pre[yearAndMonth]) {
                pre[yearAndMonth] = obj
            } else {
                pre[yearAndMonth].children.push([current, fileArr[4].slice(0, -3)])
            }
            return pre
        }
    }, fileJson)
    return Object.values(fileJson)
}

function getCategorySidebar() {
    const files = fs.readdirSync(path.resolve(__dirname, '../archive'))
    const fileJson = {}
    files.reduce((pre, current) => {
        const fileArr = current.split('-')
        if(fileArr.length > 3 ) {
            const obj = {
                title: fileArr[3],
                collapsable: false,
                children: [
                    [current, fileArr[4].slice(0, -3)]
                ]
            }
            if(!pre[fileArr[3]]) {
                pre[fileArr[3]] = obj
            } else {
                pre[fileArr[3]].children.push([current, fileArr[4].slice(0, -3)])
            }
            return pre
        }
    }, fileJson)
    return Object.values(fileJson)
}