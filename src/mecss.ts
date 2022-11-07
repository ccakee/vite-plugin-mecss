
import fs from 'fs'
const colors = ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua']
const displays = ['none', 'inline', 'flex', 'flexbox', 'flow-root', 'grid', 'block', 'inline-block', 'list-item', 'run-in', 'table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-colume-group', 'table-colume', 'table-cell', 'table-caption', 'inherit']
const positions = ['static', 'relative', 'fixed', 'absolute', 'sticky']
const verticalAlign = ['auto', 'middle', 'baseline', 'bottom', 'sub', 'super', 'text-bottom', 'text-top', 'top']
export const attributeList = ['w=', 'h=', 't=', 'l=', 'r=', 'b=', 'mt=', 'm=', 'ml=', 'mr=', 'mb=', 'p=', 'pt=', 'pl=', 'pr=', 'pb=', 'lh=', 'fs=', 'bor=',
    'bor-t=', 'bor-l=', 'bor-r=', 'bor-b=', 'z-index=', 'color=', 'bg=', 'max-h=', 'max-w=', 'min-h=', 'min-w=', 'radius=', 'hover=']

interface mateList {
    id: number
    attr: string //属性简写
    attribute: string //样式
}
const attributeMateList: mateList[] = [
    { id: 1, attr: 'w', attribute: 'width' },
    { id: 2, attr: 'h', attribute: 'height' },
    { id: 3, attr: 'max-h', attribute: 'max-height' },
    { id: 4, attr: 'max-w', attribute: 'max-width' },
    { id: 5, attr: 'min-h', attribute: 'min-height' },
    { id: 6, attr: 'min-w', attribute: 'min-width' },
    { id: 7, attr: 't', attribute: 'top' },
    { id: 8, attr: 'l', attribute: 'left' },
    { id: 9, attr: 'r', attribute: 'right' },
    { id: 10, attr: 'b', attribute: 'bottom' },
    { id: 11, attr: 'mt', attribute: 'margin-top' },
    { id: 12, attr: 'ml', attribute: 'margin-left' },
    { id: 13, attr: 'mr', attribute: 'margin-right' },
    { id: 14, attr: 'mb', attribute: 'margin-bottom' },
    { id: 15, attr: 'pt', attribute: 'padding-top' },
    { id: 16, attr: 'pl', attribute: 'padding-left' },
    { id: 17, attr: 'pr', attribute: 'padding-right' },
    { id: 18, attr: 'pb', attribute: 'padding-bottom' },
    { id: 19, attr: 'lh', attribute: 'line-height' },
    { id: 20, attr: 'fs', attribute: 'font-size' },
    { id: 21, attr: 'color', attribute: 'color' },
    { id: 22, attr: 'bg', attribute: 'background-color' },
    { id: 23, attr: 'radius', attribute: 'border-radius' },
]

function isMeNumber(value) {
    return Number(value) === 0 ? true : Number(value)
}

function isColor(value) {
    const color = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$", 'g')
    return color.test(value) || colors.some((item) => item == value)
}

export function setNumberType({ numberTypeArr, cssPath }) {
    let style: string[] = []
    // 定位
    positions.forEach((pos) => {
        style.push(`[${pos}]{position:${pos}}`)
    })
    // display
    displays.forEach((dis) => {
        style.push(`[${dis}]{display:${dis}}`)
    })
    // 浮动
    style.push(`[fl]{float:left}`)
    style.push(`[fr]{float:right}`)
    // 垂直对齐
    verticalAlign.forEach((vert) => {
        style.push(`[va="${vert}"]{vertical-align:${vert}}`)
    })
    // hover;
    numberTypeArr.forEach(item => {
        if (item.key == 'hover') {
            const h_attrList = item.value.split(" ")
            h_attrList.forEach(ha => {
                let k = ha.split('(')[0]
                let v = ha.split('(')[1]?.substr(0, ha?.split('(')[1].length - 1)
                attributeMateList.forEach(a => {
                    if (k == a.attr) {
                        style.push(`[${item.key}="${item.value}"]:hover{${a.attribute}:${v}}`)
                    }
                })
            });
        }
    })
    // 数值
    numberTypeArr.forEach(item => {
        if (item.key == 'm') {
            style.push(`[${item.key}="${item.value}"]{margin:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'p') {
            style.push(`[${item.key}="${item.value}"]{padding:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'bor') {
            const items = item.value.trim().split(' ')
            items.forEach((item2, index2) => {
                if (isColor(item2)) {
                    style.push(`[${item.key}="${item.value}"]{border: solid ${item2} ${isMeNumber(items[index2 === 0 ? 1 : 0]) ? (items[index2 === 0 ? 1 : 0] / 12).toFixed(2) + 'rem' : items[index2 === 0 ? 1 : 0]}}`)
                }
            })
        }
    })
    numberTypeArr.forEach(item => {
        attributeMateList.forEach(item2 => {
            if (item.key == item2.attr && item.key != 'm' && item.key != 'p' && item.key != 'bor') {
                style.push(`[${item.key}~="${item.value}"]{${item2.attribute}:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
            }
        })
    })

    numberTypeArr.forEach(item => {
        // border
        if (item.key == 'bor-t') {
            const items = item.value.trim().split(' ')
            items.forEach((item2, index2) => {
                if (isColor(item2)) {
                    style.push(`[${item.key}="${item.value}"]{border-top: solid ${item2} ${isMeNumber(items[index2 === 0 ? 1 : 0]) ? (items[index2 === 0 ? 1 : 0] / 12).toFixed(2) + 'rem' : items[index2 === 0 ? 1 : 0]}}`)
                }
            })
        }
        if (item.key == 'bor-l') {
            const items = item.value.trim().split(' ')
            items.forEach((item2, index2) => {
                if (isColor(item2)) {
                    style.push(`[${item.key}="${item.value}"]{border-left: solid ${item2} ${isMeNumber(items[index2 === 0 ? 1 : 0]) ? (items[index2 === 0 ? 1 : 0] / 12).toFixed(2) + 'rem' : items[index2 === 0 ? 1 : 0]}}`)
                }
            })
        }
        if (item.key == 'bor-r') {
            const items = item.value.trim().split(' ')
            items.forEach((item2, index2) => {
                if (isColor(item2)) {
                    style.push(`[${item.key}="${item.value}"]{border-right: solid ${item2} ${isMeNumber(items[index2 === 0 ? 1 : 0]) ? (items[index2 === 0 ? 1 : 0] / 12).toFixed(2) + 'rem' : items[index2 === 0 ? 1 : 0]}}`)
                }
            })
        }
        if (item.key == 'bor-b') {
            const items = item.value.trim().split(' ')
            items.forEach((item2, index2) => {
                if (isColor(item2)) {
                    style.push(`[${item.key}="${item.value}"]{border-bottom: solid ${item2} ${isMeNumber(items[index2 === 0 ? 1 : 0]) ? (items[index2 === 0 ? 1 : 0] / 12).toFixed(2) + 'rem' : items[index2 === 0 ? 1 : 0]}}`)
                }
            })
        }
    });
    style = [...new Set(style)]
    fs.writeFileSync(cssPath || './src/assets/mess.css', style.join(""))
}
