// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { CurrentWeather } from '../models/current-weather.model';
import { GeocodingService } from './geocoding.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService
  ) {}

  /**
   * Given a city name, get its coordinates, then fetch weather data
   * and map it to a CurrentWeather object.
   */
  getWeatherByCity(city: string): Observable<CurrentWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap(coords => {
        // Open-Meteo API endpoint for current weather using the obtained coordinates
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
        return this.http.get<any>(url).pipe(
          map(weatherResponse => {
            // Here we map the Open-Meteo response to our CurrentWeather interface.
            // For properties not provided by the API, we fill in default values.
            const currentWeather: CurrentWeather = {
              city: city,
              country: this.extractCountry(coords.display_name),
              currentTime: weatherResponse.current_weather.time,
              temperature: weatherResponse.current_weather.temperature,
              feelsLike: weatherResponse.current_weather.temperature, // No 'feelsLike' provided; using temperature as a fallback.
              condition: this.mapWeatherCode(weatherResponse.current_weather.weathercode),
              icon: this.mapWeatherIcon(weatherResponse.current_weather.weathercode),
              description: 'Current weather fetched from Open-Meteo'
            };
            return currentWeather;
          })
        );
      })
    );
  }

  // A simple mapper for weather condition code to a text description.
  private mapWeatherCode(code: number): string {
    // Extend this mapping as needed.
    switch (code) {
      case 0:
        return 'Clear';
      case 1:
      case 2:
      case 3:
        return 'Partly Cloudy';
      default:
        return 'Unknown';
    }
  }

  // A simple mapper for weather code to an icon URL (or local asset).
  private mapWeatherIcon(code: number): string {
    // For demo purposes, return a default icon.
    // You could map specific codes to different icons.
    return 'assets/weather-icons/default.png';
  }

  // Extract a country from the full display name returned by Nominatim.
  // This is a simple example and may need to be adjusted for your needs.
  private extractCountry(displayName: string): string {
    const parts = displayName.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : 'Unknown';
  }
}
