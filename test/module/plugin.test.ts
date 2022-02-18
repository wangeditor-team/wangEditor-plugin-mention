/**
 * @description plugin test
 * @author wangfupeng
 */

import createEditor from '../utils/create-editor'
import withMention from '../../src/module/plugin'
import { MentionElement } from '../../src/index'

describe('mention plugin', () => {
  const showModal = jest.fn()
  const hideModal = jest.fn()
  const editor = withMention(
    createEditor({
      config: {
        EXTEND_CONF: {
          mentionConfig: {
            showModal,
            hideModal,
          },
        },
      },
    })
  )

  const mentionElem: MentionElement = {
    type: 'mention',
    value: '张三',
    info: { x: 10 },
    children: [{ text: '' }],
  }

  // // TODO 显示和隐藏 modal - 执行有 bug ，待修复
  // it('insert @', done => {
  //   editor.insertText('@')
  //   setTimeout(() => {
  //     expect(showModal).toBeCalled() // 显示 modal

  //     setTimeout(() => {
  //       editor.insertText(' ')
  //       setTimeout(() => {
  //         expect(hideModal).toBeCalled() // 隐藏 modal
  //         done()
  //       })
  //     })
  //   })
  // })

  it('isInline', () => {
    expect(editor.isInline(mentionElem)).toBe(true)
  })

  it('isVoid', () => {
    expect(editor.isVoid(mentionElem)).toBe(true)
  })
})
