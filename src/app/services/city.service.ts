import { Injectable, Inject } from '@angular/core';
import { COLLECTION_PATH, FirestoreCrudService } from '../../firebase/fire-base.operations';
import { City } from '../models/city.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CityService extends FirestoreCrudService<City> {
  constructor(
    afs: AngularFirestore,
    @Inject(COLLECTION_PATH) collectionPath: string
  ) {
    super(afs, collectionPath);
  }

  async addCity(cityName: string): Promise<any> {
    const city: City = { name: cityName };
    
    const querySnapshot = await firstValueFrom(
      from(this.collection.ref.where('name', '==', cityName).get())
    );
  
    if (querySnapshot.empty) {
      return this.add(city);
    }
    throw new Error('City already exists');
  }

  // Get all cities
  getAllCities(): Observable<(City & { id: string })[]> {
    return this.getAll();
  }
}