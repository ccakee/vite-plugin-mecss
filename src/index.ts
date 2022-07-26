import type { PluginOption } from 'vite';
import { setNumberType, attributeList } from './mecss'
// import fs from 'fs'
interface KV {
    key: string
    value: string
}
let arr: KV[] = []

export default function vitePluginTemplate(): PluginOption {
    return {
        // 插件名称
        name: 'vite-plugin-template',

        // pre 会较于 post 先执行
        enforce: 'pre', // post

        // 指明它们仅在 'build' 或 'serve' 模式时调用
        apply: 'serve', // apply 亦可以是一个函数

        // 1. vite 独有的钩子：可以在 vite 被解析之前修改 vite 的相关配置。钩子接收原始用户配置 config 和一个描述配置环境的变量env
        config(config, { command }) {
        },
        load(this, id, options) {

        },
        handleHotUpdate({modules}){
           if (modules[0]?.id?.indexOf('mess') === -1){
            return;
           }
        },
        // 构建阶段的通用钩子：在每个传入模块请求时被调用：在每个传入模块请求时被调用，主要是用来转换单个模块
        transform(code, id) {
            if (id.indexOf('mess') === -1 || id.indexOf('node_modules') === -1) {
                attributeList.forEach((item) => {
                    const pageAttr = new RegExp(` ${item}` + '(.+?)\"', 'g')
                    const tempAttr = code.match(pageAttr)
                    if (tempAttr) {
                        tempAttr.forEach(str => {
                            let temp = str.split('=')
                            temp[1] = temp[1].replace(/"/g, '')
                            arr.push({ key: temp[0], value: temp[1] })
                        });
                    }
                })
                arr.forEach((item) => { item.key = item.key.trim() })
                setNumberType({ numberTypeArr: [...new Set(arr)] })
            }
        },
    };
}
