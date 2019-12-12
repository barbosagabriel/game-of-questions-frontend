import { RepositoryBase } from './RepositoryBase';
import { RoomModel } from '@/models';

export class RoomRepository extends RepositoryBase {
    protected collection = 'rooms';
    
    public async create (room: RoomModel): Promise<any> {
        try {
            this.db.collection(this.collection).add(room)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    public async delete (roomId: number): Promise<void> {
        try {
            this.db.collection(this.collection).doc(String(roomId)).delete()
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    public async get (roomId: number): Promise<any> {
        try {
            
        } catch (error) {
            
        }
    }
}