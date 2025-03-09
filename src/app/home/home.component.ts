import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CurrentWeatherComponent } from '../components/current-weather/current-weather.component';
import { WeatherDetailComponent } from '../components/weather-detail/weather-detail.component';
import { WeatherDetail } from '../models/weather-detail.model';
import { NgClass, NgForOf } from '@angular/common';
import { WeatherService } from '../services/current-weather.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrentWeather } from '../models/current-weather.model';
import { WeatherCardComponent } from '../components/weather-card/weather-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrentWeatherComponent, WeatherDetailComponent, NgClass, WeatherCardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges {
  @Input() searchQuery!: string;
  @Input() theme!: string;
  @Input() cities!: string[];
  
  currentWeatherList: CurrentWeather[] = [];
  weatherDetailData!: WeatherDetail;
  loading = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities'] && this.cities?.length) {
      this.fetchAllCitiesWeather();
    }
  }

  fetchAllCitiesWeather(): void {
    this.loading = true;
    this.error = null;
    this.currentWeatherList = [];

    const requests = this.cities.map(city => 
      this.weatherService.getWeatherByCity(city).pipe(
        catchError(error => {
          console.error(`Error fetching weather for ${city}:`, error);
          return of(null); // Return null for failed requests
        })
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.currentWeatherList = results.filter(Boolean) as CurrentWeather[];
        console.log('All cities weather fetched:', this.currentWeatherList);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load weather data for some cities';
        this.loading = false;
      }
    });
  }

  handleWeatherDetail(detail: WeatherDetail): void {
    this.weatherDetailData = detail;
  }
}