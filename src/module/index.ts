/**
 * @description mention module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor/editor'
import withMention from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseHtmlConf from './parse-elem-html'

const module: Partial<IModuleConf> = {
  editorPlugin: withMention,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
}

export default module
