export default class NewRoomService {
  public generateNewCodeToRoom (): number {
    return Math.round(Math.random() * 10000)
  }
}
