import { RepositoryBase } from './RepositoryBase'
import { RoomModel } from '../models'

export class RoomRepository extends RepositoryBase {
  protected collection = 'rooms'

  public async create (room: RoomModel): Promise<any> {
    try {
      let data = {
        userAdmin: room.userAdmin,
        users: [
          {
            nickName: room.users[0].nickName,
            pathAvatar: room.users[0].pathAvatar,
            score: room.users[0].score
          }
        ]
      }
      await this.db
        .collection(this.collection)
        .add(room)
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  public async delete (roomId: number): Promise<void> {
    try {
      await this.db
        .collection(this.collection)
        .doc(String(roomId))
        .delete()
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  public async get (roomId: number): Promise<RoomModel | undefined> {
    try {
      return this.db
        .collection(this.collection)
        .doc(String(roomId))
        .get()
        .then(result => {
          if (result.exists) {
            return result.data() as RoomModel
          }
        })
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  public async getAll (): Promise<RoomModel[] | undefined> {
    try {
      return this.db
        .collection(this.collection)
        .get()
        .then(results => {
          if (!results.empty) {
            return results.docs.map(doc => doc.data()) as RoomModel[]
          }
        })
    } catch (error) {
      console.log(`error ${error}`)
    }
  }
}
