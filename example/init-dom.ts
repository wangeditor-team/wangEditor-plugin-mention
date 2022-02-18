/**
 * @description init mention modal DOM elem
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor/editor'
import { MentionElement } from '../src/index'

/**
 * 显示 modal elem
 */
export function showModalElem(editor: IDomEditor) {
  // 获取光标位置
  const domSelection = document.getSelection()
  const domRange = domSelection?.getRangeAt(0)
  if (domRange == null) return
  const rect = domRange.getBoundingClientRect()

  // 显示 modal
  const modalElem = document.getElementById('mention-modal')
  if (modalElem == null) return
  modalElem.style.top = `${rect.top + 20}px`
  modalElem.style.left = `${rect.left + 5}px`
  modalElem.style.display = 'block'

  // focus 到 input
  const inputElem = document.getElementById('mention-input')
  inputElem?.focus()
}

/**
 * 隐藏 modal elem
 */
export function hideModalElem(editor: IDomEditor) {
  const modalElem = document.getElementById('mention-modal')
  if (modalElem == null) return
  modalElem.style.display = 'none'

  // 清空 input
  const inputElem = document.getElementById('mention-input') as HTMLInputElement
  inputElem.value = ''

  // 还原 list display
  const listElem = document.getElementById('mention-list')
  const listChildren = Array.from(listElem?.children || [])
  for (const li of listChildren) {
    // @ts-ignore
    li.style.display = 'list-item'
  }
}

/**
 * 绑定 modal elem 事件
 * @param editor editor
 */
export function bindModalEvent(editor: IDomEditor) {
  const modalElem = document.getElementById('mention-modal')
  if (modalElem == null) return

  // 点击 li 插入 mention
  modalElem.addEventListener('click', (event: MouseEvent) => {
    // @ts-ignore
    if (event.target?.nodeName === 'LI') {
      editor.restoreSelection()
      // @ts-ignore
      const text = event.target.textContent
      if (text == null) return

      // 删除 '@'
      editor.deleteBackward('character')
      // 插入 mention 节点
      const mentionNode: MentionElement = {
        type: 'mention',
        value: text,
        info: { x: 1, y: 2 }, // 其他信息
        children: [{ text: '' }],
      }
      editor.insertNode(mentionNode)
      // 光标移动一位
      editor.move(1)
      // 隐藏 modal elem
      modalElem.style.display = 'none'
    }
  })
}

/**
 * 绑定 input 事件
 * @param editor editor
 */
export function bindInputEvent(editor: IDomEditor) {
  const inputElem = document.getElementById('mention-input')
  const listElem = document.getElementById('mention-list')
  if (inputElem == null || listElem == null) return

  // input 输入文字，筛选 list
  inputElem.addEventListener('input', event => {
    // @ts-ignore
    const inputValue = (event.target.value || '').trim()
    const listChildren = Array.from(listElem.children)
    if (inputValue) {
      // input 有值，则筛选 list
      for (const li of listChildren) {
        const liText = (li.textContent || '').toLowerCase()
        if (liText.includes(inputValue)) {
          // @ts-ignore
          li.style.display = 'list-item' // 显示
        } else {
          // @ts-ignore
          li.style.display = 'none' // 隐藏
        }
      }
    } else {
      // input 无值，则显示所有 list
      for (const li of listChildren) {
        // @ts-ignore
        li.style.display = 'list-item'
      }
    }
  })

  // input 回车，插入 li
  inputElem.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      const listChildren = Array.from(listElem.children)
      for (const li of listChildren) {
        // @ts-ignore
        if (li.style.display !== 'none') {
          // @ts-ignore
          li.click()
          break
        }
      }
    }
  })

  // esc ，退出
  inputElem.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      hideModalElem(editor)
      editor.restoreSelection()
    }
  })
}
