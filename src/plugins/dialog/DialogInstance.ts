import _Vue from 'vue'
import Router from 'vue-router'
import Dialog from '@/components/dialog/Dialog.vue'
import DynamicDialog from '@/components/dialog/DynamicDialog.vue'
import { DialogOptions } from '@/models/dialog/DialogOptions'
import { DynamicDialogOptions } from '@/models/dialog/DynamicDialogOptions'

export default class DialogInstance {
  public instance!: _Vue
  public router?: Router

  constructor (router?: Router) {
    this.router = router
  }

  public open (options: DialogOptions): Promise<any> {
    this.instance = this.DialogInstance(options)
    return this.createComponent()
  }

  public openDynamicDialog (options: DynamicDialogOptions): Promise<any> {
    this.instance = this.dynamicDialogInstance(options)
    return this.createComponent()
  }

  private DialogInstance (options: DialogOptions): _Vue {
    const DialogExtended = _Vue.extend(Dialog)
    return new DialogExtended({ propsData: { options } })
  }

  private dynamicDialogInstance (options: DynamicDialogOptions): _Vue {
    const DialogExtended = _Vue.extend(DynamicDialog)
    return new DialogExtended({ propsData: { options } })
  }

  private createComponent (): Promise<any> {
    this.instance.$mount()

    return new Promise((resolve, reject) => {
      this.instance.$on('confirm', () => this.processPromise(resolve))
      this.instance.$on('reject', () => this.processPromise(reject))
    })
  }

  private processPromise (callBack: any) {
    this.instance.$destroy()
    callBack()
  }
}
