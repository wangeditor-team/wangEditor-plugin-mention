/**
 * @description examples entry
 * @author wangfupeng
 */

import { IDomEditor, createEditor, createToolbar, Boot, IEditorConfig } from '@wangeditor/editor'
import module from '../src/index'
import { showModalElem, hideModalElem, bindInputEvent, bindModalEvent } from './init-dom'

// 注册
Boot.registerModule(module)

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
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
    showModal: showModalElem,
    hideModal: hideModalElem,
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

// 绑定 dom 事件
bindInputEvent(editor)
bindModalEvent(editor)
