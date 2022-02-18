/**
 * @description elem to html test
 * @author wangfupeng
 */

import elemToHtmlConf from '../../src/module/elem-to-html'
import { MentionElement } from '../../src/index'

describe('mention elem-to-html', () => {
  const value = '张三'
  const info = { x: 10 }
  const mentionElem: MentionElement = {
    type: 'mention',
    value,
    info,
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(elemToHtmlConf.type).toBe('mention')
  })

  it('elem to html', () => {
    const html = elemToHtmlConf.elemToHtml(mentionElem, '')
    const infoStr = encodeURIComponent(JSON.stringify(info))
    expect(html).toBe(
      `<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-info="${infoStr}">${value}</span>`
    )
  })
})
