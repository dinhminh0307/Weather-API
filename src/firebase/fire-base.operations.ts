import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare the injection token at the top-level
export const COLLECTION_PATH = new InjectionToken<string>('COLLECTION_PATH');

@Injectable({
  providedIn: 'root'
})
export class FirestoreCrudService<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(
    protected afs: AngularFirestore,
    @Inject(COLLECTION_PATH) protected collectionPath: string
  ) {
    this.collection = afs.collection<T>(collectionPath);
  }

  add(item: T): Promise<any> {
    return this.collection.add(item);
  }

  getAll(): Observable<(T & { id: string })[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  update(id: string, item: Partial<T>): Promise<void> {
    return this.collection.doc(id).update(item);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}
