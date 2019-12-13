import { UserModel } from '.'

export default class RoomModel {
  public id: number
  public userAdmin: boolean
  public users: UserModel[]

  constructor (id: number, user: UserModel, userAdmin: boolean) {
    this.id = id
    this.userAdmin = userAdmin
    this.users = [user]
  }
}
