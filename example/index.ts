/**
 * @description examples entry
 * @author wangfupeng
 */

import { IDomEditor, createEditor, createToolbar, Boot, IEditorConfig } from '@wangeditor/editor'
import module from '../src/index'

Boot.registerModule(module)

interface IMentionConfig {
  mentionConfig: {
    triggerSymbol: string
    showModal: () => void
    hideModal: () => void
  }
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig & IMentionConfig> = {
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  mentionConfig: {
    triggerSymbol: '@',
    showModal() {
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
    },
    hideModal() {
      const modalElem = document.getElementById('mention-modal')
      if (modalElem == null) return
      modalElem.style.display = 'none'
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       {
  //         // @ts-ignore
  //         type: 'mention',
  //         value: '张三',
  //         info: { x: 100 },
  //         children: [{ text: '' }],
  //       },
  //     ],
  //   },
  // ],
  html: `<p>hello&nbsp;world<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-info="%7B%22x%22%3A10%7D">小明</span></p><p><br></p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {},
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar

// 绑定 mention modal 事件
const modalElem = document.getElementById('mention-modal')
if (modalElem) {
  modalElem.addEventListener('click', (event: MouseEvent) => {
    // @ts-ignore
    if (event.target?.nodeName === 'LI') {
      editor.restoreSelection()
      // @ts-ignore
      const text = event.target.textContent
      if (text) {
        editor.deleteBackward('character') // 删除 '@'
        editor.insertNode({
          // @ts-ignore
          type: 'mention',
          value: text,
          info: { x: 1, y: 2 },
          children: [{ text: '' }],
        })
        modalElem.style.display = 'none'
      }
    }
  })
}
