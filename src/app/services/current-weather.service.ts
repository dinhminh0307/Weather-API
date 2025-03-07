import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { CurrentWeather } from '../models/current-weather.model';
import { GeocodingService } from './geocoding.service';
import { WeatherDetail } from '../models/weather-detail.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Store WeatherDetail internally
  private _weatherDetail!: WeatherDetail;

  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService
  ) {}

  /**
   * Getter and setter for the WeatherDetail object
   */
  public get weatherDetail(): WeatherDetail {
    return this._weatherDetail;
  }
  public set weatherDetail(value: WeatherDetail) {
    this._weatherDetail = value;
  }

  /**
   * Given a city name, get its coordinates, then fetch weather data
   * and map it to a CurrentWeather object. Also store WeatherDetail
   * for additional usage.
   */
  getWeatherByCity(city: string): Observable<CurrentWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap(coords => {
        // Open-Meteo API endpoint for current weather using the obtained coordinates
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
        return this.http.get<any>(url).pipe(
          map(weatherResponse => {
            // 1) Map to CurrentWeather
            const currentWeather: CurrentWeather = {
              city: city,
              country: this.extractCountry(coords.display_name),
              currentTime: weatherResponse.current_weather.time,
              temperature: weatherResponse.current_weather.temperature,
              feelsLike: weatherResponse.current_weather.temperature,
              condition: this.mapWeatherCode(weatherResponse.current_weather.weathercode),
              icon: this.mapWeatherIcon(weatherResponse.current_weather.weathercode),
              description: 'Current weather fetched from Open-Meteo'
            };

            // 2) Also store WeatherDetail from response
            // (Open-Meteo current_weather typically has these fields)
            this.weatherDetail = {
              time: weatherResponse.current_weather.time,
              interval: 900, // placeholder if "interval" not provided
              temperature: weatherResponse.current_weather.temperature,
              windspeed: weatherResponse.current_weather.windspeed ?? 0,
              winddirection: weatherResponse.current_weather.winddirection ?? 0,
              is_day: weatherResponse.current_weather.is_day ?? 1,
              weathercode: weatherResponse.current_weather.weathercode ?? 0
            };

            return currentWeather;
          })
        );
      })
    );
  }

  // A simple mapper for weather condition code to a text description.
  private mapWeatherCode(code: number): string {
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
  private extractCountry(displayName: string): string {
    const parts = displayName.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : 'Unknown';
  }
}
