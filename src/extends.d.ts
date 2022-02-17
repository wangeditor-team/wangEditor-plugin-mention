import { IEditorConfig } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  export interface IEditorConfig {
    mentionConfig: {
      triggerSymbol: string
      showModal: () => void
      hideModal: () => void
    }
  }
}
