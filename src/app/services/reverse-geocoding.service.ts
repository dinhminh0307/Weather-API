import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodingService {
  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lon: number): Observable<string> {
    // Nominatim API endpoint. The 'jsonv2' format returns an object with an 'address' field.
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // The city may be stored under several keys
        return response.address.city || response.address.town || response.address.village || response.address.hamlet || 'Unknown';
      })
    );
  }
}
