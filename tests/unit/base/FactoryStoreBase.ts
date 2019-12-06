import Vuex, { Store } from 'vuex'
import { Container } from 'typescript-ioc'
import { HttpService } from '@/config/axios/HttpService'

export abstract class FactoryStoreBase {
  public store!: Store<any>
  public spy!: any

  public injectAPI (): void {
    Container.snapshot(HttpService)
    this.stubApi()
  }

  public givenAEmptyStore () {
    const setup = this.setupStore()
    this.store = new Vuex.Store(setup)
  }

  public restoreInitialState (): void {
    Container.restore(HttpService)

    if (this.spy) {
      this.spy.mockRestore()
    }
  }

  public arrangeAPI (): void {
    Container.snapshot(HttpService)
  }

  protected abstract stubApi(): void

  protected abstract setupStore(): any
}
