import { Wrapper, createWrapper, createLocalVue } from '@vue/test-utils'
import Vue, { VueConstructor } from 'vue'
import { Container } from 'typescript-ioc'
import { HttpService } from '@/config/axios/HttpService'
import { DialogPlugin } from '@/plugins/dialog'

export abstract class FactoryComponentBase<T extends Vue | null> {
  public component!: Wrapper<T>
  public spy!: any

  public get vueInstance (): any {
    return this.component.vm
  }

  public get vueWithDialogPlugin (): VueConstructor {
    const vueWithDialogPlugin = createLocalVue()
    vueWithDialogPlugin.use(DialogPlugin)
    return vueWithDialogPlugin
  }

  public get dialog (): Wrapper<any> {
    try {
      return createWrapper(this.vueInstance.$dialog.instance)
    } catch (error) {
      throw new Error('Dialog plugin not found')
    }
  }

  public theDialogIsOpen (): boolean {
    try {
      return this.dialog.find('#dialog-content').exists()
    } catch (error) {
      return false
    }
  }

  public processInjectContainerApi (): void {
    Container.snapshot(HttpService)
  }

  public restoreInjectContainerApi (): void {
    Container.restore(HttpService)

    if (this.spy) {
      this.spy.mockRestore()
    }
  }

  public destroyDialog (): void {
    if (this.vueInstance.$dialog && this.vueInstance.$dialog.instance) {
      this.vueInstance.$dialog.instance.$destroy()
    }
  }

  public async createComponent (): Promise<void> {
    this.criarWrapper()
    await this.waitRender()
  }

  public waitRender (): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        jest.runAllTimers()
        resolve()
      })
    })
  }

  public abstract criarWrapper(): void
}
