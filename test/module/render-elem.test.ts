/**
 * @description render elem test
 * @author wangfupeng
 */

import createEditor from '../utils/create-editor'
import renderElemConf from '../../src/module/render-elem'
import { MentionElement } from '../../src/index'

describe('mention render-elem', () => {
  const editor = createEditor({
    config: {
      mentionConfig: {
        triggerSymbol: '@',
      },
    },
  })

  const mentionElem: MentionElement = {
    type: 'mention',
    value: '张三',
    info: { x: 10 },
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(renderElemConf.type).toBe('mention')
  })

  it('render elem', () => {
    const vnode = renderElemConf.renderElem(mentionElem, null, editor)
    expect(vnode.sel).toBe('span')
    expect(vnode.text).toBe('@张三')
    // @ts-ignore
    expect(vnode.data.props.contentEditable).toBe(false)
  })
})
