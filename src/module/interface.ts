/**
 * @description interface
 * @author wangfupeng
 */

export interface IExtendConfig {
  mentionConfig: {
    triggerSymbol: string
    showModal: () => void
    hideModal: () => void
  }
}
