import 'firebase/firestore'
import firebase from 'firebase'

export abstract class RepositoryBase {
    protected abstract collection: string;
    public db = firebase.firestore()
}
