import { RoomRepository } from '@/repositories/RoomRepository'
import { Inject } from 'typescript-ioc'
import { RoomModel } from '@/models'

export default class NewRoomService {
  private roomRepository: RoomRepository

  constructor (@Inject roomRepository: RoomRepository) {
    this.roomRepository = roomRepository
  }

  public generateNewCodeToRoom (): number {
    return Math.round(Math.random() * 10000)
  }

  public createNewRoom (room: RoomModel): void {
    this.roomRepository.create(room)
  }
}
