import dummy from '../../utils/dummy.vue'
import { shallowMount, Wrapper } from '@vue/test-utils'
import { DialogPlugin } from '@/plugins/dialog'
import { DialogOptions } from '@/models/dialog/DialogOptions'
import { DynamicDialogOptions } from '@/models/dialog/DynamicDialogOptions'

export class DialogPluginFactory {
  private dummyPage!: Wrapper<any>

  public createPlugin (): void {
    localVue.use(DialogPlugin)
    this.createADummyPage()
  }

  public requestDialogOpen (options: DialogOptions): Promise<any> {
    return this.dummyPage.vm.$dialogo.abrir(options)
  }

  public requestDynamicDialogOpen (options: DynamicDialogOptions): Promise<any> {
    return this.dummyPage.vm.$dialog.openDynamicDialog(options)
  }

  public emitEventConfirm (): void {
    this.dummyPage.vm.$dialog.instance.$emit('confirm')
  }

  public emitEventReject (): void {
    this.dummyPage.vm.$dialog.instance.$emit('reject')
  }

  private createADummyPage () {
    this.dummyPage = shallowMount(dummy, { localVue })
  }
}
