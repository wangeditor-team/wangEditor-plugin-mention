/**
 * @description formula plugin
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor/editor'

function withMention<T extends IDomEditor>(editor: T) {
  const { insertText, isInline, isVoid } = editor
  const newEditor = editor

  // 重写 insertText
  newEditor.insertText = t => {
    // 选过选中了 void 元素
    const elems = DomEditor.getSelectedElems(newEditor)
    const isSelectedVoidElem = elems.some(elem => newEditor.isVoid(elem))
    if (isSelectedVoidElem) {
      insertText(t)
      return
    }

    // @ts-ignore
    const { mentionConfig = {} } = newEditor.getConfig()
    const { triggerSymbol, showModal, hideModal } = mentionConfig

    if (t === triggerSymbol) {
      setTimeout(() => {
        // 展示 modal （异步，以便准确获取光标位置）
        if (showModal) showModal()

        // 监听，隐藏 modal（异步，等待 modal 渲染后再监听）
        setTimeout(() => {
          newEditor.once('change', () => {
            console.log('once change')
            if (newEditor.selection != null) {
              if (hideModal) hideModal()
            }
          })
          newEditor.once('fullScreen', () => {
            if (hideModal) hideModal()
          })
          newEditor.once('unFullScreen', () => {
            if (hideModal) hideModal()
          })
          newEditor.once('scroll', () => {
            if (hideModal) hideModal()
          })
          newEditor.once('modalOrPanelShow', () => {
            if (hideModal) hideModal()
          })
          newEditor.once('modalOrPanelHide', () => {
            if (hideModal) hideModal()
          })
        })
      })
    }

    insertText(t)
  }

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'mention') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'mention') {
      return true
    }

    return isVoid(elem)
  }

  return newEditor
}

export default withMention
