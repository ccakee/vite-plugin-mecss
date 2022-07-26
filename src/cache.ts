
import fs from 'fs'
const colors = ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua']
const displays = ['none', 'inline', 'flex', 'flexbox', 'flow-root', 'grid', 'block', 'inline-block', 'list-item', 'run-in', 'table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-colume-group', 'table-colume', 'table-cell', 'table-caption', 'inherit']
const positions = ['static', 'relative', 'fixed', 'absolute', 'sticky']
const verticalAlign = ['auto', 'middle', 'baseline', 'bottom', 'sub', 'super', 'text-bottom', 'text-top', 'top']
export const attributeList = ['w=', 'h=', 't=', 'l=', 'r=', 'b=', 'mt=', 'm=', 'ml=', 'mr=', 'mb=', 'p=', 'pt=', 'pl=', 'pr=', 'pb=', 'lh=', 'fs=', 'bor=',
    'bor-t=', 'bor-l=', 'bor-r=', 'bor-b=', 'z-index=', 'color=','bg=']

function isMeNumber(value) {
    return Number(value) === 0 ? true : Number(value)
}

function isColor(value) {
    const color = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$", 'g')
    return color.test(value) || colors.some((item) => item == value)
}

export function setNumberType({ numberTypeArr }) {
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
        style.push(`[va~="${vert}"]{vertical-align:${vert}}`)
    })
    // 数值
    numberTypeArr.forEach(item => {
        if (item.key == 'm') {
            style.push(`[${item.key}="${item.value}"]{margin:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'p') {
            style.push(`[${item.key}~="${item.value}"]{padding:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
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
        // 
        if (item.key == 'w') {
            style.push(`[${item.key}~="${item.value}"]{width:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'h') {
            style.push(`[${item.key}~="${item.value}"]{height:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 't') {
            style.push(`[${item.key}~="${item.value}"]{top:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'l') {
            style.push(`[${item.key}~="${item.value}"]{left:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'r') {
            style.push(`[${item.key}~="${item.value}"]{right:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'b') {
            style.push(`[${item.key}~="${item.value}"]{bottom:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        // margin
        if (item.key == 'mt') {
            style.push(`[${item.key}~="${item.value}"]{margin-top:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'ml') {
            style.push(`[${item.key}~="${item.value}"]{margin-left:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'mr') {
            style.push(`[${item.key}~="${item.value}"]{margin-right:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'mb') {
            style.push(`[${item.key}~="${item.value}"]{margin-bottom:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        // padding
        if (item.key == 'pt') {
            style.push(`[${item.key}~="${item.value}"]{padding-top:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'pl') {
            style.push(`[${item.key}~="${item.value}"]{padding-left:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'pr') {
            style.push(`[${item.key}~="${item.value}"]{padding-right:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        if (item.key == 'pb') {
            style.push(`[${item.key}~="${item.value}"]{padding-bottom:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        // line-height
        if (item.key == 'lh') {
            style.push(`[${item.key}~="${item.value}"]{line-height:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        // font-size
        if (item.key == 'fs') {
            style.push(`[${item.key}~="${item.value}"]{font-size:${isMeNumber(item.value) ? (item.value / 12).toFixed(2) + 'rem' : item.value}}`)
        }
        // color
        if (item.key == 'color') {
            style.push(`[${item.key}~="${item.value}"]{color:${item.value}}`)
        }
        // background-color
        if (item.key == 'bg') {
            style.push(`[${item.key}~="${item.value}"]{background-color:${item.value}}`)
        }
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
    fs.writeFileSync('./mess.css', style.join(""))
}
