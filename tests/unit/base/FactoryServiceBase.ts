import { HttpService } from '@/config/axios/HttpService'

export abstract class FactoryServiceBase<T> {
  public spy!: any
  public abstract service: T

  protected apiStub!: HttpService

  private envBegin: any
  private environmentVariable!: string

  public restoreStateTest (): void {
    if (this.spy) {
      this.spy.mockRestore()
    }

    if (this.environmentVariable) {
      this.restoreEnvironment()
    }
  }

  public setEnvironmentVariable (variable: string, value: string): void {
    this.environmentVariable = variable

    this.envBegin = process.env[this.environmentVariable]

    process.env[this.environmentVariable] = value
  }

  private restoreEnvironment (): void {
    process.env[this.environmentVariable] = this.envBegin
  }
}
