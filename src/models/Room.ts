import { User } from '.'

export default class Room {
  public id: number
  public userAdmin: User
  public users: User[]

  constructor (id: number, userAdmin: User) {
    this.id = id
    this.userAdmin = userAdmin
    this.users = [userAdmin]
  }
}
