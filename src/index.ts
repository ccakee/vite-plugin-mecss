import type { PluginOption } from 'vite';
import { setNumberType, attributeList } from './mecss'
// import fs from 'fs'
interface KV {
    key: string
    value: string
}
interface option {
    cssPath?: string
}
let arr: KV[] = []

export default function vitePluginTemplate({ cssPath }: option): PluginOption {
    return {
        name: 'vite-plugin-mecss',
        enforce: 'pre', // post
        apply: 'serve', // apply 亦可以是一个函数
        transform(code, id) {
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
            setNumberType({ numberTypeArr: [...new Set(arr)], cssPath })
        },
    };
}
