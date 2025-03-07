// src/app/services/geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  /**
   * Searches for the provided city name and returns coordinates.
   * Returns an object containing lat, lon, and the display name.
   */
  getCoordinates(city: string): Observable<{ lat: number; lon: number; display_name: string }> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          const firstResult = results[0];
          return {
            lat: parseFloat(firstResult.lat),
            lon: parseFloat(firstResult.lon),
            display_name: firstResult.display_name
          };
        } else {
          throw new Error('No results found for city: ' + city);
        }
      })
    );
  }
}
