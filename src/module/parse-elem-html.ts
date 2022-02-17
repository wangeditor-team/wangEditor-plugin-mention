/**
 * @description parse elem html
 * @author wangfupeng
 */

import { DOMElement } from '../utils/dom'
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { MentionElement } from './custom-types'

function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  // elem HTML 结构 <span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-info="${infoStr}">${value}</span>

  const value = elem.textContent || ''
  const rawInfo = decodeURIComponent(elem.getAttribute('data-info') || '')
  let info: any
  try {
    info = JSON.parse(rawInfo)
  } catch (ex) {
    info = rawInfo
  }

  return {
    type: 'mention',
    value,
    info,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as MentionElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="mention"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
