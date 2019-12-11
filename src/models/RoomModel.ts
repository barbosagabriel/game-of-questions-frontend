import { UserModel } from '.'

export default class RoomModel {
  public id: number
  public userAdmin: UserModel
  public users: UserModel[]

  constructor (id: number, userAdmin: UserModel) {
    this.id = id
    this.userAdmin = userAdmin
    this.users = [userAdmin]
  }
}
