/**
 * @description parse elem html test
 * @author wangfupeng
 */

import createEditor from '../utils/create-editor'
import parseHtmlConf from '../../src/module/parse-elem-html'
import { MentionElement } from '../../src/index'

describe('parse elem html', () => {
  const editor = createEditor()

  it('selector', () => {
    expect(parseHtmlConf.selector).toBe('span[data-w-e-type="mention"]')
  })

  it('parse html', () => {
    // elem-to-html 产出格式 `<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-info="${infoStr}">${value}</span>`
    const value = '张三'
    const info = { x: 10 }
    const infoStr = encodeURIComponent(JSON.stringify(info))
    const elem = document.createElement('span')
    elem.setAttribute('data-w-e-type', 'mention')
    elem.setAttribute('data-info', infoStr)
    elem.innerHTML = value

    const mention = parseHtmlConf.parseElemHtml(elem, [], editor) as MentionElement
    expect(mention.type).toBe('mention')
    expect(mention.value).toBe(value)
    expect(mention.info).toEqual(info)
  })
})
